"use client"

import { useState, useCallback } from "react"
import {
  Box,
  TextField,
  Button,
  FormControl,
  Paper,
  Stack,
  Alert,
  Typography,
  Checkbox,
  FormControlLabel,
  FormGroup,
  RadioGroup,
  Radio,
  CircularProgress,
  InputAdornment,
  Autocomplete,
  Link,
} from "@mui/material"
import TagPreview from "./tag-preview"
import ImageUpload from "./image-upload"
import type {
  BikeUploadFormData,
  FeatureTag,
} from "@/lib/shopify/admin-types"
import {
  BIKE_TYPES,
  BIKE_CATEGORIES,
  FRAME_MATERIALS,
  GROUPSET_TYPES,
  BRAKE_TYPES,
  FEATURE_OPTIONS,
  COMMON_BRANDS,
} from "@/lib/shopify/admin-types"

type SubmitStatus = "idle" | "uploading-images" | "creating-product" | "success" | "error"

interface SubmitResult {
  handle?: string
  shopUrl?: string
  adminUrl?: string
  error?: string
}

export default function BikeUploadForm() {
  const [formData, setFormData] = useState<Partial<BikeUploadFormData>>({
    title: "",
    vendor: "",
    productType: "Road Bike",
    price: "",
    compareAtPrice: "",
    bikeCategory: "road",
    frameMaterial: "carbon",
    groupsetType: "mechanical",
    brakeType: "disc-brakes",
    weight: "",
    isFeatured: false,
    features: [],
    customTags: "",
    description: "",
  })
  const [images, setImages] = useState<File[]>([])
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>("idle")
  const [submitResult, setSubmitResult] = useState<SubmitResult>({})

  // Theme-aware input styles
  const inputStyles = {
    "& .MuiOutlinedInput-root": {
      backgroundColor: "var(--theme-bg-primary)",
      color: "var(--theme-text-secondary)",
      borderRadius: 0,
      "& fieldset": {
        borderColor: "var(--theme-border)",
      },
      "&:hover fieldset": {
        borderColor: "#00d4ff",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#00d4ff",
      },
    },
    "& .MuiInputLabel-root": {
      color: "var(--theme-text-muted)",
      "&.Mui-focused": {
        color: "#00d4ff",
      },
    },
    "& .MuiFormHelperText-root": {
      color: "var(--theme-text-muted)",
    },
    "& .MuiSelect-icon": {
      color: "var(--theme-text-muted)",
    },
  }

  // Common Autocomplete dropdown styling
  const autocompleteSlotProps = {
    paper: {
      sx: {
        backgroundColor: "var(--theme-bg-secondary)",
        border: "1px solid var(--theme-border)",
      },
    },
    listbox: {
      sx: {
        "& .MuiAutocomplete-option": {
          color: "var(--theme-text-secondary)",
          "&:hover": {
            backgroundColor: "rgba(0, 212, 255, 0.1)",
          },
          "&[aria-selected='true']": {
            backgroundColor: "rgba(0, 212, 255, 0.15)",
            "&:hover": {
              backgroundColor: "rgba(0, 212, 255, 0.2)",
            },
          },
        },
      },
    },
  }

  const handleChange = useCallback((field: string, value: unknown) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }, [errors])

  const handleFeatureToggle = useCallback((feature: FeatureTag) => {
    setFormData((prev) => {
      const features = prev.features || []
      const newFeatures = features.includes(feature)
        ? features.filter((f) => f !== feature)
        : [...features, feature]
      return { ...prev, features: newFeatures }
    })
  }, [])

  const validateForm = useCallback(() => {
    const newErrors: Record<string, string> = {}

    if (!formData.title?.trim()) newErrors.title = "Title is required"
    if (!formData.vendor?.trim()) newErrors.vendor = "Brand is required"
    if (!formData.productType) newErrors.productType = "Product type is required"
    if (!formData.price?.trim()) {
      newErrors.price = "Price is required"
    } else if (isNaN(parseFloat(formData.price))) {
      newErrors.price = "Invalid price format"
    }
    if (!formData.bikeCategory) newErrors.bikeCategory = "Category is required"
    if (!formData.frameMaterial) newErrors.frameMaterial = "Frame material is required"
    if (images.length === 0) newErrors.images = "At least one image is required"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }, [formData, images])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setSubmitStatus("uploading-images")
    setSubmitResult({})

    try {
      // Step 1: Upload images
      const imageFormData = new FormData()
      images.forEach((image) => {
        imageFormData.append("files", image)
      })

      const uploadResponse = await fetch("/api/admin/upload-image", {
        method: "POST",
        body: imageFormData,
      })

      if (!uploadResponse.ok) {
        const uploadError = await uploadResponse.json()
        throw new Error(uploadError.error || "Failed to upload images")
      }

      const { urls: imageUrls } = await uploadResponse.json()

      // Step 2: Create product
      setSubmitStatus("creating-product")

      const productResponse = await fetch("/api/admin/upload-bike", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          formData: formData as BikeUploadFormData,
          imageUrls,
        }),
      })

      if (!productResponse.ok) {
        const productError = await productResponse.json()
        throw new Error(productError.error || "Failed to create product")
      }

      const result = await productResponse.json()

      setSubmitStatus("success")
      setSubmitResult({
        handle: result.product.handle,
        shopUrl: result.product.shopUrl,
        adminUrl: result.product.adminUrl,
      })

      // Reset form after success
      setTimeout(() => {
        setFormData({
          title: "",
          vendor: "",
          productType: "Road Bike",
          price: "",
          compareAtPrice: "",
          bikeCategory: "road",
          frameMaterial: "carbon",
          groupsetType: "mechanical",
          brakeType: "disc-brakes",
          weight: "",
          isFeatured: false,
          features: [],
          customTags: "",
          description: "",
        })
        setImages([])
      }, 5000)
    } catch (error) {
      setSubmitStatus("error")
      setSubmitResult({
        error: error instanceof Error ? error.message : "An error occurred",
      })
    }
  }

  const isSubmitting = submitStatus === "uploading-images" || submitStatus === "creating-product"

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", lg: "2fr 1fr" },
          gap: 4,
        }}
      >
        {/* Main Form */}
        <Stack spacing={4}>
          {/* Basic Information */}
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
              sx={{ fontWeight: 600, color: "var(--theme-text-primary)", mb: 3 }}
            >
              <i className="fi fi-rr-info" style={{ marginRight: 8, color: "#00d4ff" }}></i>
              Basic Information
            </Typography>

            <Stack spacing={3}>
              <TextField
                fullWidth
                label="Product Title"
                value={formData.title}
                onChange={(e) => handleChange("title", e.target.value)}
                error={!!errors.title}
                helperText={errors.title || 'e.g., "Cervélo P5 Disc Ultegra Di2"'}
                disabled={isSubmitting}
                sx={inputStyles}
              />

              <Autocomplete
                freeSolo
                options={COMMON_BRANDS}
                value={formData.vendor}
                onChange={(_, value) => handleChange("vendor", value || "")}
                onInputChange={(_, value) => handleChange("vendor", value)}
                disabled={isSubmitting}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Brand"
                    error={!!errors.vendor}
                    helperText={errors.vendor}
                    sx={inputStyles}
                  />
                )}
                sx={{
                  "& .MuiAutocomplete-popupIndicator": { color: "var(--theme-text-muted)" },
                  "& .MuiAutocomplete-clearIndicator": { color: "var(--theme-text-muted)" },
                }}
                slotProps={autocompleteSlotProps}
              />

              <Autocomplete
                freeSolo
                options={BIKE_TYPES}
                value={formData.productType || ""}
                onChange={(_, value) => handleChange("productType", value || "")}
                onInputChange={(_, value) => handleChange("productType", value)}
                disabled={isSubmitting}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Product Type"
                    error={!!errors.productType}
                    helperText={errors.productType || "Select or type custom"}
                    sx={inputStyles}
                  />
                )}
                sx={{
                  "& .MuiAutocomplete-popupIndicator": { color: "var(--theme-text-muted)" },
                  "& .MuiAutocomplete-clearIndicator": { color: "var(--theme-text-muted)" },
                }}
                slotProps={autocompleteSlotProps}
              />

              <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" }, gap: 3 }}>
                <TextField
                  fullWidth
                  label="Sale Price"
                  value={formData.price}
                  onChange={(e) => handleChange("price", e.target.value)}
                  error={!!errors.price}
                  helperText={errors.price || "Current selling price"}
                  disabled={isSubmitting}
                  InputProps={{
                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                  }}
                  sx={inputStyles}
                />

                <TextField
                  fullWidth
                  label="Compare At Price"
                  value={formData.compareAtPrice}
                  onChange={(e) => handleChange("compareAtPrice", e.target.value)}
                  helperText="Original price (optional, shows as strikethrough)"
                  disabled={isSubmitting}
                  InputProps={{
                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                  }}
                  sx={inputStyles}
                />
              </Box>
            </Stack>
          </Paper>

          {/* Bike Characteristics */}
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
              sx={{ fontWeight: 600, color: "var(--theme-text-primary)", mb: 3 }}
            >
              <i className="fi fi-rr-settings" style={{ marginRight: 8, color: "#00d4ff" }}></i>
              Bike Characteristics
            </Typography>

            <Stack spacing={3}>
              <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" }, gap: 3 }}>
                <Autocomplete
                  freeSolo
                  options={BIKE_CATEGORIES.map((cat) => cat.value)}
                  getOptionLabel={(option) => {
                    const found = BIKE_CATEGORIES.find((cat) => cat.value === option)
                    return found ? found.label : option
                  }}
                  value={formData.bikeCategory || ""}
                  onChange={(_, value) => handleChange("bikeCategory", value || "")}
                  onInputChange={(_, value) => {
                    // Map label back to value if user types a label
                    const found = BIKE_CATEGORIES.find((cat) => cat.label.toLowerCase() === value.toLowerCase())
                    handleChange("bikeCategory", found ? found.value : value)
                  }}
                  disabled={isSubmitting}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Bike Category"
                      error={!!errors.bikeCategory}
                      helperText={errors.bikeCategory || "Select or type custom (becomes tag)"}
                      sx={inputStyles}
                    />
                  )}
                  sx={{
                    "& .MuiAutocomplete-popupIndicator": { color: "var(--theme-text-muted)" },
                    "& .MuiAutocomplete-clearIndicator": { color: "var(--theme-text-muted)" },
                  }}
                  slotProps={autocompleteSlotProps}
                />

                <Autocomplete
                  freeSolo
                  options={FRAME_MATERIALS.map((mat) => mat.value)}
                  getOptionLabel={(option) => {
                    const found = FRAME_MATERIALS.find((mat) => mat.value === option)
                    return found ? found.label : option
                  }}
                  value={formData.frameMaterial || ""}
                  onChange={(_, value) => handleChange("frameMaterial", value || "")}
                  onInputChange={(_, value) => {
                    const found = FRAME_MATERIALS.find((mat) => mat.label.toLowerCase() === value.toLowerCase())
                    handleChange("frameMaterial", found ? found.value : value)
                  }}
                  disabled={isSubmitting}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Frame Material"
                      error={!!errors.frameMaterial}
                      helperText={errors.frameMaterial || "Select or type custom"}
                      sx={inputStyles}
                    />
                  )}
                  sx={{
                    "& .MuiAutocomplete-popupIndicator": { color: "var(--theme-text-muted)" },
                    "& .MuiAutocomplete-clearIndicator": { color: "var(--theme-text-muted)" },
                  }}
                  slotProps={autocompleteSlotProps}
                />
              </Box>

              <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" }, gap: 3 }}>
                <Autocomplete
                  freeSolo
                  options={GROUPSET_TYPES.map((grp) => grp.value)}
                  getOptionLabel={(option) => {
                    const found = GROUPSET_TYPES.find((grp) => grp.value === option)
                    return found ? found.label : option
                  }}
                  value={formData.groupsetType || ""}
                  onChange={(_, value) => handleChange("groupsetType", value || "")}
                  onInputChange={(_, value) => {
                    const found = GROUPSET_TYPES.find((grp) => grp.label.toLowerCase() === value.toLowerCase())
                    handleChange("groupsetType", found ? found.value : value)
                  }}
                  disabled={isSubmitting}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Groupset Type"
                      helperText="Select or type custom"
                      sx={inputStyles}
                    />
                  )}
                  sx={{
                    "& .MuiAutocomplete-popupIndicator": { color: "var(--theme-text-muted)" },
                    "& .MuiAutocomplete-clearIndicator": { color: "var(--theme-text-muted)" },
                  }}
                  slotProps={autocompleteSlotProps}
                />

                <TextField
                  fullWidth
                  label="Weight"
                  value={formData.weight}
                  onChange={(e) => handleChange("weight", e.target.value)}
                  disabled={isSubmitting}
                  placeholder="e.g., 7.2"
                  InputProps={{
                    endAdornment: <InputAdornment position="end">kg</InputAdornment>,
                  }}
                  helperText="Bikes under 7.5kg get 'lightweight' tag"
                  sx={inputStyles}
                />
              </Box>

              <FormControl>
                <Typography
                  variant="body2"
                  sx={{ color: "var(--theme-text-muted)", mb: 1 }}
                >
                  Brake Type
                </Typography>
                <RadioGroup
                  row
                  value={formData.brakeType}
                  onChange={(e) => handleChange("brakeType", e.target.value)}
                >
                  {BRAKE_TYPES.map((brake) => (
                    <FormControlLabel
                      key={brake.value}
                      value={brake.value}
                      control={
                        <Radio
                          disabled={isSubmitting}
                          sx={{
                            color: "var(--theme-text-muted)",
                            "&.Mui-checked": { color: "#00d4ff" },
                          }}
                        />
                      }
                      label={brake.label}
                      sx={{ color: "var(--theme-text-secondary)" }}
                    />
                  ))}
                </RadioGroup>
              </FormControl>

              {/* Featured Product Toggle */}
              <Box
                sx={{
                  p: 2,
                  backgroundColor: formData.isFeatured ? "rgba(251, 191, 36, 0.1)" : "transparent",
                  border: formData.isFeatured ? "1px solid #fbbf24" : "1px solid var(--theme-border)",
                  transition: "all 0.2s ease",
                }}
              >
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formData.isFeatured || false}
                      onChange={(e) => handleChange("isFeatured", e.target.checked)}
                      disabled={isSubmitting}
                      sx={{
                        color: "#fbbf24",
                        "&.Mui-checked": { color: "#fbbf24" },
                      }}
                    />
                  }
                  label={
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <i className="fi fi-rr-star" style={{ color: "#fbbf24" }}></i>
                      <Typography sx={{ color: "var(--theme-text-secondary)", fontWeight: 500 }}>
                        Featured Product
                      </Typography>
                    </Box>
                  }
                />
                <Typography variant="caption" sx={{ color: "var(--theme-text-muted)", display: "block", ml: 4 }}>
                  Show this bike in the Featured section on the homepage
                </Typography>
              </Box>

              <Box>
                <Typography
                  variant="body2"
                  sx={{ color: "var(--theme-text-muted)", mb: 1 }}
                >
                  Additional Features
                </Typography>
                <FormGroup row>
                  {FEATURE_OPTIONS.map((feature) => (
                    <FormControlLabel
                      key={feature.value}
                      control={
                        <Checkbox
                          checked={formData.features?.includes(feature.value)}
                          onChange={() => handleFeatureToggle(feature.value)}
                          disabled={isSubmitting}
                          sx={{
                            color: "var(--theme-text-muted)",
                            "&.Mui-checked": { color: "#00d4ff" },
                          }}
                        />
                      }
                      label={feature.label}
                      sx={{ color: "var(--theme-text-secondary)" }}
                    />
                  ))}
                </FormGroup>
              </Box>

              <TextField
                fullWidth
                label="Custom Tags"
                value={formData.customTags}
                onChange={(e) => handleChange("customTags", e.target.value)}
                disabled={isSubmitting}
                placeholder="e.g., shimano-105, 52cm, upgraded-wheels"
                helperText="Comma-separated tags to add (will be added to generated tags)"
                sx={inputStyles}
              />
            </Stack>
          </Paper>

          {/* Description */}
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
              sx={{ fontWeight: 600, color: "var(--theme-text-primary)", mb: 3 }}
            >
              <i className="fi fi-rr-document" style={{ marginRight: 8, color: "#00d4ff" }}></i>
              Description
            </Typography>

            <TextField
              fullWidth
              multiline
              rows={5}
              label="Product Description"
              value={formData.description}
              onChange={(e) => handleChange("description", e.target.value)}
              disabled={isSubmitting}
              placeholder="Describe the bike's features, condition, components, upgrades..."
              helperText="Weight and specs will be auto-appended based on form selections"
              sx={inputStyles}
            />
          </Paper>

          {/* Images */}
          <Paper
            elevation={0}
            sx={{
              p: 3,
              backgroundColor: "var(--theme-bg-secondary)",
              border: errors.images ? "1px solid #f44336" : "1px solid var(--theme-border)",
              borderRadius: 0,
            }}
          >
            <Typography
              variant="h6"
              sx={{ fontWeight: 600, color: "var(--theme-text-primary)", mb: 3 }}
            >
              <i className="fi fi-rr-picture" style={{ marginRight: 8, color: "#00d4ff" }}></i>
              Product Images
            </Typography>

            <ImageUpload
              images={images}
              onImagesChange={setImages}
              maxImages={5}
              disabled={isSubmitting}
            />

            {errors.images && (
              <Typography variant="caption" sx={{ color: "#f44336", mt: 1, display: "block" }}>
                {errors.images}
              </Typography>
            )}
          </Paper>
        </Stack>

        {/* Sidebar */}
        <Box sx={{ position: { lg: "sticky" }, top: 24, alignSelf: "start" }}>
          <Stack spacing={3}>
            {/* Tag Preview */}
            <TagPreview formData={formData} />

            {/* Submit Section */}
            <Paper
              elevation={0}
              sx={{
                p: 3,
                backgroundColor: "var(--theme-bg-secondary)",
                border: "1px solid var(--theme-border)",
                borderRadius: 0,
              }}
            >
              {submitStatus === "success" && submitResult.shopUrl && (
                <Alert
                  severity="success"
                  sx={{
                    mb: 2,
                    borderRadius: 0,
                    backgroundColor: "rgba(76, 175, 80, 0.1)",
                    border: "1px solid #4caf50",
                  }}
                >
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    Product created successfully!
                  </Typography>
                  <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                    <Link
                      href={submitResult.shopUrl}
                      target="_blank"
                      sx={{ color: "#4caf50", fontSize: "0.875rem" }}
                    >
                      View in Shop →
                    </Link>
                    {submitResult.adminUrl && (
                      <Link
                        href={submitResult.adminUrl}
                        target="_blank"
                        sx={{ color: "#4caf50", fontSize: "0.875rem" }}
                      >
                        Edit in Shopify →
                      </Link>
                    )}
                  </Box>
                </Alert>
              )}

              {submitStatus === "error" && submitResult.error && (
                <Alert
                  severity="error"
                  sx={{
                    mb: 2,
                    borderRadius: 0,
                    backgroundColor: "rgba(244, 67, 54, 0.1)",
                    border: "1px solid #f44336",
                  }}
                >
                  {submitResult.error}
                </Alert>
              )}

              <Button
                type="submit"
                variant="contained"
                fullWidth
                disabled={isSubmitting}
                sx={{
                  backgroundColor: "#00d4ff",
                  color: "#000000",
                  fontWeight: 700,
                  fontSize: "0.875rem",
                  py: 2,
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  borderRadius: 0,
                  boxShadow: "0 4px 20px rgba(0, 212, 255, 0.3)",
                  "&:hover": {
                    backgroundColor: "#0099cc",
                    boxShadow: "0 6px 30px rgba(0, 212, 255, 0.4)",
                  },
                  "&.Mui-disabled": {
                    backgroundColor: "rgba(0, 212, 255, 0.5)",
                    color: "#000000",
                  },
                }}
              >
                {isSubmitting ? (
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <CircularProgress size={20} sx={{ color: "#000" }} />
                    {submitStatus === "uploading-images"
                      ? "Uploading Images..."
                      : "Creating Product..."}
                  </Box>
                ) : (
                  <>
                    <i className="fi fi-rr-upload" style={{ marginRight: 8 }}></i>
                    Upload to Shopify
                  </>
                )}
              </Button>

              <Typography
                variant="caption"
                sx={{
                  color: "var(--theme-text-muted)",
                  display: "block",
                  textAlign: "center",
                  mt: 2,
                }}
              >
                Product will be published immediately
              </Typography>
            </Paper>
          </Stack>
        </Box>
      </Box>
    </Box>
  )
}
