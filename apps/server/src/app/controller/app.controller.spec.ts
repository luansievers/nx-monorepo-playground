import { NotFoundException } from '@nestjs/common';
import { AppService } from '../service/app.service';
import { ExchangeRateService } from '../service/exchange-rate.service';
import { AppController } from './app.controller';
import { Test } from '@nestjs/testing';
import { ApparelType, CommonColors, Currency, MaterialType } from '@shared';

describe('AppController', () => {
  let appController: AppController;
  let appService: AppService;
  //   let exchangeRateService: ExchangeRateService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [AppController],
      providers: [ExchangeRateService, AppService],
    }).compile();

    // exchangeRateService = moduleRef.get(ExchangeRateService);
    appService = moduleRef.get(AppService);
    appController = moduleRef.get(AppController);
  });

  describe('apparel', () => {
    it('should throw NotFoundException', async () => {
      jest.spyOn(appService, 'findApparel').mockImplementation(() => {
        throw new NotFoundException();
      });

      expect(() => appService.findApparel()).toThrow(NotFoundException);
      expect(() => appController.getApparel()).toThrow(NotFoundException);
    });
    it('should save', async () => {
      //   jest.spyOn(appService, 'saveApparel').mockReturnValue(undefined);

      const payload = {
        apparelType: ApparelType.TSHIRT,
        material: MaterialType.LIGHT,
        color: CommonColors.WHITE,
        customText: '',
        customImage: '',
        currency: Currency.CAD,
      };

      expect(() => appService.saveApparel(payload)).toHaveReturned();
      //   expect(() => appService.findApparel()).toThrow(NotFoundException);
    });
  });
});
