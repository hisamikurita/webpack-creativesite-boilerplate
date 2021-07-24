export const webpCheckDevice = () => {
  return document.createElement('canvas').toDataURL('image/webp').indexOf('data:image/webp') == 0 ? '.webp' : '.jpg';
}