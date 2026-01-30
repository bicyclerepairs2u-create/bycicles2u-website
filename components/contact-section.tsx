"use client"

import type React from "react"

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
  Link,
  Alert,
  CircularProgress,
} from "@mui/material"
import ImageUpload, { type UploadedImage } from "@/components/ui/image-upload"

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    inquiryType: "",
    serviceLevel: "",
    bikeType: "",
    bikeDetails: "",
    pickupNeeded: "",
    message: "",
  })

  const [images, setImages] = useState<UploadedImage[]>([])
  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const [submitStatus, setSubmitStatus] = useState<"idle" | "loading" | "success" | "error">("idle")

  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleImagesChange = (newImages: UploadedImage[]) => {
    setImages(newImages)
    // Clear image error when images are added
    if (newImages.length > 0 && errors.image) {
      setErrors({ ...errors, image: "" })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validate photos for service and repair inquiries
    const requiresPhotos = formData.inquiryType === "Bike Service" || formData.inquiryType === "Custom Build"
    if (requiresPhotos && images.length === 0) {
      setErrors({ image: "At least one photo is required for service and custom build inquiries" })
      return
    }

    setSubmitStatus("loading")

    try {
      // Create FormData to send file and form fields
      const formDataToSend = new FormData()
      formDataToSend.append("name", formData.name)
      formDataToSend.append("email", formData.email)
      formDataToSend.append("phone", formData.phone)
      formDataToSend.append("inquiryType", formData.inquiryType)
      formDataToSend.append("serviceLevel", formData.serviceLevel)
      formDataToSend.append("bikeType", formData.bikeType)
      formDataToSend.append("bikeDetails", formData.bikeDetails)
      formDataToSend.append("pickupNeeded", formData.pickupNeeded)
      formDataToSend.append("message", formData.message)

      // Append all images
      images.forEach((image, index) => {
        formDataToSend.append(`image_${index}`, image.file)
      })

      const response = await fetch("/api/contact", {
        method: "POST",
        body: formDataToSend,
      })

      if (response.ok) {
        setSubmitStatus("success")

        // Reset form after delay
        setTimeout(() => {
          setFormData({
            name: "",
            email: "",
            phone: "",
            inquiryType: "",
            serviceLevel: "",
            bikeType: "",
            bikeDetails: "",
            pickupNeeded: "",
            message: "",
          })
          setImages([])
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
    <Box
      id="contact"
      component="section"
      sx={{
        py: { xs: 8, md: 12 },
        backgroundColor: "#fafafa",
      }}
    >
      <Container maxWidth="xl" sx={{ maxWidth: "1400px !important" }}>
        <Typography
          variant="h2"
          sx={{
            fontSize: { xs: "2rem", md: "2.5rem" },
            fontWeight: 700,
            color: "#212121",
            mb: 2,
            textAlign: "center",
            letterSpacing: "-1px",
          }}
        >
          Book a Service or Get In Touch
        </Typography>

        <Typography
          variant="body1"
          sx={{
            fontSize: "1rem",
            color: "#757575",
            mb: 6,
            textAlign: "center",
          }}
        >
          Fill out the form below and we'll get back to you within 24 hours
        </Typography>

        <Box sx={{ display: 'grid', gap: 6, justifyContent: 'center', gridTemplateColumns: { xs: '1fr', md: 'repeat(12, 1fr)' } }}>
          {/* Contact Form */}
          <Box sx={{ gridColumn: { xs: '1 / -1', md: 'span 7' } }}>
            {submitStatus === "success" && (
              <Alert severity="success" sx={{ mb: 3, borderRadius: "8px" }}>
                Your message has been sent! We'll get back to you soon.
              </Alert>
            )}

            <Paper
              elevation={0}
              sx={{
                p: { xs: 3, md: 4 },
                borderRadius: "12px",
                backgroundColor: "#ffffff",
                border: "1px solid #e0e0e0",
              }}
            >
              <form onSubmit={handleSubmit}>
                <Stack spacing={3}>
                  {/* What do you need? */}
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 600, color: "#212121", mb: 2 }}>
                      What can we help you with?
                    </Typography>
                    <FormControl fullWidth required>
                      <InputLabel>Select Inquiry Type</InputLabel>
                      <Select
                        name="inquiryType"
                        value={formData.inquiryType}
                        onChange={handleChange}
                        label="Select Inquiry Type"
                        sx={{
                          "&:hover .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#0288d1",
                          },
                          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#0288d1",
                          },
                        }}
                      >
                        <MenuItem value="Bike Service">🔧 Bike Service / Repair</MenuItem>
                        <MenuItem value="Custom Build">🛠️ Custom Build</MenuItem>
                        <MenuItem value="Bike Purchase">🚴 Buy a Bike</MenuItem>
                        <MenuItem value="Sell Bike">💰 Sell My Bike</MenuItem>
                        <MenuItem value="General Inquiry">💬 General Question</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>

                  {/* Service Level (show only for Bike Service) */}
                  {formData.inquiryType === "Bike Service" && (
                    <FormControl fullWidth>
                      <InputLabel>Preferred Service Level</InputLabel>
                      <Select
                        name="serviceLevel"
                        value={formData.serviceLevel}
                        onChange={handleChange}
                        label="Preferred Service Level"
                        sx={{
                          "&:hover .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#0288d1",
                          },
                          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#0288d1",
                          },
                        }}
                      >
                        <MenuItem value="Basic ($59)">Basic Service - $59</MenuItem>
                        <MenuItem value="Standard ($119)">Standard Service - $119</MenuItem>
                        <MenuItem value="Deluxe ($159)">Deluxe Service - $159 (Popular)</MenuItem>
                        <MenuItem value="Ultimate ($299)">Ultimate Service - $299</MenuItem>
                        <MenuItem value="Not Sure">Not Sure - Need Advice</MenuItem>
                      </Select>
                    </FormControl>
                  )}

                  {/* Bike Details (show for Service and Custom Build) */}
                  {(formData.inquiryType === "Bike Service" || formData.inquiryType === "Custom Build") && (
                    <>
                      <FormControl fullWidth>
                        <InputLabel>Bike Type</InputLabel>
                        <Select
                          name="bikeType"
                          value={formData.bikeType}
                          onChange={handleChange}
                          label="Bike Type"
                          sx={{
                            "&:hover .MuiOutlinedInput-notchedOutline": {
                              borderColor: "#0288d1",
                            },
                            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                              borderColor: "#0288d1",
                            },
                          }}
                        >
                          <MenuItem value="Road Bike">Road Bike</MenuItem>
                          <MenuItem value="Triathlon/TT Bike">Triathlon / Time Trial Bike</MenuItem>
                          <MenuItem value="Gravel Bike">Gravel Bike</MenuItem>
                          <MenuItem value="Other">Other</MenuItem>
                        </Select>
                      </FormControl>

                      <TextField
                        fullWidth
                        label="Bike Details (Brand, Model, Year, etc.)"
                        name="bikeDetails"
                        value={formData.bikeDetails}
                        onChange={handleChange}
                        multiline
                        rows={2}
                        placeholder="e.g., Specialized Tarmac SL7, 2021, Shimano Ultegra"
                        variant="outlined"
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            "&:hover fieldset": {
                              borderColor: "#0288d1",
                            },
                            "&.Mui-focused fieldset": {
                              borderColor: "#0288d1",
                            },
                          },
                        }}
                      />
                    </>
                  )}

                  {/* Pickup/Delivery Option (show for Service) */}
                  {formData.inquiryType === "Bike Service" && (
                    <FormControl fullWidth>
                      <InputLabel>Pickup & Delivery</InputLabel>
                      <Select
                        name="pickupNeeded"
                        value={formData.pickupNeeded}
                        onChange={handleChange}
                        label="Pickup & Delivery"
                        sx={{
                          "&:hover .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#0288d1",
                          },
                          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#0288d1",
                          },
                        }}
                      >
                        <MenuItem value="No - Drop off myself">No - I'll drop off myself</MenuItem>
                        <MenuItem value="Yes - Pickup ($29)">Yes - Pickup & Delivery ($29)</MenuItem>
                        <MenuItem value="Yes - On-site ($39)">Yes - On-site Service ($39)</MenuItem>
                      </Select>
                    </FormControl>
                  )}

                  {/* Contact Details */}
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 600, color: "#212121", mb: 2 }}>
                      Your Contact Details
                    </Typography>
                    <Stack spacing={2}>
                      <TextField
                        fullWidth
                        label="Name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        variant="outlined"
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            "&:hover fieldset": {
                              borderColor: "#0288d1",
                            },
                            "&.Mui-focused fieldset": {
                              borderColor: "#0288d1",
                            },
                          },
                        }}
                      />

                      <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" }, gap: 2 }}>
                        <TextField
                          fullWidth
                          label="Email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          variant="outlined"
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              "&:hover fieldset": {
                                borderColor: "#0288d1",
                              },
                              "&.Mui-focused fieldset": {
                                borderColor: "#0288d1",
                              },
                            },
                          }}
                        />

                        <TextField
                          fullWidth
                          label="Phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                          variant="outlined"
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              "&:hover fieldset": {
                                borderColor: "#0288d1",
                              },
                              "&.Mui-focused fieldset": {
                                borderColor: "#0288d1",
                              },
                            },
                          }}
                        />
                      </Box>
                    </Stack>
                  </Box>

                  {/* Additional Message */}
                  <TextField
                    fullWidth
                    label="Additional Message or Questions"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    multiline
                    rows={4}
                    placeholder="Tell us more about what you need..."
                    variant="outlined"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        "&:hover fieldset": {
                          borderColor: "#0288d1",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "#0288d1",
                        },
                      },
                    }}
                  />

                  {/* Photo Upload */}
                  <ImageUpload
                    images={images}
                    onChange={handleImagesChange}
                    maxImages={5}
                    maxSizeMB={5}
                    error={errors.image}
                    required={formData.inquiryType === "Bike Service" || formData.inquiryType === "Custom Build"}
                    label={
                      formData.inquiryType === "Bike Service" || formData.inquiryType === "Custom Build"
                        ? "Bike Photos"
                        : "Photos (Optional)"
                    }
                    helperText={
                      formData.inquiryType === "Bike Service" || formData.inquiryType === "Custom Build"
                        ? "Photos of your bike are required for service and custom build requests (5 photos max, 5MB each)."
                        : "Upload or take photos to help us understand your needs better (5 photos max, 5MB each)."
                    }
                  />

                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    fullWidth
                    disabled={submitStatus === "loading" || submitStatus === "success"}
                    sx={{
                      backgroundColor: "#0288d1",
                      color: "#ffffff",
                      fontWeight: 600,
                      fontSize: "1.05rem",
                      py: 1.8,
                      textTransform: "none",
                      borderRadius: "8px",
                      boxShadow: "0 4px 12px rgba(2, 136, 209, 0.3)",
                      "&:hover": {
                        backgroundColor: "#0277bd",
                        boxShadow: "0 6px 16px rgba(2, 136, 209, 0.4)",
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
                    {submitStatus === "loading" ? "Sending..." : submitStatus === "success" ? "Sent!" : "Send Inquiry"}
                  </Button>
                </Stack>
              </form>
            </Paper>
          </Box>

          {/* Contact Information */}
          <Box sx={{ gridColumn: { xs: '1 / -1', md: 'span 5' } }}>
            <Stack spacing={3}>
              {/* Quick Info Card */}
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  borderRadius: "12px",
                  backgroundColor: "#e3f2fd",
                  border: "1px solid #0288d1",
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: 600, color: "#212121", mb: 2 }}>
                  <i className="fi fi-rr-info" style={{ marginRight: "8px" }}></i>
                  Quick Response
                </Typography>
                <Typography variant="body2" sx={{ color: "#424242", lineHeight: 1.7 }}>
                  We typically respond within 24 hours. For urgent service requests, please call us directly.
                </Typography>
              </Paper>

              {/* Contact Details */}
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  borderRadius: "12px",
                  backgroundColor: "#ffffff",
                  border: "1px solid #e0e0e0",
                }}
              >
                <Stack spacing={3}>
                  <Box>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                      <i className="fi fi-rr-envelope" style={{ color: "#0288d1", fontSize: "1.25rem" }}></i>
                      <Typography variant="subtitle1" sx={{ fontWeight: 600, color: "#212121" }}>
                        Email
                      </Typography>
                    </Box>
                    <Link
                      href="mailto:bicyclerepairs2u@gmail.com"
                      sx={{
                        fontSize: "0.95rem",
                        color: "#0288d1",
                        textDecoration: "none",
                        "&:hover": {
                          textDecoration: "underline",
                        },
                      }}
                    >
                      bicyclerepairs2u@gmail.com
                    </Link>
                  </Box>

                  <Box>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                      <i className="fi fi-rr-phone-call" style={{ color: "#0288d1", fontSize: "1.25rem" }}></i>
                      <Typography variant="subtitle1" sx={{ fontWeight: 600, color: "#212121" }}>
                        Phone
                      </Typography>
                    </Box>
                    <Link
                      href="tel:+61402880242"
                      sx={{
                        fontSize: "0.95rem",
                        color: "#0288d1",
                        textDecoration: "none",
                        "&:hover": {
                          textDecoration: "underline",
                        },
                      }}
                    >
                      0402 880 242
                    </Link>
                  </Box>

                  <Box>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                      <i className="fi fi-rr-marker" style={{ color: "#0288d1", fontSize: "1.25rem" }}></i>
                      <Typography variant="subtitle1" sx={{ fontWeight: 600, color: "#212121" }}>
                        Location
                      </Typography>
                    </Box>
                    <Typography variant="body2" sx={{ color: "#424242" }}>
                      167/171 Bronte Rd
                      <br />
                      Queens Park NSW 2022
                    </Typography>
                  </Box>

                  <Box>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                      <i className="fi fi-rr-clock" style={{ color: "#0288d1", fontSize: "1.25rem" }}></i>
                      <Typography variant="subtitle1" sx={{ fontWeight: 600, color: "#212121" }}>
                        Hours
                      </Typography>
                    </Box>
                    <Typography variant="body2" sx={{ color: "#424242", lineHeight: 1.6 }}>
                      By appointment or arrangement
                      <br />
                      Available most days including weekends
                    </Typography>
                    <Typography variant="caption" sx={{ color: "#757575", display: "block", mt: 0.5 }}>
                      Please contact ahead to arrange a time
                    </Typography>
                  </Box>

                  <Box>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                      <i className="fi fi-brands-facebook" style={{ color: "#0288d1", fontSize: "1.25rem" }}></i>
                      <Typography variant="subtitle1" sx={{ fontWeight: 600, color: "#212121" }}>
                        Facebook
                      </Typography>
                    </Box>
                    <Link
                      href="https://www.facebook.com/marketplace/profile/100015456158533/?ref=permalink&mibextid=6ojiHh"
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{
                        fontSize: "0.95rem",
                        color: "#0288d1",
                        textDecoration: "none",
                        "&:hover": {
                          textDecoration: "underline",
                        },
                      }}
                    >
                      Find us on Facebook Marketplace
                    </Link>
                  </Box>
                </Stack>
              </Paper>

              {/* Services Highlight */}
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  borderRadius: "12px",
                  backgroundColor: "#ffffff",
                  border: "1px solid #e0e0e0",
                }}
              >
                <Typography variant="subtitle1" sx={{ fontWeight: 600, color: "#212121", mb: 2 }}>
                  <i className="fi fi-rr-tool-box" style={{ marginRight: "8px", color: "#0288d1" }}></i>
                  Our Services
                </Typography>
                <Stack spacing={1}>
                  <Typography variant="body2" sx={{ color: "#424242" }}>
                    • Bike Service & Repairs
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#424242" }}>
                    • Custom Builds
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#424242" }}>
                    • Bike Sales (Pre-Owned)
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#424242" }}>
                    • Pickup & Delivery
                  </Typography>
                </Stack>
              </Paper>
            </Stack>
          </Box>
        </Box>
      </Container>
    </Box>
  )
}
