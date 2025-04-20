import { Injectable } from '@nestjs/common';

import { BlockchainService } from 'src/blockchain/blockchain.service';

import { handleError } from 'src/common/utils/error.util';

import {
  GetTokenInfoDto,
  PostTokenMintDto,
  PostTokenTransferDto,
  PostTokenTransferFromDto,
  PostApproveDto,
  PostBurnDto,
  PostTransactionResponseDto,
} from './dto/token.dto';
import { GetWalletBalanceDto } from './dto/wallet.dto';

@Injectable()
export class TokenService {
  constructor(
    private readonly blockchainService: BlockchainService,
  ) {}

  public async getTokenInfo(): Promise<GetTokenInfoDto> {
    try {
      const [name, symbol, totalSupply] = await Promise.all([
        this.blockchainService.getTokenName(),
        this.blockchainService.getTokenSymbol(),
        this.blockchainService.getTokenTotalSupply(),
      ]);

      return { name, symbol, totalSupply };
    } catch (error) {
      handleError(error);
    }
  }

  public async getBalance(wallet: string): Promise<GetWalletBalanceDto> {
    try {
      const balance = await this.blockchainService.getBalance(wallet);

      return { wallet, balance };
    } catch (error) {
      handleError(error);
    }
  }

  public async mint(payload: PostTokenMintDto): Promise<PostTransactionResponseDto> {
    try {
      const txHash = await this.blockchainService.mint(payload);
      
      return { success: true, txHash };
    } catch (error) {
      handleError(error);
    }
  }

  public async approve(payload: PostApproveDto): Promise<PostTransactionResponseDto> {
    try {
      const txHash = await this.blockchainService.approve(payload);

      return { success: true, txHash };
    } catch (error) {
      handleError(error);
    }
  }

  public async transfer(payload: PostTokenTransferDto): Promise<PostTransactionResponseDto> {
    try {
      const txHash = await this.blockchainService.transfer(payload);

      return { success: true, txHash };
    } catch (error) {
      handleError(error);
    }
  }

  public async transferFrom(payload: PostTokenTransferFromDto): Promise<PostTransactionResponseDto> {
    try {
      const txHash = await this.blockchainService.transferFrom(payload);

      return { success: true, txHash };
    } catch (error) {
      handleError(error);
    }
  }

  public async burn(payload: PostBurnDto): Promise<PostTransactionResponseDto> {
    try {
      const txHash = await this.blockchainService.burn(payload);

      return { success: true, txHash };
    } catch (error) {
      handleError(error);
    }
  }
}
