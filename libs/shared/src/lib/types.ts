export enum ApparelType {
  TSHIRT = 'T-Shirt',
  SWEATER = 'Sweater',
}

export enum MaterialType {
  LIGHT = 'Light',
  HEAVY = 'Heavy',
}

export enum CommonColors {
  WHITE = 'White',
  BLACK = 'Black',
}

export enum TShirtColor {
  GREEN = 'Green',
  RED = 'Red',
}

export enum SweaterColor {
  PINK = 'Pink',
  YELLOW = 'Yellow',
}

export enum Currency {
  USD = 'USD',
  CAD = 'CAD',
  EUR = 'EUR',
}

export interface ExchangeRateResponse {
  success: boolean;
  timestamp: number;
  base: string;
  date: string;
  rates: {
    USD: number;
    CAD: number;
    EUR: number;
  };
}
