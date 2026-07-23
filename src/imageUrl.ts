/** Builds a URL for a file in public/, honoring the GitHub Pages base path. */
export function imageUrl(path: string): string {
  return `${import.meta.env.BASE_URL}${path}`;
}
