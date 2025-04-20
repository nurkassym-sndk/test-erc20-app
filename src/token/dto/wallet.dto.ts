import { IsEthereumAddress } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class WalletParamDto {
  @IsEthereumAddress()
  @ApiProperty({
    description: 'Wallet address',
    example: '0x7a5b4015C1C3Bb0095419f09e8Aa5B8b9FcC0Ec9',
  })
  wallet: string;
}

export class GetWalletBalanceDto {
  @ApiProperty({
    description: 'Wallet address',
    example: '0x7a5b4015C1C3Bb0095419f09e8Aa5B8b9FcC0Ec9',
  })
  wallet: string;

  @ApiProperty({ description: 'Balance of wallet', example: '1.1' })
  balance: string;
}