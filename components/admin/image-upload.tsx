"use client"

import { useCallback, useState } from "react"
import { Box, Typography, IconButton, CircularProgress } from "@mui/material"
import { X, Upload, Image as ImageIcon, GripVertical } from "lucide-react"

interface ImageUploadProps {
  images: File[]
  onImagesChange: (images: File[]) => void
  maxImages?: number
  disabled?: boolean
}

export default function ImageUpload({
  images,
  onImagesChange,
  maxImages = 5,
  disabled = false,
}: ImageUploadProps) {
  const [dragOver, setDragOver] = useState(false)
  const [previews, setPreviews] = useState<string[]>([])

  // Generate previews when images change
  const generatePreviews = useCallback((files: File[]) => {
    const newPreviews: string[] = []
    files.forEach((file) => {
      const reader = new FileReader()
      reader.onload = (e) => {
        newPreviews.push(e.target?.result as string)
        if (newPreviews.length === files.length) {
          setPreviews([...newPreviews])
        }
      }
      reader.readAsDataURL(file)
    })
    if (files.length === 0) {
      setPreviews([])
    }
  }, [])

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setDragOver(false)

      if (disabled) return

      const droppedFiles = Array.from(e.dataTransfer.files).filter((file) =>
        file.type.startsWith("image/")
      )

      const newImages = [...images, ...droppedFiles].slice(0, maxImages)
      onImagesChange(newImages)
      generatePreviews(newImages)
    },
    [images, maxImages, onImagesChange, generatePreviews, disabled]
  )

  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (disabled) return

      const selectedFiles = Array.from(e.target.files || []).filter((file) =>
        file.type.startsWith("image/")
      )

      const newImages = [...images, ...selectedFiles].slice(0, maxImages)
      onImagesChange(newImages)
      generatePreviews(newImages)

      // Reset input
      e.target.value = ""
    },
    [images, maxImages, onImagesChange, generatePreviews, disabled]
  )

  const removeImage = useCallback(
    (index: number) => {
      const newImages = images.filter((_, i) => i !== index)
      onImagesChange(newImages)
      generatePreviews(newImages)
    },
    [images, onImagesChange, generatePreviews]
  )

  const moveImage = useCallback(
    (fromIndex: number, toIndex: number) => {
      if (toIndex < 0 || toIndex >= images.length) return

      const newImages = [...images]
      const [movedImage] = newImages.splice(fromIndex, 1)
      newImages.splice(toIndex, 0, movedImage)

      onImagesChange(newImages)
      generatePreviews(newImages)
    },
    [images, onImagesChange, generatePreviews]
  )

  return (
    <Box>
      {/* Drop Zone */}
      <Box
        onDragOver={(e) => {
          e.preventDefault()
          if (!disabled) setDragOver(true)
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        sx={{
          border: `2px dashed ${dragOver ? "#00d4ff" : "var(--theme-border)"}`,
          borderRadius: 0,
          p: 4,
          textAlign: "center",
          backgroundColor: dragOver
            ? "rgba(0, 212, 255, 0.05)"
            : "var(--theme-bg-primary)",
          transition: "all 0.2s ease",
          cursor: disabled ? "not-allowed" : "pointer",
          opacity: disabled ? 0.6 : 1,
          "&:hover": {
            borderColor: disabled ? "var(--theme-border)" : "#00d4ff",
            backgroundColor: disabled
              ? "var(--theme-bg-primary)"
              : "rgba(0, 212, 255, 0.05)",
          },
        }}
        onClick={() => {
          if (!disabled) {
            document.getElementById("image-upload-input")?.click()
          }
        }}
      >
        <input
          id="image-upload-input"
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileSelect}
          style={{ display: "none" }}
          disabled={disabled}
        />

        <Upload
          size={40}
          style={{
            color: dragOver ? "#00d4ff" : "var(--theme-text-muted)",
            marginBottom: 16,
          }}
        />

        <Typography
          variant="h6"
          sx={{
            fontWeight: 600,
            color: "var(--theme-text-primary)",
            mb: 1,
          }}
        >
          Drop images here
        </Typography>
        <Typography
          variant="body2"
          sx={{ color: "var(--theme-text-muted)", mb: 1 }}
        >
          or click to browse
        </Typography>
        <Typography
          variant="caption"
          sx={{ color: "var(--theme-text-muted)" }}
        >
          Max {maxImages} images. First image will be the featured image.
        </Typography>
      </Box>

      {/* Image Previews */}
      {images.length > 0 && (
        <Box sx={{ mt: 3 }}>
          <Typography
            variant="caption"
            sx={{
              color: "var(--theme-text-muted)",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              fontSize: "0.65rem",
              mb: 1,
              display: "block",
            }}
          >
            Uploaded Images ({images.length}/{maxImages})
          </Typography>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))",
              gap: 2,
            }}
          >
            {images.map((image, index) => (
              <Box
                key={`${image.name}-${index}`}
                sx={{
                  position: "relative",
                  aspectRatio: "1",
                  backgroundColor: "var(--theme-bg-secondary)",
                  border: index === 0 ? "2px solid #00d4ff" : "1px solid var(--theme-border)",
                  borderRadius: 0,
                  overflow: "hidden",
                }}
              >
                {previews[index] ? (
                  <img
                    src={previews[index]}
                    alt={image.name}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                ) : (
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      height: "100%",
                    }}
                  >
                    <CircularProgress size={24} sx={{ color: "#00d4ff" }} />
                  </Box>
                )}

                {/* Featured badge */}
                {index === 0 && (
                  <Box
                    sx={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      backgroundColor: "#00d4ff",
                      color: "#000",
                      px: 1,
                      py: 0.25,
                      fontSize: "0.6rem",
                      fontWeight: 700,
                      textTransform: "uppercase",
                    }}
                  >
                    Featured
                  </Box>
                )}

                {/* Remove button */}
                <IconButton
                  size="small"
                  onClick={(e) => {
                    e.stopPropagation()
                    removeImage(index)
                  }}
                  disabled={disabled}
                  sx={{
                    position: "absolute",
                    top: 4,
                    right: 4,
                    backgroundColor: "rgba(0,0,0,0.7)",
                    color: "#fff",
                    "&:hover": {
                      backgroundColor: "#f44336",
                    },
                    width: 24,
                    height: 24,
                  }}
                >
                  <X size={14} />
                </IconButton>

                {/* Reorder buttons */}
                {images.length > 1 && (
                  <Box
                    sx={{
                      position: "absolute",
                      bottom: 4,
                      left: 4,
                      display: "flex",
                      gap: 0.5,
                    }}
                  >
                    {index > 0 && (
                      <IconButton
                        size="small"
                        onClick={(e) => {
                          e.stopPropagation()
                          moveImage(index, index - 1)
                        }}
                        disabled={disabled}
                        sx={{
                          backgroundColor: "rgba(0,0,0,0.7)",
                          color: "#fff",
                          width: 20,
                          height: 20,
                          fontSize: "0.7rem",
                          "&:hover": {
                            backgroundColor: "rgba(0, 212, 255, 0.8)",
                          },
                        }}
                      >
                        ←
                      </IconButton>
                    )}
                    {index < images.length - 1 && (
                      <IconButton
                        size="small"
                        onClick={(e) => {
                          e.stopPropagation()
                          moveImage(index, index + 1)
                        }}
                        disabled={disabled}
                        sx={{
                          backgroundColor: "rgba(0,0,0,0.7)",
                          color: "#fff",
                          width: 20,
                          height: 20,
                          fontSize: "0.7rem",
                          "&:hover": {
                            backgroundColor: "rgba(0, 212, 255, 0.8)",
                          },
                        }}
                      >
                        →
                      </IconButton>
                    )}
                  </Box>
                )}
              </Box>
            ))}
          </Box>
        </Box>
      )}
    </Box>
  )
}
