export class ImageService {
  static async uploadImage(file: File): Promise<string> {
    // In production, this would upload to AWS S3, Cloudinary, or similar
    // For now, we'll simulate the upload and return a placeholder URL

    const formData = new FormData()
    formData.append("file", file)

    // Simulate upload delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Return a placeholder URL that includes the file name for realism
    const fileName = file.name.replace(/\s+/g, "-").toLowerCase()
    return `/uploads/${Date.now()}-${fileName}`
  }

  static async uploadMultipleImages(files: File[]): Promise<string[]> {
    const uploadPromises = files.map((file) => this.uploadImage(file))
    return Promise.all(uploadPromises)
  }

  static validateImage(file: File): { valid: boolean; error?: string } {
    const maxSize = 5 * 1024 * 1024 // 5MB
    const allowedTypes = ["image/jpeg", "image/png", "image/webp"]

    if (!allowedTypes.includes(file.type)) {
      return { valid: false, error: "Tipo de arquivo não suportado. Use JPG, PNG ou WebP." }
    }

    if (file.size > maxSize) {
      return { valid: false, error: "Arquivo muito grande. Máximo 5MB." }
    }

    return { valid: true }
  }
}
