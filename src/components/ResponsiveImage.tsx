import { useLayoutEffect, useRef } from "react";
import { responsiveImage } from "../utils/responsiveImage";

interface ResponsiveImageProps {
  src: string;
  alt: string;
  /** Maps layout width to viewport, so the browser picks the right variant. */
  sizes: string;
  className?: string;
  loading?: "eager" | "lazy";
  fetchPriority?: "high" | "low" | "auto";
  style?: React.CSSProperties;
  onClick?: (e: React.MouseEvent<HTMLImageElement>) => void;
}

/**
 * <picture> with an AVIF -> WebP -> original ladder. Intrinsic width/height
 * always land on the <img> so the box is reserved before bytes arrive.
 *
 * The fallback `src` is attached after mount rather than rendered as a prop.
 * React creates the <img> and sets its attributes before the sibling <source>
 * elements are in the DOM, so a JSX `src` makes the browser start downloading
 * the original *and* the chosen variant — measured as 13 redundant PNG
 * requests on the hero alone. Assigning it once the <source> elements exist
 * lets source selection run properly and only the chosen variant is fetched.
 */
const ResponsiveImage: React.FC<ResponsiveImageProps> = ({
  src,
  alt,
  sizes,
  className,
  loading = "lazy",
  fetchPriority = "auto",
  style,
  onClick,
}) => {
  const { avif, webp, fallback, width, height } = responsiveImage(src);
  const imgRef = useRef<HTMLImageElement>(null);

  useLayoutEffect(() => {
    const img = imgRef.current;
    if (img && img.getAttribute("src") !== fallback) {
      img.setAttribute("src", fallback);
    }
  }, [fallback]);

  return (
    <picture>
      {avif && <source type="image/avif" srcSet={avif} sizes={sizes} />}
      {webp && <source type="image/webp" srcSet={webp} sizes={sizes} />}
      <img
        ref={imgRef}
        alt={alt}
        width={width}
        height={height}
        loading={loading}
        decoding="async"
        fetchPriority={fetchPriority}
        className={className}
        style={style}
        onClick={onClick}
      />
    </picture>
  );
};

export default ResponsiveImage;
