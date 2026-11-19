/**
 * Static hosts (GitHub Pages) have no image optimiser, so images are served as-is.
 * Paths from /public are prefixed with the base path when the site lives under a sub-path.
 */
export default function imageLoader({ src, width }: { src: string; width: number; quality?: number }) {
  const base = process.env.NEXT_PUBLIC_BASE_PATH || "";
  const url = src.startsWith("/") ? `${base}${src}` : src;
  return `${url}?w=${width}`;
}
