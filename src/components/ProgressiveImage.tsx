import { useState, useEffect } from 'react';
import styled from 'styled-components';

interface ProgressiveImageProps extends React.ComponentProps<'img'> {
  placeholderSrc: string;
  src: string;
}

export const ProgressiveImage = ({
  placeholderSrc,
  src,
  ...props
}: ProgressiveImageProps) => {
  const [imgSrc, setImgSrc] = useState(placeholderSrc || src);

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      setImgSrc(src);
    };
  }, [src]);

  return <img {...{ src: imgSrc, ...props }} alt={props.alt || ''} />;
};
