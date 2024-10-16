import { Body, Controller, Get, Post, UsePipes } from '@nestjs/common';

import { AppService } from '../service/app.service';

import {
  ExchangeRateResponse,
  SaveApparelDTO,
  SaveApparelSchema,
} from '@shared';
import { ZodValidationPipe } from '../pipes/zod-validation-pipe';
import { ExchangeRateService } from '../service/exchange-rate.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly exchangeRateService: ExchangeRateService
  ) {}

  @Get('apparel')
  getApparel(): SaveApparelDTO {
    return this.appService.findApparel();
  }

  @Post('apparel')
  @UsePipes(new ZodValidationPipe(SaveApparelSchema))
  saveApparel(@Body() payload: SaveApparelDTO): void {
    this.appService.saveApparel(payload);
  }

  @Get('exchange-rates')
  getExchangeRates(): Promise<ExchangeRateResponse> {
    return this.exchangeRateService.getExchangeRates();
  }
}
