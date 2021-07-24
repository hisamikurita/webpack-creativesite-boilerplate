const path = require('path');
const { ImagePool, encoders } = require('@squoosh/lib');
const config = {
  mozjpeg: {
    quality: 75
  },
  webp: {
    quality: 75
  },
  avif: {
    cqLevel: 33
  },
  jxl: {
    quality: 75
  },
  wp2: {
    quality: 75
  },
  oxipng: {
    level: 2
  }
}

exports.optimizeImage = async (content, absoluteFrom) => {
  let encoder = ''
  const ext = path.extname(absoluteFrom)
  for (const key of Object.keys(encoders)) {
    if (ext === `.${encoders[key].extension}`) encoder = key
  }
  if (!encoder) return content
  const imagePool = new ImagePool()
  const image = imagePool.ingestImage(content)
  let encodedImage = null
  try {
    await image.encode(config)
    await imagePool.close()
    encodedImage = await image.encodedWith[encoder]
  } catch (error) {
    console.error(error)
    return content
  }
  return Buffer.from(encodedImage.binary)
}
