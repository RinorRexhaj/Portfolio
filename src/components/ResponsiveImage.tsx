import { responsiveImage } from "../utils/responsiveImage";

interface ResponsiveImageProps {
  src: string;
  alt: string;
  /** Maps layout width to viewport, so the browser picks the right variant. */
  sizes: string;
  className?: string;
  loading?: "eager" | "lazy";
  fetchPriority?: "high" | "low" | "auto";
  onClick?: (e: React.MouseEvent<HTMLImageElement>) => void;
}

/**
 * <picture> with an AVIF -> WebP -> original ladder. Intrinsic width/height
 * always land on the <img> so the box is reserved before bytes arrive.
 */
const ResponsiveImage: React.FC<ResponsiveImageProps> = ({
  src,
  alt,
  sizes,
  className,
  loading = "lazy",
  fetchPriority = "auto",
  onClick,
}) => {
  const { avif, webp, fallback, width, height } = responsiveImage(src);

  return (
    <picture>
      {avif && <source type="image/avif" srcSet={avif} sizes={sizes} />}
      {webp && <source type="image/webp" srcSet={webp} sizes={sizes} />}
      <img
        src={fallback}
        alt={alt}
        width={width}
        height={height}
        loading={loading}
        decoding="async"
        fetchPriority={fetchPriority}
        className={className}
        onClick={onClick}
      />
    </picture>
  );
};

export default ResponsiveImage;
