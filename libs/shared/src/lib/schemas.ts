import { z } from 'zod';
import {
  ApparelType,
  CommonColors,
  Currency,
  MaterialType,
  SweaterColor,
  TShirtColor,
} from './types';

const tShirtColorUnion = z.union([
  z.nativeEnum(TShirtColor),
  z.nativeEnum(CommonColors),
]);
const sweaterColorUnion = z.union([
  z.nativeEnum(SweaterColor),
  z.nativeEnum(CommonColors),
]);

export const SaveApparelSchema = z
  .object({
    apparelType: z.nativeEnum(ApparelType),
    material: z.nativeEnum(MaterialType).nullable(),
    color: z.string(),
    customText: z.string().max(16).optional(),
    customImage: z.string().optional(),
    currency: z.nativeEnum(Currency),
  })
  .superRefine((data, context) => {
    // Validate Material
    if (
      data.apparelType === ApparelType.TSHIRT &&
      data.material === undefined
    ) {
      context.addIssue({
        message: 'Material is required',
        path: ['material'],
        code: z.ZodIssueCode.custom,
      });
    }
    // Validate Colors
    if (
      data.apparelType === ApparelType.TSHIRT &&
      !tShirtColorUnion.safeParse(data.color).success
    ) {
      context.addIssue({
        message: 'Color Invalid',
        path: ['color'],
        code: z.ZodIssueCode.custom,
      });
    }
    if (
      data.apparelType === ApparelType.SWEATER &&
      !sweaterColorUnion.safeParse(data.color).success
    ) {
      context.addIssue({
        message: 'Color Invalid',
        path: ['color'],
        code: z.ZodIssueCode.custom,
      });
    }
    return true;
  });

export type SaveApparelDTO = z.infer<typeof SaveApparelSchema>;
