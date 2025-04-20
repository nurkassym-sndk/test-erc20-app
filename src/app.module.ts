import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppService } from './app.service';
import { TokenModule } from './token/token.module';
import { BlockchainModule } from './blockchain/blockchain.module';

import configuration from './config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      envFilePath: [
        '.env',
        '.sample.env',
      ].filter(Boolean),

      expandVariables: true,
      isGlobal: true,
    }),
    TokenModule,
    BlockchainModule,
  ],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
