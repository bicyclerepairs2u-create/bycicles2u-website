export interface CompressImageOptions {
  maxWidth?: number
  maxHeight?: number
  quality?: number
}

export function compressImage(
  file: File,
  { maxWidth = 1920, maxHeight = 1920, quality = 0.8 }: CompressImageOptions = {},
): Promise<File> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    const objectUrl = URL.createObjectURL(file)

    img.onload = () => {
      URL.revokeObjectURL(objectUrl)

      let { width, height } = img
      if (width > maxWidth || height > maxHeight) {
        const ratio = Math.min(maxWidth / width, maxHeight / height)
        width = Math.round(width * ratio)
        height = Math.round(height * ratio)
      }

      const canvas = document.createElement("canvas")
      canvas.width = width
      canvas.height = height
      const ctx = canvas.getContext("2d")
      if (!ctx) {
        resolve(file)
        return
      }
      ctx.drawImage(img, 0, 0, width, height)

      canvas.toBlob(
        (blob) => {
          if (!blob) {
            resolve(file)
            return
          }
          const compressedFile = new File(
            [blob],
            file.name.replace(/\.[^.]+$/, ".jpg"),
            { type: "image/jpeg", lastModified: Date.now() },
          )
          resolve(compressedFile)
        },
        "image/jpeg",
        quality,
      )
    }

    img.onerror = () => {
      URL.revokeObjectURL(objectUrl)
      reject(
        new Error(
          "Could not read image. HEIC photos from iPhones aren't supported in most browsers — please change your iPhone Camera setting to 'Most Compatible' (Settings → Camera → Formats), or convert the photo to JPG before uploading.",
        ),
      )
    }

    img.src = objectUrl
  })
}
