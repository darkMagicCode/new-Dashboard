'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

interface ImageFallbackProps {
  src: string;
  fallback: string;
  alt?: string;
  width?: number;
  height?: number;
  [key: string]: any; // For any additional props
}

const ImageFallback: React.FC<ImageFallbackProps> = ({
  src,
  fallback,
  alt,
  width,
  height,
  ...rest
}) => {
  const [imgSrc, setImgSrc] = useState(src);

  useEffect(() => {
    setImgSrc(src);
  }, [src]);

  return (
    <Image
      {...rest}
      src={imgSrc}
      onError={() => {
        setImgSrc(fallback);
      }}
      alt={alt || 'image'}
      width={width}
      height={height}
    />
  );
};

export default ImageFallback;
