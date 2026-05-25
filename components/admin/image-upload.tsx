"use client"

import { useCallback, useEffect, useState } from "react"
import { Box, Typography, IconButton, CircularProgress } from "@mui/material"
import { X, Upload, Image as ImageIcon, GripVertical } from "lucide-react"

const MAX_FILE_SIZE_MB = 20

interface ImageUploadProps {
  images: File[]
  onImagesChange: (images: File[]) => void
  maxImages?: number
  disabled?: boolean
}

export default function ImageUpload({
  images,
  onImagesChange,
  maxImages = 15,
  disabled = false,
}: ImageUploadProps) {
  const [dragOver, setDragOver] = useState(false)
  const [previews, setPreviews] = useState<string[]>([])
  const [uploadError, setUploadError] = useState<string>("")

  // Derive previews from images via object URLs. Revoked on cleanup so stale callbacks
  // from a previous render can't overwrite the current preview list.
  useEffect(() => {
    const urls = images.map((file) => URL.createObjectURL(file))
    setPreviews(urls)
    return () => {
      urls.forEach((url) => URL.revokeObjectURL(url))
    }
  }, [images])

  const addFiles = useCallback(
    (selected: File[]) => {
      setUploadError("")
      const accepted: File[] = []
      let lastError = ""
      for (const file of selected) {
        if (!file.type.startsWith("image/")) {
          lastError = `Skipped "${file.name}" — not an image file`
          continue
        }
        if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
          lastError = `Skipped "${file.name}" — over ${MAX_FILE_SIZE_MB}MB`
          continue
        }
        accepted.push(file)
      }
      if (lastError) setUploadError(lastError)
      if (accepted.length === 0) return

      onImagesChange([...images, ...accepted].slice(0, maxImages))
    },
    [images, maxImages, onImagesChange],
  )

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setDragOver(false)
      if (disabled) return
      addFiles(Array.from(e.dataTransfer.files))
    },
    [addFiles, disabled],
  )

  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (disabled) return
      addFiles(Array.from(e.target.files || []))
      e.target.value = ""
    },
    [addFiles, disabled],
  )

  const removeImage = useCallback(
    (index: number) => {
      onImagesChange(images.filter((_, i) => i !== index))
    },
    [images, onImagesChange],
  )

  const moveImage = useCallback(
    (fromIndex: number, toIndex: number) => {
      if (toIndex < 0 || toIndex >= images.length) return

      const newImages = [...images]
      const [movedImage] = newImages.splice(fromIndex, 1)
      newImages.splice(toIndex, 0, movedImage)

      onImagesChange(newImages)
    },
    [images, onImagesChange],
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
          Max {maxImages} images, {MAX_FILE_SIZE_MB}MB each. First image will be the featured image.
        </Typography>
      </Box>

      {uploadError && (
        <Typography
          variant="caption"
          sx={{
            display: "block",
            mt: 1,
            color: "#f44336",
          }}
        >
          {uploadError}
        </Typography>
      )}

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
