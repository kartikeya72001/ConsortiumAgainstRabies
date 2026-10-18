/**
 * Cloudinary image optimization utility.
 * If NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME is provided, transforms the image URL.
 * Otherwise, falls back to the local public path gracefully.
 */

export function getOptimizedImageUrl(pathOrUrl, options = {}) {
  if (!pathOrUrl) return '/Logo.jpg';

  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const { width, quality = 'auto', format = 'auto' } = options;

  // If already an absolute Cloudinary URL, return as-is
  if (pathOrUrl.startsWith('https://res.cloudinary.com')) {
    return pathOrUrl;
  }

  // If external URL and Cloudinary is configured, use fetch delivery
  if (cloudName && (pathOrUrl.startsWith('http://') || pathOrUrl.startsWith('https://'))) {
    const transformations = [`f_${format}`, `q_${quality}`];
    if (width) transformations.push(`w_${width},c_limit`);
    return `https://res.cloudinary.com/${cloudName}/image/fetch/${transformations.join(',')}/${encodeURIComponent(pathOrUrl)}`;
  }

  // If local asset and Cloudinary is configured with folder upload:
  if (cloudName && process.env.NEXT_PUBLIC_USE_CLOUDINARY_FOR_LOCAL === 'true') {
    const cleanPath = pathOrUrl.replace(/^\/+/, '');
    const transformations = [`f_${format}`, `q_${quality}`];
    if (width) transformations.push(`w_${width},c_limit`);
    return `https://res.cloudinary.com/${cloudName}/image/upload/${transformations.join(',')}/car_assets/${cleanPath}`;
  }

  // Local fallback (served straight from /public)
  return pathOrUrl;
}
