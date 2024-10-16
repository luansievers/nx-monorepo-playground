'use client';
import {
  Button,
  Input,
  RadioGroup,
  RadioGroupItem,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@ui-kit/ui';
import {
  ApparelType,
  Currency,
  MaterialType,
  CommonColors,
  SweaterColor,
  TShirtColor,
  SaveApparelDTO,
} from '@shared';
import { UseFormReturn } from 'react-hook-form';

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@ui-kit/ui/lib/ui/form';

import { toast } from '@ui-kit/ui/hooks/use-toast';
import { RocketIcon } from '@radix-ui/react-icons';
import { useApparelMutation } from '../../queries';

export const colorOptions = {
  [ApparelType.TSHIRT]: [
    { value: CommonColors.BLACK, class: 'bg-black' },
    { value: CommonColors.WHITE, class: 'bg-white' },
    { value: TShirtColor.GREEN, class: 'bg-green-500', extra: 2 },
    { value: TShirtColor.RED, class: 'bg-red-500', extra: 2 },
  ],
  [ApparelType.SWEATER]: [
    { value: CommonColors.BLACK, class: 'bg-black' },
    { value: CommonColors.WHITE, class: 'bg-white' },
    { value: SweaterColor.PINK, class: 'bg-pink-300', extra: 4 },
    { value: SweaterColor.YELLOW, class: 'bg-yellow-300', extra: 4 },
  ],
};

export default function DesignForm({
  form,
}: {
  form: UseFormReturn<{
    apparelType: ApparelType;
    color: string;
    currency: Currency;
    material: MaterialType | null;
    customText?: string | undefined;
    customImage?: string;
  }>;
}) {
  /**
   * Options for the Material Radio Group
   */
  const materialOptions = [
    { label: 'Light Cotton', value: MaterialType.LIGHT },
    {
      label: `Heavy Cotton (+3.00)`,
      value: MaterialType.HEAVY,
    },
  ];

  // const [isPending, startTransition] = useTransition();

  const { mutateAsync: saveApparel, isPending } = useApparelMutation();

  const onSubmit = async (data: SaveApparelDTO) => {
    await saveApparel(data);

    toast({
      title: 'You submitted the following values:',
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  };

  /**
   * When the Apparel Type Changes, we need to clean the errors,
   * reset the field material and reset the color
   */
  const onValueChangeApparelType = () => {
    form.clearErrors();
    form.resetField('material', { defaultValue: undefined });
    form.resetField('color', { defaultValue: CommonColors.WHITE });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex-1 space-y-6 relative"
      >
        <FormField
          control={form.control}
          name="apparelType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Choose Apparel Type:</FormLabel>
              <FormControl>
                <Select
                  onValueChange={(e) => {
                    field.onChange(e);
                    onValueChangeApparelType();
                  }}
                  defaultValue={field.value}
                  disabled={isPending}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select the apparel type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {Object.values(ApparelType).map((value) => (
                      <SelectItem key={value} value={value}>
                        {value}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {form.getValues().apparelType === ApparelType.TSHIRT && (
          <FormField
            control={form.control}
            name="material"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Choose Material:</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value ? field.value : undefined}
                    className="flex gap-4 mt-1"
                    disabled={isPending}
                  >
                    {materialOptions.map((materialOption) => (
                      <FormItem
                        className="flex items-center space-x-3 space-y-0"
                        key={materialOption.value}
                      >
                        <FormControl>
                          <RadioGroupItem value={materialOption.value} />
                        </FormControl>
                        <FormLabel className="font-normal">
                          {materialOption.label}
                        </FormLabel>
                      </FormItem>
                    ))}
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        <FormField
          control={form.control}
          name="color"
          render={({ field }) => {
            const selectedColor = colorOptions[
              form.getValues().apparelType
            ].find((item) => item.value === field.value);
            return (
              <FormItem>
                <FormLabel>Choose Color:</FormLabel>
                <FormControl>
                  <div className="flex flex-wrap gap-3 mt-1">
                    {colorOptions[form.getValues().apparelType].map(
                      (colorOption) => (
                        <Button
                          disabled={isPending}
                          variant="hoverNone"
                          type="button"
                          key={colorOption.value}
                          className={`${
                            colorOption.class
                          } w-8 h-8 rounded-full  ${
                            form.getValues().color == colorOption.value &&
                            'outline outline-offset-1 outline-2 outline-green-700'
                          }`}
                          onClick={() => {
                            form.setValue('color', colorOption.value);
                          }}
                          aria-label={colorOption.value}
                        />
                      )
                    )}
                  </div>
                </FormControl>
                {selectedColor?.extra && (
                  <FormDescription className="text-sm text-muted-foreground mt-1">
                    Additional +{selectedColor.extra} charge.
                  </FormDescription>
                )}
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <FormField
          control={form.control}
          name="customText"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Add Custom Text (max 16 characters):</FormLabel>
              <FormControl>
                <Input
                  disabled={isPending}
                  {...field}
                  placeholder="Enter your text here"
                  maxLength={16}
                />
              </FormControl>
              {field.value && field.value?.length > 9 && (
                <FormDescription className="text-sm text-muted-foreground mt-1">
                  Additional +5 charge for text over 8 characters.
                </FormDescription>
              )}
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="customImage"
          render={({ field: { value, onChange, ...fieldProps } }) => (
            <FormItem>
              <FormLabel>Upload Custom Image (+10):</FormLabel>
              <FormControl>
                <Input
                  disabled={isPending}
                  {...fieldProps}
                  type="file"
                  accept="image/*"
                  onChange={(event) => {
                    const file = event.target.files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onload = (e) => {
                        form.setValue(
                          'customImage',
                          e.target?.result as string
                        );
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-between">
          <div className="flex gap-2">
            <FormField
              control={form.control}
              name="currency"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      disabled={isPending}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a Currency" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Object.values(Currency).map((value) => (
                          <SelectItem key={value} value={value}>
                            {value}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" disabled={isPending}>
            <RocketIcon className="mr-2" />
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
}
