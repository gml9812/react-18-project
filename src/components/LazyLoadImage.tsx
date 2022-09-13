import { useIsImgLoaded } from 'src/hooks/useIsImgLoaded';

export type LazyLoadImageProps = {
  src: string;
  alt: string;
  width: number | '100%';
  height: number | '100%';

  /** lazy loading 여부 */
  lazy?: boolean;
};

export const LazyLoadImage = (props: LazyLoadImageProps) => {
  const { src, alt, width, height, lazy = false } = props;

  const { elementRef, isLoaded } = useIsImgLoaded(lazy);

  return (
    <img
      ref={elementRef}
      alt={alt}
      src={isLoaded ? src : ``}
      style={{ width, height }}
    />
  );
};
