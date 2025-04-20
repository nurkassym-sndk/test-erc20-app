import { Controller, Get, Post, Param, Body, ValidationPipe } from '@nestjs/common';
import { ApiOperation, ApiTags, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';

import { TokenService } from './token.service';

import { GetWalletBalanceDto, WalletParamDto } from './dto/wallet.dto';
import {
  GetTokenInfoDto,
  PostTokenMintDto,
  PostTokenTransferDto,
  PostTokenTransferFromDto,
  PostApproveDto,  
  PostBurnDto,
  PostTransactionResponseDto,
} from './dto/token.dto';

@Controller('token')
@ApiTags('token')
export class TokenController {
  public constructor(private readonly service: TokenService) {}

  @Get()
  @ApiOperation({
    summary: 'Fetch token info',
  })
  @ApiResponse({
    status: 200,
    description: 'Returns name, symbol & totalSupply of token',
    type: [GetTokenInfoDto],
  })
  public async getTokenInfo() {
    return this.service.getTokenInfo();
  }

  @Get('balance/:wallet')
  @ApiOperation({
    summary: 'Fetch balance of wallet by address',
  })
  @ApiParam({
    name: 'wallet',
    type: 'string',
    description: 'Wallet address',
  })
  @ApiResponse({
    status: 200,
    description: 'Returns balance of wallet',
    type: [GetWalletBalanceDto],
  })
  public async getBalance(
    @Param(new ValidationPipe({ transform: true })) params: WalletParamDto,
  ) {
    return this.service.getBalance(params.wallet);
  }

  @Post('mint')
  @ApiOperation({
    summary: 'Mint tokens',
  })
  @ApiBody({ type: () => PostTokenMintDto })
  @ApiResponse({
    status: 200,
    description: 'Returns status and hash of transaction',
    type: [PostTransactionResponseDto],
  })
  public async mint(@Body() payload: PostTokenMintDto) {
    return this.service.mint(payload);
  }

  @Post('approve')
  @ApiOperation({
    summary: 'Approve tokens',
  })
  @ApiBody({ type: () => PostApproveDto })
  @ApiResponse({
    status: 200,
    description: 'Returns status and hash of transaction',
    type: [PostTransactionResponseDto],
  })
  public async approve(@Body() payload: PostApproveDto) {
    return this.service.approve(payload);
  }

  @Post('transfer')
  @ApiOperation({
    summary: 'Token transfer',
    description: 'Send token to wallet',
  })
  @ApiBody({ type: () => PostTokenTransferDto })
  @ApiResponse({
    status: 200,
    description: 'Returns status and hash of transfer',
    type: [PostTransactionResponseDto],
  })
  public async transfer(@Body() payload: PostTokenTransferDto) {
    return this.service.transfer(payload);
  }

  @Post('transfer-from')
  @ApiOperation({
    summary: 'Token transfer from spender',
    description: 'Send token to wallet from spender',
  })
  @ApiBody({ type: () => PostTokenTransferFromDto })
  @ApiResponse({
    status: 200,
    description: 'Returns status and hash of transfer',
    type: [PostTransactionResponseDto],
  })
  public async transferFrom(@Body() payload: PostTokenTransferFromDto) {
    return this.service.transferFrom(payload);
  }

  @Post('burn')
  @ApiOperation({ summary: 'Burn tokens' })
  @ApiBody({ type: () => PostBurnDto })
  @ApiResponse({
    status: 200,
    description: 'Returns status and hash of transfer',
    type: [PostTransactionResponseDto],
  })
  public async burn(@Body() payload: PostBurnDto) {
    return this.service.burn(payload);
  }
}
