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
  const [errorMessage, setErrorMessage] = useState<string>("")

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
          setErrorMessage("")
          setSubmitStatus("idle")
        }, 3000)
      } else {
        const data = await response.json().catch(() => null)
        setErrorMessage(data?.error || "There was an error sending your inquiry. Please try again.")
        setSubmitStatus("error")
        setTimeout(() => {
          setSubmitStatus("idle")
          setErrorMessage("")
        }, 5000)
      }
    } catch (error) {
      console.error("Error submitting form:", error)
      setErrorMessage("Network error. Please check your connection and try again.")
      setSubmitStatus("error")
      setTimeout(() => {
        setSubmitStatus("idle")
        setErrorMessage("")
      }, 5000)
    }
  }

  // Common input styles for theme
  const darkInputStyles = {
    "& .MuiOutlinedInput-root": {
      backgroundColor: "var(--theme-bg-secondary)",
      color: "var(--theme-text-primary)",
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
      color: "var(--theme-text-secondary)",
      "&.Mui-focused": {
        color: "#00d4ff",
      },
    },
    "& .MuiSelect-icon": {
      color: "var(--theme-text-secondary)",
    },
    "& .MuiInputBase-input::placeholder": {
      color: "var(--theme-text-muted)",
      opacity: 0.7,
    },
  }

  return (
    <Box
      id="contact"
      component="section"
      sx={{
        py: { xs: 10, md: 14 },
        backgroundColor: "var(--theme-bg-primary)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background Pattern */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "30%",
          height: "100%",
          backgroundImage: `repeating-linear-gradient(
            -45deg,
            #00d4ff,
            #00d4ff 1px,
            transparent 1px,
            transparent 50px
          )`,
          opacity: 0.03,
          zIndex: 0,
        }}
      />

      <Container maxWidth="xl" sx={{ maxWidth: "1400px !important", position: "relative", zIndex: 1 }}>
        {/* Section Header */}
        <Box sx={{ textAlign: "center", mb: 6 }}>
          <Typography
            sx={{
              fontSize: "0.625rem",
              fontWeight: 600,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#00d4ff",
              mb: 2,
            }}
          >
            Get In Touch
          </Typography>

          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: "2rem", md: "3rem" },
              fontWeight: 900,
              color: "var(--theme-text-primary)",
              mb: 2,
              letterSpacing: "-0.04em",
              textTransform: "uppercase",
            }}
          >
            Book a Service
          </Typography>

          <Typography
            sx={{
              fontSize: "1rem",
              color: "var(--theme-text-muted)",
              maxWidth: "500px",
              mx: "auto",
            }}
          >
            Fill out the form below and we'll get back to you within 24 hours
          </Typography>
        </Box>

        <Box sx={{ display: 'grid', gap: 6, justifyContent: 'center', gridTemplateColumns: { xs: '1fr', md: 'repeat(12, 1fr)' } }}>
          {/* Contact Form */}
          <Box sx={{ gridColumn: { xs: '1 / -1', md: 'span 7' } }}>
            {submitStatus === "success" && (
              <Alert
                severity="success"
                sx={{
                  mb: 3,
                  borderRadius: 0,
                  backgroundColor: "rgba(76, 175, 80, 0.1)",
                  border: "1px solid #4caf50",
                  color: "#4caf50",
                }}
              >
                Your message has been sent! We'll get back to you soon.
              </Alert>
            )}

            {submitStatus === "error" && (
              <Alert severity="error" sx={{ mb: 3, borderRadius: "8px" }}>
                {errorMessage || "There was an error sending your inquiry. Please try again."}
              </Alert>
            )}

            <Paper
              elevation={0}
              sx={{
                p: { xs: 3, md: 5 },
                borderRadius: 0,
                backgroundColor: "var(--theme-bg-secondary)",
                border: "1px solid var(--theme-border)",
                position: "relative",
                clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 25px), calc(100% - 25px) 100%, 0 100%)",
              }}
            >
              {/* Corner accent */}
              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  width: "60px",
                  height: "2px",
                  backgroundColor: "#00d4ff",
                }}
              />
              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  width: "2px",
                  height: "40px",
                  backgroundColor: "#00d4ff",
                }}
              />

              <form onSubmit={handleSubmit}>
                <Stack spacing={3}>
                  {/* What do you need? */}
                  <Box>
                    <Typography
                      sx={{
                        fontWeight: 700,
                        color: "var(--theme-text-primary)",
                        mb: 2,
                        fontSize: "0.875rem",
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                      }}
                    >
                      What can we help you with?
                    </Typography>
                    <FormControl fullWidth required sx={darkInputStyles}>
                      <InputLabel>Select Inquiry Type</InputLabel>
                      <Select
                        name="inquiryType"
                        value={formData.inquiryType}
                        onChange={handleChange}
                        label="Select Inquiry Type"
                        MenuProps={{
                          PaperProps: {
                            sx: {
                              backgroundColor: "var(--theme-bg-secondary)",
                              border: "1px solid var(--theme-border)",
                              "& .MuiMenuItem-root": {
                                color: "var(--theme-text-secondary)",
                                "&:hover": {
                                  backgroundColor: "rgba(0, 212, 255, 0.1)",
                                },
                                "&.Mui-selected": {
                                  backgroundColor: "rgba(0, 212, 255, 0.15)",
                                  "&:hover": {
                                    backgroundColor: "rgba(0, 212, 255, 0.2)",
                                  },
                                },
                              },
                            },
                          },
                        }}
                      >
                        <MenuItem value="Bike Service">Bike Service / Repair</MenuItem>
                        <MenuItem value="Custom Build">Custom Build</MenuItem>
                        <MenuItem value="Bike Purchase">Buy a Bike</MenuItem>
                        <MenuItem value="Sell Bike">Sell My Bike</MenuItem>
                        <MenuItem value="General Inquiry">General Question</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>

                  {/* Service Level (show only for Bike Service) */}
                  {formData.inquiryType === "Bike Service" && (
                    <FormControl fullWidth sx={darkInputStyles}>
                      <InputLabel>Preferred Service Level</InputLabel>
                      <Select
                        name="serviceLevel"
                        value={formData.serviceLevel}
                        onChange={handleChange}
                        label="Preferred Service Level"
                        MenuProps={{
                          PaperProps: {
                            sx: {
                              backgroundColor: "var(--theme-bg-secondary)",
                              border: "1px solid var(--theme-border)",
                              "& .MuiMenuItem-root": {
                                color: "var(--theme-text-secondary)",
                                "&:hover": {
                                  backgroundColor: "rgba(0, 212, 255, 0.1)",
                                },
                                "&.Mui-selected": {
                                  backgroundColor: "rgba(0, 212, 255, 0.15)",
                                },
                              },
                            },
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
                      <FormControl fullWidth sx={darkInputStyles}>
                        <InputLabel>Bike Type</InputLabel>
                        <Select
                          name="bikeType"
                          value={formData.bikeType}
                          onChange={handleChange}
                          label="Bike Type"
                          MenuProps={{
                            PaperProps: {
                              sx: {
                                backgroundColor: "var(--theme-bg-secondary)",
                                border: "1px solid var(--theme-border)",
                                "& .MuiMenuItem-root": {
                                  color: "var(--theme-text-secondary)",
                                  "&:hover": {
                                    backgroundColor: "rgba(0, 212, 255, 0.1)",
                                  },
                                  "&.Mui-selected": {
                                    backgroundColor: "rgba(0, 212, 255, 0.15)",
                                  },
                                },
                              },
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
                        sx={darkInputStyles}
                      />
                    </>
                  )}

                  {/* Pickup/Delivery Option (show for Service) */}
                  {formData.inquiryType === "Bike Service" && (
                    <FormControl fullWidth sx={darkInputStyles}>
                      <InputLabel>Pickup & Delivery</InputLabel>
                      <Select
                        name="pickupNeeded"
                        value={formData.pickupNeeded}
                        onChange={handleChange}
                        label="Pickup & Delivery"
                        MenuProps={{
                          PaperProps: {
                            sx: {
                              backgroundColor: "var(--theme-bg-secondary)",
                              border: "1px solid var(--theme-border)",
                              "& .MuiMenuItem-root": {
                                color: "var(--theme-text-secondary)",
                                "&:hover": {
                                  backgroundColor: "rgba(0, 212, 255, 0.1)",
                                },
                                "&.Mui-selected": {
                                  backgroundColor: "rgba(0, 212, 255, 0.15)",
                                },
                              },
                            },
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
                    <Typography
                      sx={{
                        fontWeight: 700,
                        color: "var(--theme-text-primary)",
                        mb: 2,
                        fontSize: "0.875rem",
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                      }}
                    >
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
                        sx={darkInputStyles}
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
                          sx={darkInputStyles}
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
                          sx={darkInputStyles}
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
                    sx={darkInputStyles}
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
                        transform: "translateY(-2px)",
                      },
                      "&.Mui-disabled": {
                        backgroundColor: "rgba(0, 212, 255, 0.5)",
                        color: "#000000",
                      },
                      transition: "all 0.3s ease",
                    }}
                  >
                    {submitStatus === "loading" && (
                      <CircularProgress
                        size={20}
                        sx={{
                          color: "#000000",
                          mr: 1,
                        }}
                      />
                    )}
                    {submitStatus === "loading" ? "Sending your inquiry, this may take a moment..." : submitStatus === "success" ? "Sent!" : "Send Inquiry"}
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
                  borderRadius: 0,
                  backgroundColor: "rgba(0, 212, 255, 0.08)",
                  border: "1px solid rgba(0, 212, 255, 0.3)",
                }}
              >
                <Typography
                  sx={{
                    fontWeight: 700,
                    color: "var(--theme-text-primary)",
                    mb: 1,
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    fontSize: "0.875rem",
                  }}
                >
                  <i className="fi fi-rr-info" style={{ color: "#00d4ff" }}></i>
                  Quick Response
                </Typography>
                <Typography sx={{ color: "var(--theme-text-muted)", lineHeight: 1.7, fontSize: "0.875rem" }}>
                  We typically respond within 24 hours. For urgent service requests, please call us directly.
                </Typography>
              </Paper>

              {/* Contact Details */}
              <Paper
                elevation={0}
                sx={{
                  p: 4,
                  borderRadius: 0,
                  backgroundColor: "var(--theme-bg-secondary)",
                  border: "1px solid var(--theme-border)",
                  position: "relative",
                }}
              >
                {/* Corner accent */}
                <Box
                  sx={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    width: "40px",
                    height: "2px",
                    backgroundColor: "#00d4ff",
                  }}
                />

                <Stack spacing={4}>
                  <Box>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 1 }}>
                      <i className="fi fi-rr-envelope" style={{ color: "#00d4ff", fontSize: "1.1rem" }}></i>
                      <Typography sx={{ fontWeight: 700, color: "var(--theme-text-primary)", fontSize: "0.875rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                        Email
                      </Typography>
                    </Box>
                    <Link
                      href="mailto:bicyclerepairs2u@gmail.com"
                      sx={{
                        fontSize: "0.9rem",
                        color: "var(--theme-text-secondary)",
                        textDecoration: "none",
                        transition: "color 0.2s ease",
                        "&:hover": {
                          color: "#00d4ff",
                        },
                      }}
                    >
                      bicyclerepairs2u@gmail.com
                    </Link>
                  </Box>

                  <Box>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 1 }}>
                      <i className="fi fi-rr-phone-call" style={{ color: "#00d4ff", fontSize: "1.1rem" }}></i>
                      <Typography sx={{ fontWeight: 700, color: "var(--theme-text-primary)", fontSize: "0.875rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                        Phone
                      </Typography>
                    </Box>
                    <Link
                      href="tel:+61402880242"
                      sx={{
                        fontSize: "0.9rem",
                        color: "var(--theme-text-secondary)",
                        textDecoration: "none",
                        transition: "color 0.2s ease",
                        "&:hover": {
                          color: "#00d4ff",
                        },
                      }}
                    >
                      0402 880 242
                    </Link>
                  </Box>

                  <Box>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 1 }}>
                      <i className="fi fi-rr-marker" style={{ color: "#00d4ff", fontSize: "1.1rem" }}></i>
                      <Typography sx={{ fontWeight: 700, color: "var(--theme-text-primary)", fontSize: "0.875rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                        Location
                      </Typography>
                    </Box>
                    <Typography sx={{ color: "var(--theme-text-muted)", fontSize: "0.9rem", lineHeight: 1.6 }}>
                      167/171 Bronte Rd
                      <br />
                      Queens Park NSW 2022
                    </Typography>
                  </Box>

                  <Box>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 1 }}>
                      <i className="fi fi-rr-clock" style={{ color: "#00d4ff", fontSize: "1.1rem" }}></i>
                      <Typography sx={{ fontWeight: 700, color: "var(--theme-text-primary)", fontSize: "0.875rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                        Hours
                      </Typography>
                    </Box>
                    <Typography sx={{ color: "var(--theme-text-muted)", lineHeight: 1.6, fontSize: "0.9rem" }}>
                      By appointment or arrangement
                      <br />
                      Available most days including weekends
                    </Typography>
                    <Typography sx={{ color: "var(--theme-text-muted)", display: "block", mt: 0.5, fontSize: "0.75rem" }}>
                      Please contact ahead to arrange a time
                    </Typography>
                  </Box>

                  <Box>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 1 }}>
                      <i className="fi fi-brands-facebook" style={{ color: "#00d4ff", fontSize: "1.1rem" }}></i>
                      <Typography sx={{ fontWeight: 700, color: "var(--theme-text-primary)", fontSize: "0.875rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                        Facebook
                      </Typography>
                    </Box>
                    <Link
                      href="https://www.facebook.com/marketplace/profile/100015456158533/?ref=permalink&mibextid=6ojiHh"
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{
                        fontSize: "0.9rem",
                        color: "var(--theme-text-secondary)",
                        textDecoration: "none",
                        transition: "color 0.2s ease",
                        "&:hover": {
                          color: "#00d4ff",
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
                  p: 4,
                  borderRadius: 0,
                  backgroundColor: "var(--theme-bg-secondary)",
                  border: "1px solid var(--theme-border)",
                }}
              >
                <Typography
                  sx={{
                    fontWeight: 700,
                    color: "var(--theme-text-primary)",
                    mb: 3,
                    display: "flex",
                    alignItems: "center",
                    gap: 1.5,
                    fontSize: "0.875rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                  }}
                >
                  <i className="fi fi-rr-tool-box" style={{ color: "#00d4ff" }}></i>
                  Our Services
                </Typography>
                <Stack spacing={2}>
                  {["Bike Service & Repairs", "Custom Builds", "Bike Sales (Pre-Owned)", "Pickup & Delivery"].map((service) => (
                    <Box
                      key={service}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                      }}
                    >
                      <Box sx={{ width: "4px", height: "4px", backgroundColor: "#00d4ff" }} />
                      <Typography sx={{ color: "var(--theme-text-muted)", fontSize: "0.875rem" }}>
                        {service}
                      </Typography>
                    </Box>
                  ))}
                </Stack>
              </Paper>
            </Stack>
          </Box>
        </Box>
      </Container>
    </Box>
  )
}
