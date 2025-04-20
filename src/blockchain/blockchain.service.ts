import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import {
  Address,
  createPublicClient,
  createWalletClient,
  getContract,
  http,
  formatUnits,
  parseUnits,
} from 'viem';

import { privateKeyToAccount } from 'viem/accounts';

import * as chains from 'viem/chains';
import { Chain } from 'viem/chains';

import { IMintDto, ITransferDto, ITransferFromDto, IApproveDto, IBurnDto } from './blockchain.interface';

import { abi } from './abi/Erc20TokenAbi';

@Injectable()
export class BlockchainService implements OnModuleInit {
  private chain: Chain;
  private contract: any;

  private operator: string;

  private reader: any;
  private writer: any;
  private decimals: number;

  constructor(private readonly config: ConfigService) {}
  
  async onModuleInit() {
    const options = {
      chain: this.chain,
      transport: http(this.config.get<string>('rpcUrl')),
    };

    const account = privateKeyToAccount(`0x${this.config.get<string>('operatorPk')}`);

    this.operator = this.config.get<Address>('operatorAddress')

    this.chain = this.getChainById(this.config.get<number>('chainId'));
    this.reader = createPublicClient(options);
    this.writer = createWalletClient({ account, ...options });

    const client: any = { public: this.reader, wallet: this.writer };

    this.contract = getContract({
      address: this.config.get<Address>('contractAddress'),
      abi,
      client,
    });

    this.decimals = await this.contract.read.decimals();
  }

  public async getTokenName(): Promise<string> {
    return this.contract.read.name();
  }

  public async getTokenSymbol(): Promise<string> {
    return this.contract.read.symbol();
  }

  public async getTokenTotalSupply(): Promise<string> {
    const totalSupply = await this.contract.read.totalSupply();

    return this.formatValue(totalSupply);
  }

  public async getBalance(wallet: string): Promise<string> {
    const balance = await this.contract.read.balanceOf([wallet]);

    return this.formatValue(balance);
  }

  public async mint(payload: IMintDto): Promise<string> {
    const amount = this.parseValue(payload.amount);
    const args = [this.operator, amount];

    const isAvalableGas = await this.isAvalableGasBalance('mint', args);
    if (!isAvalableGas) {
      throw new Error('Insufficient ETH balance.');
    }

    return this.contract.write.mint(args);
  }

  public async approve(payload: IApproveDto): Promise<string> {
    const amount = this.parseValue(payload.amount);
    const args = [payload.spender, amount];

    const isAvalableGas = await this.isAvalableGasBalance('approve', args);
    if (!isAvalableGas) {
      throw new Error('Insufficient ETH balance.');
    }

    return this.contract.write.approve(args);
  }

  public async transfer(payload: ITransferDto): Promise<string> {
    const amount = this.parseValue(payload.amount);
    const args = [payload.to, amount];

    const isAvailableBalance = await this.isAvailableTokenBalance(payload.amount);
    if (!isAvailableBalance) {
      throw new Error('Insufficient token balance to perform transfer');
    }

    const isAvalableGas = await this.isAvalableGasBalance('transfer', args);
    if (!isAvalableGas) {
      throw new Error('Insufficient ETH balance.');
    }

    return this.contract.write.transfer(args);
  }

  public async transferFrom(payload: ITransferFromDto): Promise<string> {
    const amount = this.parseValue(payload.amount);
    const args = [payload.from, payload.to, amount];

    const isValidAllowance = await this.isValidAllowance(payload.from, payload.amount);
    if (!isValidAllowance) {
      throw new Error('Insufficient allowance. Please approve the required amount of tokens.');
    }

    const isAvailableBalance = await this.isAvailableTokenBalance(payload.amount, payload.from);
    if (!isAvailableBalance) {
      throw new Error('Insufficient token balance to perform transfer');
    }

    const isAvalableGas = await this.isAvalableGasBalance('transferFrom', args);
    if (!isAvalableGas) {
      throw new Error('Insufficient ETH balance.');
    }

    return this.contract.write.transferFrom(args);
  }

  public async burn(payload: IBurnDto): Promise<string> {
    const amount = this.parseValue(payload.amount);
    const args = [payload.from, amount];

    const isAvailableBalance = await this.isAvailableTokenBalance(payload.amount, payload.from);
    if (!isAvailableBalance) {
      throw new Error('Insufficient token balance to perform transfer');
    }

    const isAvalableGas = await this.isAvalableGasBalance('burn', args);
    if (!isAvalableGas) {
      throw new Error('Insufficient ETH balance.');
    }

    return this.contract.write.burn(args);
  }

  private async getAllowance(wallet: string): Promise<number> {
    const allowance = await this.contract.read.allowance([this.operator, wallet]);

    return +this.formatValue(allowance);
  }

  private async isValidAllowance(wallet: string, amount: number): Promise<boolean> {
    const allowance = await this.getAllowance(wallet);

    return allowance >= amount;
  }

  private async isAvalableGasBalance(method: string, args: any[]): Promise<boolean> {
    const [gas, operatorBalance] = await Promise.all([
      this.estimateGas(method, args),
      this.getOperatorBalance(),
    ]);

    return operatorBalance >= gas;
  }

  private async isAvailableTokenBalance(
    amount: number,
    wallet?: string,
  ): Promise<boolean> {
    const owner = wallet ?? this.operator;
    const balance = await this.getBalance(owner);

    return +balance >= amount;
  }

  private async estimateGas(method: string, args: any[]): Promise<number> {
    if (!this.contract.estimateGas[method]) {
      throw new Error(`Метод ${method} не найден в contract.estimateGas`);
    }

    const gas = await this.contract.estimateGas[method](args);

    return +this.formatValue(gas);
  }

  private async getOperatorBalance(): Promise<number> {
    const operatoGasBalance = await this.reader.getBalance({
      address: this.operator,
    });

    return +this.formatValue(operatoGasBalance);
  }

  private formatValue(value: bigint): string {
    return formatUnits(value, this.decimals);
  }

  private parseValue(value: number): bigint {
    return parseUnits(value.toString(), this.decimals);
  }

  private getChainById(chainId: number): Chain {
    for (const chain of Object.values(chains)) {
      if ('id' in chain) {
        if (chain.id === chainId) {
          return chain;
        }
      }
    }
  }
}
