import manifest from "./imageManifest.json";

interface ManifestEntry {
  width: number;
  height: number;
  /** Path prefix for variants, e.g. "/assets/img/opt/tradebot-dashboard". */
  base: string;
  widths: number[];
}

export interface ResponsiveSources {
  /** srcSet for <source type="image/avif">; empty when no variants exist. */
  avif: string;
  /** srcSet for <source type="image/webp">; empty when no variants exist. */
  webp: string;
  /** Original file — the <img> fallback, always present. */
  fallback: string;
  width?: number;
  height?: number;
}

const entries = manifest as Record<string, ManifestEntry>;

/**
 * Looks up the generated AVIF/WebP ladder for a source path. Images with no
 * entry degrade to the original file rather than breaking.
 */
export const responsiveImage = (src: string): ResponsiveSources => {
  const entry = entries[src];
  if (!entry) return { avif: "", webp: "", fallback: src };

  const srcSet = (ext: string) =>
    entry.widths.map((w) => `${entry.base}-${w}.${ext} ${w}w`).join(", ");

  return {
    avif: srcSet("avif"),
    webp: srcSet("webp"),
    fallback: src,
    width: entry.width,
    height: entry.height,
  };
};
