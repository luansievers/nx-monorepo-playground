import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ExchangeRateResponse } from '@shared';
import axios from 'axios';

const mockResponse = {
  success: true,
  timestamp: 1728765544,
  base: 'EUR',
  date: '2024-10-12',
  rates: {
    USD: 1.09487,
    CAD: 1.507253,
    EUR: 1,
  },
};

@Injectable()
export class ExchangeRateService {
  private readonly apiUrl = 'https://api.exchangeratesapi.io/v1/latest';
  private readonly apiKey: string;
  constructor(private configService: ConfigService) {
    this.apiKey = this.configService.getOrThrow('exchangeRateApiKey');
  }

  async getExchangeRates(): Promise<ExchangeRateResponse> {
    try {
      const response = await axios.get(this.apiUrl, {
        params: {
          access_key: this.apiKey,
          // Premium
          // base: 'CAD',
          symbols: 'USD,EUR,CAD',
        },
      });
      return response.data;
    } catch (error: unknown) {
      console.error(error);
      return mockResponse;
    }
  }
}
