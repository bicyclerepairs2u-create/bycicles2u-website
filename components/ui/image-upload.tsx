"use client"

import { useState, useRef } from "react"
import {
  Box,
  Button,
  IconButton,
  Typography,
  Stack,
  FormHelperText,
  Paper,
} from "@mui/material"
import { Trash2 } from "lucide-react"

export interface UploadedImage {
  file: File
  preview: string
  id: string
}

interface ImageUploadProps {
  images: UploadedImage[]
  onChange: (images: UploadedImage[]) => void
  maxImages?: number
  maxSizeMB?: number
  error?: string
  required?: boolean
  label?: string
  helperText?: string
}

export default function ImageUpload({
  images,
  onChange,
  maxImages = 5,
  maxSizeMB = 5,
  error,
  required = false,
  label = "Photos",
  helperText = `Maximum ${maxImages} photos, ${maxSizeMB}MB each. JPG, PNG, HEIC formats supported.`,
}: ImageUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const cameraInputRef = useRef<HTMLInputElement>(null)
  const [uploadError, setUploadError] = useState<string>("")

  const handleFileSelect = (files: FileList | null, source: "upload" | "camera") => {
    if (!files) return

    setUploadError("")

    const newImages: UploadedImage[] = []
    const filesArray = Array.from(files)

    // Check if adding these files would exceed max images
    if (images.length + filesArray.length > maxImages) {
      setUploadError(`Maximum ${maxImages} photos allowed`)
      return
    }

    for (const file of filesArray) {
      // Check file size
      if (file.size > maxSizeMB * 1024 * 1024) {
        setUploadError(`Image size must be less than ${maxSizeMB}MB`)
        continue
      }

      // Check file type
      if (!file.type.startsWith("image/")) {
        setUploadError("Please upload image files only")
        continue
      }

      // Create preview
      const reader = new FileReader()
      const id = `${Date.now()}-${Math.random()}`

      reader.onloadend = () => {
        newImages.push({
          file,
          preview: reader.result as string,
          id,
        })

        // Once all files are processed, update parent
        if (newImages.length === filesArray.length) {
          onChange([...images, ...newImages])
        }
      }

      reader.readAsDataURL(file)
    }
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFileSelect(e.target.files, "upload")
    // Reset input so same file can be selected again
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const handleCameraCapture = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFileSelect(e.target.files, "camera")
    // Reset input
    if (cameraInputRef.current) {
      cameraInputRef.current.value = ""
    }
  }

  const handleRemoveImage = (id: string) => {
    onChange(images.filter((img) => img.id !== id))
    setUploadError("")
  }

  const displayError = error || uploadError

  return (
    <Box>
      <Typography variant="h6" sx={{ fontWeight: 600, color: "#212121", mb: 2 }}>
        {label} {required && "*"}
      </Typography>

      {/* Upload Buttons */}
      <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
        <Button
          variant="outlined"
          component="label"
          disabled={images.length >= maxImages}
          sx={{
            borderColor: displayError ? "#d32f2f" : "#0288d1",
            color: displayError ? "#d32f2f" : "#0288d1",
            fontWeight: 600,
            textTransform: "none",
            borderWidth: "2px",
            "&:hover": {
              borderWidth: "2px",
              borderColor: displayError ? "#d32f2f" : "#0277bd",
            },
            "&.Mui-disabled": {
              borderColor: "#e0e0e0",
              color: "#9e9e9e",
            },
          }}
        >
          <i className="fi fi-rr-folder-upload" style={{ marginRight: "8px" }}></i>
          Upload from Device
          <input
            ref={fileInputRef}
            type="file"
            hidden
            accept="image/*"
            multiple
            onChange={handleFileUpload}
          />
        </Button>

        <Button
          variant="outlined"
          component="label"
          disabled={images.length >= maxImages}
          sx={{
            borderColor: displayError ? "#d32f2f" : "#0288d1",
            color: displayError ? "#d32f2f" : "#0288d1",
            fontWeight: 600,
            textTransform: "none",
            borderWidth: "2px",
            "&:hover": {
              borderWidth: "2px",
              borderColor: displayError ? "#d32f2f" : "#0277bd",
            },
            "&.Mui-disabled": {
              borderColor: "#e0e0e0",
              color: "#9e9e9e",
            },
          }}
        >
          <i className="fi fi-rr-camera" style={{ marginRight: "8px" }}></i>
          Take Photo
          <input
            ref={cameraInputRef}
            type="file"
            hidden
            accept="image/*"
            capture="environment"
            onChange={handleCameraCapture}
          />
        </Button>
      </Stack>

      {/* Helper Text / Error */}
      {displayError ? (
        <FormHelperText error sx={{ mb: 2 }}>
          {displayError}
        </FormHelperText>
      ) : (
        <FormHelperText sx={{ mb: 2 }}>{helperText}</FormHelperText>
      )}

      {/* Image Previews */}
      {images.length > 0 && (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "repeat(2, 1fr)",
              sm: "repeat(3, 1fr)",
              md: "repeat(4, 1fr)",
            },
            gap: 2,
            mt: 2,
          }}
        >
          {images.map((image, index) => (
            <Paper
              key={image.id}
              elevation={2}
              sx={{
                position: "relative",
                borderRadius: "8px",
                overflow: "hidden",
                aspectRatio: "1",
              }}
            >
              <img
                src={image.preview}
                alt={`Preview ${index + 1}`}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                }}
              />
              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundColor: "rgba(0, 0, 0, 0.4)",
                  opacity: 0,
                  transition: "opacity 0.2s",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  "&:hover": {
                    opacity: 1,
                  },
                }}
              >
                <IconButton
                  onClick={() => handleRemoveImage(image.id)}
                  sx={{
                    color: "#ffffff",
                    backgroundColor: "rgba(211, 47, 47, 0.8)",
                    "&:hover": {
                      backgroundColor: "rgba(211, 47, 47, 1)",
                    },
                  }}
                >
                  <Trash2 size={20} />
                </IconButton>
              </Box>
              <Typography
                variant="caption"
                sx={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  backgroundColor: "rgba(0, 0, 0, 0.7)",
                  color: "#ffffff",
                  px: 1,
                  py: 0.5,
                  fontSize: "0.7rem",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {image.file.name}
              </Typography>
            </Paper>
          ))}
        </Box>
      )}

      {/* Image Count */}
      {images.length > 0 && (
        <Typography
          variant="caption"
          sx={{
            display: "block",
            mt: 2,
            color: "#757575",
            textAlign: "center",
          }}
        >
          {images.length} of {maxImages} photos uploaded
        </Typography>
      )}
    </Box>
  )
}
