'use client';

import { ApparelType } from '@shared';
import Image from 'next/image';

import shirtImage from '../../public/shirt.png';
import sweaterImage from '../../public/sweater.png';
import { useMemo } from 'react';

interface Props {
  apparelType: ApparelType;
  color?: string;
  customText?: string;
  customImage?: string;
}

export default function DesignImagePreview({
  apparelType,
  color,
  customText,
  customImage,
}: Props) {
  const images = {
    [ApparelType.TSHIRT]: shirtImage,
    [ApparelType.SWEATER]: sweaterImage,
  };

  const textColor = useMemo(
    () => (color == 'bg-black' ? 'text-white' : 'text-black'),
    [color]
  );

  return (
    <div className="flex-1">
      <div className="relative rounded-lg shadow-lg overflow-hidden">
        <div className="relative max-w-xl mx-auto mt-20">
          <div className="relative w-[100%]">
            <Image
              priority={true}
              src={images[apparelType]}
              className={color}
              sizes="100vw"
              style={{
                width: '100%',
                height: 'auto',
                display: 'block',
              }}
              width={0}
              height={0}
              alt="Picture of Sweater or T-Shirt"
            />
            <div className="p-4 absolute inset-0 flex items-center justify-center shadow-lg rounded-lg">
              {customImage && (
                <Image
                  priority={true}
                  src={decodeURIComponent(customImage)}
                  className="w-1/2 h-1/2 object-contain"
                  width={0}
                  height={0}
                  style={{
                    width: '30%',
                    height: '30%',
                    display: 'block',
                  }}
                  alt="Picture of Sweater or T-Shirt"
                />
              )}
              <h2
                className={`${textColor} font-semibold tracking-tight`}
                style={{
                  position: 'absolute',
                  top: '30%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  fontSize: 'clamp(1rem, 5%, 2rem)',
                }}
              >
                {customText}
              </h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
