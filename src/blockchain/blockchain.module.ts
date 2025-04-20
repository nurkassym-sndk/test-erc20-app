import { Module } from '@nestjs/common';

import { BlockchainService } from './blockchain.service';

@Module({
  controllers: [],
  exports: [BlockchainService],
  providers: [BlockchainService]
})
export class BlockchainModule {}
