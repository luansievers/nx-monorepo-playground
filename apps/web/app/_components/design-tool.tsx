'use client';

import DesignImagePreview from './design-image-preview';
import DesignForm, { colorOptions } from './design-form';
import { useForm } from 'react-hook-form';

import {
  ExchangeRateResponse,
  SaveApparelDTO,
  SaveApparelSchema,
} from '@shared';
import { zodResolver } from '@hookform/resolvers/zod';
import { ApparelType, CommonColors, Currency, MaterialType } from '@shared';
import { useEffect, useMemo, useState } from 'react';
import { formatCurrency } from '../../utils/format-currency';
import { useExchangeRatesQuery } from '../../queries';

interface Props {
  initialValues: SaveApparelDTO | undefined;
}

export default function DesignTool({ initialValues }: Props) {
  const [exchangeRates, setExchangeRates] = useState<ExchangeRateResponse>();

  const { data } = useExchangeRatesQuery();

  useEffect(() => {
    setExchangeRates(data);
  }, [data]);

  const form = useForm<SaveApparelDTO>({
    resolver: zodResolver(SaveApparelSchema),
    defaultValues: {
      apparelType: ApparelType.TSHIRT,
      color: CommonColors.WHITE,
      currency: Currency.EUR,
      material: null,
      customImage: '',
      customText: '',
    },
    values: initialValues,
  });

  /**
   * Watchers
   */
  const currentApparelType = form.watch('apparelType');
  const currentColor = form.watch('color');
  const currentMaterial = form.watch('material');
  const currentText = form.watch('customText');
  const currentImage = form.watch('customImage');
  const currentCurrency = form.watch('currency') as Currency;

  const currentColorObject = useMemo(() => {
    const apparelType = form.getValues('apparelType') as ApparelType;
    return colorOptions[apparelType].find((item) => item.value == currentColor);
  }, [currentColor, form]);

  /**
   * Total Price Calculation
   */
  const totalPrice = useMemo(() => {
    let total = 0;

    /**
     * Bases Prices
     */
    if (currentApparelType == ApparelType.TSHIRT) {
      total += 16.95;
    } else {
      total += 28.95;
    }

    /**
     * Color Price
     */
    if (currentColorObject && currentColorObject.extra) {
      total += currentColorObject.extra;
    }

    /**
     * Extra 3 if material is heavy cotton
     */
    if (currentMaterial == MaterialType.HEAVY) {
      total += 3;
    }

    /**
     * Extra 5 if Text is bigger then 8
     */
    if (currentText && currentText.length > 8) {
      total += 5;
    }

    /**
     * Extra 10 if contains image
     */
    if (currentImage && currentImage.length > 1) {
      total += 10;
    }

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const exchangeRate = exchangeRates!.rates[currentCurrency];
    return total * exchangeRate;
  }, [
    currentApparelType,
    currentColorObject,
    currentMaterial,
    currentText,
    currentImage,
    exchangeRates,
    currentCurrency,
  ]);

  return (
    <>
      <DesignImagePreview
        apparelType={form.getValues('apparelType')}
        color={currentColorObject?.class}
        customText={currentText}
        customImage={currentImage}
      />
      <div className="flex flex-col">
        <span className="text-2xl font-bold text-right">
          {formatCurrency(totalPrice, form.getValues('currency'))}
        </span>
        <DesignForm form={form} />
      </div>
    </>
  );
}
