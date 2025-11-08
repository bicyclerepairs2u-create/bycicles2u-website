"use client"

import { useState } from "react"
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Paper,
  Stack,
  Alert,
  FormHelperText,
  Link,
  CircularProgress,
} from "@mui/material"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"

export default function SellBikeForm() {
  const [formData, setFormData] = useState({
    sellerName: "",
    email: "",
    phone: "",
    bikeBrand: "",
    bikeModel: "",
    year: "",
    condition: "",
    description: "",
  })
  const [image, setImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string>("")
  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const [submitStatus, setSubmitStatus] = useState<"idle" | "loading" | "success" | "error">("idle")

  const handleChange = (e: any) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" })
    }
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setErrors({ ...errors, image: "Image size must be less than 5MB" })
        return
      }

      // Check file type
      if (!file.type.startsWith("image/")) {
        setErrors({ ...errors, image: "Please upload an image file" })
        return
      }

      setImage(file)
      setErrors({ ...errors, image: "" })

      // Create preview
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {}

    if (!formData.sellerName.trim()) newErrors.sellerName = "Name is required"
    if (!formData.email.trim()) newErrors.email = "Email is required"
    if (!formData.phone.trim()) newErrors.phone = "Phone is required"
    if (!formData.bikeBrand.trim()) newErrors.bikeBrand = "Brand is required"
    if (!formData.bikeModel.trim()) newErrors.bikeModel = "Model is required"
    if (!formData.year.trim()) newErrors.year = "Year is required"
    if (!formData.condition) newErrors.condition = "Condition is required"
    if (!formData.description.trim()) newErrors.description = "Description is required"

    // Image validation
    if (!image) {
      newErrors.image = "Bike photo is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setSubmitStatus("loading")

    try {
      // Create FormData to send file and form fields
      const formDataToSend = new FormData()
      formDataToSend.append("sellerName", formData.sellerName)
      formDataToSend.append("email", formData.email)
      formDataToSend.append("phone", formData.phone)
      formDataToSend.append("bikeBrand", formData.bikeBrand)
      formDataToSend.append("bikeModel", formData.bikeModel)
      formDataToSend.append("year", formData.year)
      formDataToSend.append("condition", formData.condition)
      formDataToSend.append("description", formData.description)

      if (image) {
        formDataToSend.append("image", image)
      }

      const response = await fetch("/api/sell-bike", {
        method: "POST",
        body: formDataToSend,
      })

      if (response.ok) {
        setSubmitStatus("success")

        // Reset form after short delay
        setTimeout(() => {
          setFormData({
            sellerName: "",
            email: "",
            phone: "",
            bikeBrand: "",
            bikeModel: "",
            year: "",
            condition: "",
            description: "",
          })
          setImage(null)
          setImagePreview("")
          setSubmitStatus("idle")
        }, 3000)
      } else {
        setSubmitStatus("error")
        setTimeout(() => {
          setSubmitStatus("idle")
        }, 5000)
      }
    } catch (error) {
      console.error("Error submitting form:", error)
      setSubmitStatus("error")
      setTimeout(() => {
        setSubmitStatus("idle")
      }, 5000)
    }
  }

  return (
    <>
      <Navigation />
      <Box
        sx={{
          minHeight: "100vh",
          backgroundColor: "#fafafa",
          pt: { xs: 10, md: 12 },
          pb: 8,
        }}
      >
        <Container maxWidth="md">
          <Box sx={{ mb: 6, textAlign: "center" }}>
            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: "2.5rem", md: "3.5rem" },
                fontWeight: 700,
                color: "#212121",
                mb: 2,
                letterSpacing: "-1px",
              }}
            >
              Sell Your Bike
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontSize: "1.1rem",
                color: "#757575",
                lineHeight: 1.7,
              }}
            >
              Sell, List or Trade-in your bike with Bicycles2U
            </Typography>
          </Box>

          {/* RRP Disclaimer */}
          <Paper
            elevation={0}
            sx={{
              p: 3,
              mb: 4,
              backgroundColor: "#fff3e0",
              border: "2px solid #ff9800",
              borderRadius: "12px",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                color: "#212121",
                mb: 2,
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <i className="fi fi-rr-exclamation" style={{ fontSize: "1.5rem", color: "#ff9800" }}></i>
              Important Notice
            </Typography>
            <Typography variant="body2" sx={{ color: "#424242", mb: 1.5 }}>
              We only accept bikes with an <strong>original RRP (Recommended Retail Price) over $1,000</strong>.
            </Typography>
            <Typography variant="body2" sx={{ color: "#757575", fontStyle: "italic" }}>
              <strong>What is RRP?</strong> RRP is the manufacturer's suggested retail price when the bike was brand new. This helps us focus on premium road and triathlon bikes that match our specialty.
            </Typography>
          </Paper>

          {/* Rules Section */}
          <Paper
            elevation={0}
            sx={{
              p: 3,
              mb: 4,
              backgroundColor: "#e3f2fd",
              border: "1px solid #0288d1",
              borderRadius: "12px",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                color: "#212121",
                mb: 2,
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <i className="fi fi-rr-info" style={{ fontSize: "1.5rem", color: "#0288d1" }}></i>
              Submission Guidelines
            </Typography>
            <Stack spacing={1}>
              <Typography variant="body2" sx={{ color: "#424242" }}>
                • High-quality photo of your bike is <strong>mandatory</strong>
              </Typography>
              <Typography variant="body2" sx={{ color: "#424242" }}>
                • We specialize in road bikes and triathlon bikes only
              </Typography>
              <Typography variant="body2" sx={{ color: "#424242" }}>
                • We accept bikes in any condition
              </Typography>
              <Typography variant="body2" sx={{ color: "#424242" }}>
                • We accept bikes with carbon damage 
              </Typography>
              <Typography variant="body2" sx={{ color: "#424242" }}>
                • Provide accurate and honest descriptions
              </Typography>
            </Stack>
          </Paper>

          {/* Success Message */}
          {submitStatus === "success" && (
            <Alert severity="success" sx={{ mb: 4, borderRadius: "8px" }}>
              Your bike listing has been submitted successfully! We'll contact you soon.
            </Alert>
          )}

          {/* Error Message */}
          {submitStatus === "error" && (
            <Alert severity="error" sx={{ mb: 4, borderRadius: "8px" }}>
              There was an error processing your submission. Please try again.
            </Alert>
          )}

          {/* Form */}
          <Paper
            elevation={0}
            sx={{
              p: { xs: 3, md: 5 },
              borderRadius: "12px",
              backgroundColor: "#ffffff",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
            }}
          >
            <form onSubmit={handleSubmit}>
              <Stack spacing={3}>
                {/* Seller Information */}
                <Typography variant="h6" sx={{ fontWeight: 600, color: "#212121", mb: 1 }}>
                  Your Information
                </Typography>

                <TextField
                  fullWidth
                  label="Your Name"
                  name="sellerName"
                  value={formData.sellerName}
                  onChange={handleChange}
                  required
                  error={!!errors.sellerName}
                  helperText={errors.sellerName}
                  variant="outlined"
                />

                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  error={!!errors.email}
                  helperText={errors.email}
                  variant="outlined"
                />

                <TextField
                  fullWidth
                  label="Phone Number"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  error={!!errors.phone}
                  helperText={errors.phone}
                  variant="outlined"
                />

                {/* Bike Information */}
                <Typography variant="h6" sx={{ fontWeight: 600, color: "#212121", mt: 2, mb: 1 }}>
                  Bike Details
                </Typography>

                <TextField
                  fullWidth
                  label="Brand"
                  name="bikeBrand"
                  value={formData.bikeBrand}
                  onChange={handleChange}
                  required
                  error={!!errors.bikeBrand}
                  helperText={errors.bikeBrand}
                  placeholder="e.g., Specialized, Trek, Cervélo"
                  variant="outlined"
                />

                <TextField
                  fullWidth
                  label="Model"
                  name="bikeModel"
                  value={formData.bikeModel}
                  onChange={handleChange}
                  required
                  error={!!errors.bikeModel}
                  helperText={errors.bikeModel}
                  placeholder="e.g., Tarmac SL7, Émonda SLR"
                  variant="outlined"
                />

                <TextField
                  fullWidth
                  label="Year"
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                  required
                  error={!!errors.year}
                  helperText={errors.year}
                  placeholder="e.g., 2021"
                  variant="outlined"
                />

                <FormControl fullWidth required error={!!errors.condition}>
                  <InputLabel>Condition</InputLabel>
                  <Select
                    name="condition"
                    value={formData.condition}
                    onChange={handleChange}
                    label="Condition"
                  >
                    <MenuItem value="Excellent">Excellent - Like new, minimal use</MenuItem>
                    <MenuItem value="Very Good">Very Good - Well maintained, light wear</MenuItem>
                    <MenuItem value="Good">Good - Normal wear, fully functional</MenuItem>
                    <MenuItem value="Fair">Fair - Shows wear, may need minor repairs</MenuItem>
                  </Select>
                  {errors.condition && <FormHelperText>{errors.condition}</FormHelperText>}
                </FormControl>

                <TextField
                  fullWidth
                  label="Description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  multiline
                  rows={5}
                  error={!!errors.description}
                  helperText={
                    errors.description ||
                    "Include details about components, upgrades, maintenance history, and reason for selling"
                  }
                  variant="outlined"
                />

                {/* Image Upload */}
                <Typography variant="h6" sx={{ fontWeight: 600, color: "#212121", mt: 2, mb: 1 }}>
                  Bike Photo *
                </Typography>

                <Box>
                  <Button
                    variant="outlined"
                    component="label"
                    sx={{
                      borderColor: errors.image ? "#d32f2f" : "#0288d1",
                      color: errors.image ? "#d32f2f" : "#0288d1",
                      fontWeight: 600,
                      textTransform: "none",
                      borderWidth: "2px",
                      "&:hover": {
                        borderWidth: "2px",
                        borderColor: errors.image ? "#d32f2f" : "#0277bd",
                      },
                    }}
                  >
                    <i className="fi fi-rr-camera" style={{ marginRight: "8px" }}></i>
                    {image ? "Change Photo" : "Upload Photo"}
                    <input
                      type="file"
                      hidden
                      accept="image/*"
                      onChange={handleImageChange}
                      required
                    />
                  </Button>
                  {errors.image && (
                    <FormHelperText error sx={{ ml: 2 }}>
                      {errors.image}
                    </FormHelperText>
                  )}
                  {!errors.image && (
                    <FormHelperText sx={{ ml: 2 }}>
                      Maximum file size: 5MB. Accepted formats: JPG, PNG
                    </FormHelperText>
                  )}
                </Box>

                {/* Image Preview */}
                {imagePreview && (
                  <Box
                    sx={{
                      mt: 2,
                      position: "relative",
                      borderRadius: "8px",
                      overflow: "hidden",
                      maxWidth: "400px",
                    }}
                  >
                    <img
                      src={imagePreview}
                      alt="Bike preview"
                      style={{
                        width: "100%",
                        height: "auto",
                        display: "block",
                      }}
                    />
                    <Typography
                      variant="caption"
                      sx={{
                        display: "block",
                        mt: 1,
                        color: "#757575",
                      }}
                    >
                      {image?.name}
                    </Typography>
                  </Box>
                )}

                {/* Submit Button */}
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  disabled={submitStatus === "loading" || submitStatus === "success"}
                  sx={{
                    backgroundColor: "#0288d1",
                    color: "#ffffff",
                    fontWeight: 600,
                    fontSize: "1rem",
                    py: 1.5,
                    mt: 2,
                    textTransform: "none",
                    borderRadius: "8px",
                    "&:hover": {
                      backgroundColor: "#0277bd",
                    },
                    "&.Mui-disabled": {
                      backgroundColor: "#90caf9",
                      color: "#ffffff",
                    },
                  }}
                >
                  {submitStatus === "loading" && (
                    <CircularProgress
                      size={20}
                      sx={{
                        color: "#ffffff",
                        mr: 1,
                      }}
                    />
                  )}
                  {submitStatus === "loading" ? "Submitting..." : submitStatus === "success" ? "Submitted!" : "Submit Bike Listing"}
                </Button>

                <Typography variant="caption" sx={{ color: "#757575", textAlign: "center", mt: 2 }}>
                  By submitting, you acknowledge that we'll contact you to discuss your bike listing
                </Typography>
              </Stack>
            </form>
          </Paper>

          {/* Additional Info */}
          <Box sx={{ mt: 4, textAlign: "center" }}>
            <Typography variant="body2" sx={{ color: "#757575", mb: 1 }}>
              Questions? Contact us at{" "}
              <Link href="mailto:bicyclerepairs2u@gmail.com" sx={{ color: "#0288d1" }}>
                bicyclerepairs2u@gmail.com
              </Link>
              {" or call "}
              <Link href="tel:+61402880242" sx={{ color: "#0288d1" }}>
                0402 880 242
              </Link>
            </Typography>
            <Typography variant="caption" sx={{ color: "#9e9e9e" }}>
              167/171 Bronte Rd, Queens Park NSW 2022
            </Typography>
          </Box>
        </Container>
      </Box>
      <Footer />
    </>
  )
}
