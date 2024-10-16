import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './controller/app.controller';
import { AppService } from './service/app.service';
import configuration from './config/configuration';
import { ExchangeRateService } from './service/exchange-rate.service';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true, load: [configuration] })],
  controllers: [AppController],
  providers: [AppService, ExchangeRateService],
})
export class AppModule {}
