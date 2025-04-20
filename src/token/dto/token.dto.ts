import { IsEthereumAddress, IsNumber, IsPositive } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class GetTokenInfoDto {
  @ApiProperty({ description: 'Name of token', example: 'Test name' })
  name: string;

  @ApiProperty({ description: 'Symbol of token', example: 'ETH' })
  symbol: string;

  @ApiProperty({ description: 'Total supply of token', example: '10' })
  totalSupply: string;
}

export class PostTokenMintDto {
  @Transform(({ value }) => Number(value))
  @IsNumber()
  @IsPositive()
  @ApiProperty({ description: 'Amount of token', example: 1.1 })
  amount: number;
}

export class PostApproveDto extends PostTokenMintDto {
  @IsEthereumAddress()
  @ApiProperty({
    description: 'To wallet address',
    example: '0x7a5b4015C1C3Bb0095419f09e8Aa5B8b9FcC0Ec9',
  })
  spender: string;
}

export class PostTokenTransferDto extends PostTokenMintDto {
  @IsEthereumAddress()
  @ApiProperty({
    description: 'To wallet address',
    example: '0x7a5b4015C1C3Bb0095419f09e8Aa5B8b9FcC0Ec9',
  })
  to: string;
}

export class PostTokenTransferFromDto extends PostTokenTransferDto {
  @IsEthereumAddress()
  @ApiProperty({
    description: 'From wallet address',
    example: '0x7a5b4015C1C3Bb0095419f09e8Aa5B8b9FcC0Ec9',
  })
  from: string;
}

export class PostBurnDto extends PostTokenMintDto {
  @IsEthereumAddress()
  @ApiProperty({
    description: 'From wallet address',
    example: '0x7a5b4015C1C3Bb0095419f09e8Aa5B8b9FcC0Ec9',
  })
  from: string;
}

export class PostTransactionResponseDto {
  @ApiProperty({
    description: 'Status of token transfer',
    example: 'true | false',
  })
  success: boolean;

  @ApiProperty({
    description: 'Transfer hash',
    example: '0x21146f87fe7ec968edff6c168e8dc459f63ef6588b46db866fabc61d705830cd',
  })
  txHash: string;
}
