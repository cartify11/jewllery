export const LUXURY_IMAGE_FALLBACK = 
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='800' viewBox='0 0 800 800' fill='%23FAF7F0'><rect width='800' height='800' fill='%23FAF7F0'/><circle cx='400' cy='400' r='180' fill='%23F4EEDA'/><polygon points='400,260 480,350 400,540 320,350' fill='none' stroke='%23C6A15B' stroke-width='3'/><polyline points='320,350 480,350' fill='none' stroke='%23C6A15B' stroke-width='2'/><polyline points='400,260 400,540' fill='none' stroke='%23C6A15B' stroke-width='1.5'/><text x='400' y='590' font-family='serif' font-size='22' text-anchor='middle' fill='%239E7B3B' letter-spacing='6'>AURELIA JEWELS</text></svg>";

export const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
  e.currentTarget.onerror = null;
  e.currentTarget.src = LUXURY_IMAGE_FALLBACK;
};
