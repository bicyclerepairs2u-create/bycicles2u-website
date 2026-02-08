"use client"

import { Box, Typography, Chip, Divider, Paper } from "@mui/material"
import { generateTags, CATEGORY_DISPLAY_MAP, MATERIAL_DISPLAY_MAP } from "@/lib/shopify/tag-generator"
import type { BikeUploadFormData } from "@/lib/shopify/admin-types"

interface TagPreviewProps {
  formData: Partial<BikeUploadFormData>
}

export default function TagPreview({ formData }: TagPreviewProps) {
  const tags = generateTags(formData)
  const hasAnyTags = tags.allTags.length > 0

  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        backgroundColor: "var(--theme-bg-secondary)",
        border: "1px solid var(--theme-border)",
        borderRadius: 0,
      }}
    >
      <Typography
        variant="h6"
        sx={{
          fontWeight: 600,
          color: "var(--theme-text-primary)",
          mb: 2,
          display: "flex",
          alignItems: "center",
          gap: 1,
        }}
      >
        <i className="fi fi-rr-tags" style={{ fontSize: "1.2rem", color: "#00d4ff" }}></i>
        Generated Tags Preview
      </Typography>

      {!hasAnyTags ? (
        <Typography
          variant="body2"
          sx={{ color: "var(--theme-text-muted)", fontStyle: "italic" }}
        >
          Fill out the form to see generated tags...
        </Typography>
      ) : (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {/* Featured Badge */}
          {tags.specialTags.includes("featured") && (
            <Box
              sx={{
                p: 1.5,
                backgroundColor: "rgba(251, 191, 36, 0.15)",
                border: "1px solid #fbbf24",
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <i className="fi fi-rr-star" style={{ color: "#fbbf24" }}></i>
              <Typography sx={{ color: "#fbbf24", fontWeight: 600, fontSize: "0.875rem" }}>
                Featured Product
              </Typography>
              <Chip
                label="featured"
                size="small"
                sx={{
                  ml: "auto",
                  backgroundColor: "rgba(251, 191, 36, 0.2)",
                  color: "#fbbf24",
                  fontWeight: 600,
                  fontSize: "0.75rem",
                  borderRadius: 0,
                }}
              />
            </Box>
          )}

          {/* Category Tags */}
          {tags.categoryTags.length > 0 && (
            <Box>
              <Typography
                variant="caption"
                sx={{
                  color: "var(--theme-text-muted)",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  fontSize: "0.65rem",
                }}
              >
                Bike Type / Use
              </Typography>
              <Box sx={{ display: "flex", gap: 0.5, flexWrap: "wrap", mt: 0.5 }}>
                {tags.categoryTags.map((tag) => (
                  <Chip
                    key={tag}
                    label={tag}
                    size="small"
                    sx={{
                      backgroundColor: "rgba(0, 212, 255, 0.15)",
                      color: "#00d4ff",
                      fontWeight: 500,
                      fontSize: "0.75rem",
                      borderRadius: 0,
                    }}
                  />
                ))}
              </Box>
              {formData.bikeCategory && CATEGORY_DISPLAY_MAP[formData.bikeCategory] && (
                <Typography
                  variant="caption"
                  sx={{ color: "var(--theme-text-muted)", mt: 0.5, display: "block" }}
                >
                  Displays as: {CATEGORY_DISPLAY_MAP[formData.bikeCategory]}
                </Typography>
              )}
            </Box>
          )}

          {/* Material Tags */}
          {tags.materialTags.length > 0 && (
            <Box>
              <Typography
                variant="caption"
                sx={{
                  color: "var(--theme-text-muted)",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  fontSize: "0.65rem",
                }}
              >
                Frame Material
              </Typography>
              <Box sx={{ display: "flex", gap: 0.5, flexWrap: "wrap", mt: 0.5 }}>
                {tags.materialTags.map((tag) => (
                  <Chip
                    key={tag}
                    label={tag}
                    size="small"
                    sx={{
                      backgroundColor: "rgba(33, 150, 243, 0.15)",
                      color: "#2196f3",
                      fontWeight: 500,
                      fontSize: "0.75rem",
                      borderRadius: 0,
                    }}
                  />
                ))}
              </Box>
              {formData.frameMaterial && MATERIAL_DISPLAY_MAP[formData.frameMaterial] && (
                <Typography
                  variant="caption"
                  sx={{ color: "var(--theme-text-muted)", mt: 0.5, display: "block" }}
                >
                  Displays as: {MATERIAL_DISPLAY_MAP[formData.frameMaterial]}
                </Typography>
              )}
            </Box>
          )}

          {/* Weight Tags */}
          {tags.weightTags.length > 0 && (
            <Box>
              <Typography
                variant="caption"
                sx={{
                  color: "var(--theme-text-muted)",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  fontSize: "0.65rem",
                }}
              >
                Weight Class
              </Typography>
              <Box sx={{ display: "flex", gap: 0.5, flexWrap: "wrap", mt: 0.5 }}>
                {tags.weightTags.map((tag) => (
                  <Chip
                    key={tag}
                    label={tag}
                    size="small"
                    sx={{
                      backgroundColor: "rgba(76, 175, 80, 0.15)",
                      color: "#4caf50",
                      fontWeight: 500,
                      fontSize: "0.75rem",
                      borderRadius: 0,
                    }}
                  />
                ))}
              </Box>
            </Box>
          )}

          {/* Groupset Tags */}
          {tags.groupsetTags.length > 0 && (
            <Box>
              <Typography
                variant="caption"
                sx={{
                  color: "var(--theme-text-muted)",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  fontSize: "0.65rem",
                }}
              >
                Groupset / Shifting
              </Typography>
              <Box sx={{ display: "flex", gap: 0.5, flexWrap: "wrap", mt: 0.5 }}>
                {tags.groupsetTags.map((tag) => (
                  <Chip
                    key={tag}
                    label={tag}
                    size="small"
                    sx={{
                      backgroundColor: "rgba(156, 39, 176, 0.15)",
                      color: "#9c27b0",
                      fontWeight: 500,
                      fontSize: "0.75rem",
                      borderRadius: 0,
                    }}
                  />
                ))}
              </Box>
            </Box>
          )}

          {/* Brake Tags */}
          {tags.brakeTags.length > 0 && (
            <Box>
              <Typography
                variant="caption"
                sx={{
                  color: "var(--theme-text-muted)",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  fontSize: "0.65rem",
                }}
              >
                Brakes
              </Typography>
              <Box sx={{ display: "flex", gap: 0.5, flexWrap: "wrap", mt: 0.5 }}>
                {tags.brakeTags.map((tag) => (
                  <Chip
                    key={tag}
                    label={tag}
                    size="small"
                    sx={{
                      backgroundColor: "rgba(255, 152, 0, 0.15)",
                      color: "#ff9800",
                      fontWeight: 500,
                      fontSize: "0.75rem",
                      borderRadius: 0,
                    }}
                  />
                ))}
              </Box>
            </Box>
          )}

          {/* Size Tags */}
          {tags.sizeTags.length > 0 && (
            <Box>
              <Typography
                variant="caption"
                sx={{
                  color: "var(--theme-text-muted)",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  fontSize: "0.65rem",
                }}
              >
                Frame Size
              </Typography>
              <Box sx={{ display: "flex", gap: 0.5, flexWrap: "wrap", mt: 0.5 }}>
                {tags.sizeTags.map((tag) => (
                  <Chip
                    key={tag}
                    label={tag}
                    size="small"
                    sx={{
                      backgroundColor: "rgba(103, 58, 183, 0.15)",
                      color: "#673ab7",
                      fontWeight: 500,
                      fontSize: "0.75rem",
                      borderRadius: 0,
                    }}
                  />
                ))}
              </Box>
            </Box>
          )}

          {/* Feature Tags */}
          {tags.featureTags.length > 0 && (
            <Box>
              <Typography
                variant="caption"
                sx={{
                  color: "var(--theme-text-muted)",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  fontSize: "0.65rem",
                }}
              >
                Additional Features
              </Typography>
              <Box sx={{ display: "flex", gap: 0.5, flexWrap: "wrap", mt: 0.5 }}>
                {tags.featureTags.map((tag) => (
                  <Chip
                    key={tag}
                    label={tag}
                    size="small"
                    sx={{
                      backgroundColor: "rgba(0, 188, 212, 0.15)",
                      color: "#00bcd4",
                      fontWeight: 500,
                      fontSize: "0.75rem",
                      borderRadius: 0,
                    }}
                  />
                ))}
              </Box>
            </Box>
          )}

          {/* Custom Tags */}
          {tags.customTags && tags.customTags.length > 0 && (
            <Box>
              <Typography
                variant="caption"
                sx={{
                  color: "var(--theme-text-muted)",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  fontSize: "0.65rem",
                }}
              >
                Custom Tags
              </Typography>
              <Box sx={{ display: "flex", gap: 0.5, flexWrap: "wrap", mt: 0.5 }}>
                {tags.customTags.map((tag) => (
                  <Chip
                    key={tag}
                    label={tag}
                    size="small"
                    sx={{
                      backgroundColor: "rgba(233, 30, 99, 0.15)",
                      color: "#e91e63",
                      fontWeight: 500,
                      fontSize: "0.75rem",
                      borderRadius: 0,
                    }}
                  />
                ))}
              </Box>
            </Box>
          )}

          <Divider sx={{ borderColor: "var(--theme-border)", my: 1 }} />

          {/* All Tags Summary */}
          <Box>
            <Typography
              variant="caption"
              sx={{
                color: "var(--theme-text-muted)",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                fontSize: "0.65rem",
              }}
            >
              All Tags ({tags.allTags.length})
            </Typography>
            <Typography
              variant="body2"
              sx={{
                fontFamily: "monospace",
                color: "var(--theme-text-secondary)",
                mt: 0.5,
                fontSize: "0.8rem",
                wordBreak: "break-word",
              }}
            >
              {tags.allTags.join(", ")}
            </Typography>
          </Box>
        </Box>
      )}
    </Paper>
  )
}
