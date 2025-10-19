"use client"

import type React from "react"

import { useState } from "react"
import {
  Box,
  Container,
  Typography,
  Grid,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Paper,
  Stack,
  Link,
} from "@mui/material"

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    serviceType: "",
    message: "",
  })

  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    alert("Thank you for your message! We'll get back to you soon.")
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
            fontSize: { xs: "2rem", md: "3rem" },
            fontWeight: 700,
            color: "#212121",
            mb: 8,
            textAlign: "center",
            letterSpacing: "-1px",
          }}
        >
          Get In Touch
        </Typography>

        <Grid container spacing={8} justifyContent="center">
          {/* Contact Form */}
          <Grid item xs={12} md={6}>
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
                    label="Phone (Optional)"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
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

                  <FormControl fullWidth required>
                    <InputLabel>Service Type</InputLabel>
                    <Select
                      name="serviceType"
                      value={formData.serviceType}
                      onChange={handleChange}
                      label="Service Type"
                      sx={{
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#0288d1",
                        },
                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#0288d1",
                        },
                      }}
                    >
                      <MenuItem value="Bike Repair">Bike Repair</MenuItem>
                      <MenuItem value="Custom Build">Custom Build</MenuItem>
                      <MenuItem value="General Inquiry">General Inquiry</MenuItem>
                      <MenuItem value="Bike Purchase">Bike Purchase</MenuItem>
                    </Select>
                  </FormControl>

                  <TextField
                    fullWidth
                    label="Message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    multiline
                    rows={5}
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

                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    sx={{
                      backgroundColor: "#ff5722",
                      color: "#ffffff",
                      fontWeight: 600,
                      fontSize: "1rem",
                      py: 1.5,
                      textTransform: "none",
                      borderRadius: "8px",
                      "&:hover": {
                        backgroundColor: "#f4511e",
                      },
                    }}
                  >
                    Send Message
                  </Button>
                </Stack>
              </form>
            </Paper>
          </Grid>

          {/* Contact Information */}
          <Grid item xs={12} md={5}>
            <Stack spacing={4}>
              <Box>
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <Box
                    sx={{
                      fontSize: "1.75rem",
                      mr: 2,
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    📧
                  </Box>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 600,
                      color: "#212121",
                    }}
                  >
                    Email
                  </Typography>
                </Box>
                <Link
                  href="mailto:info@bicycles2u.com.au"
                  sx={{
                    fontSize: "1.1rem",
                    color: "#0288d1",
                    textDecoration: "none",
                    "&:hover": {
                      textDecoration: "underline",
                    },
                  }}
                >
                  info@bicycles2u.com.au
                </Link>
              </Box>

              <Box>
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <Box
                    sx={{
                      fontSize: "1.75rem",
                      mr: 2,
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    📞
                  </Box>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 600,
                      color: "#212121",
                    }}
                  >
                    Phone
                  </Typography>
                </Box>
                <Link
                  href="tel:+61400000000"
                  sx={{
                    fontSize: "1.1rem",
                    color: "#0288d1",
                    textDecoration: "none",
                    "&:hover": {
                      textDecoration: "underline",
                    },
                  }}
                >
                  +61 4XX XXX XXX
                </Link>
              </Box>

              <Box>
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <Box
                    sx={{
                      fontSize: "1.75rem",
                      mr: 2,
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    🕐
                  </Box>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 600,
                      color: "#212121",
                    }}
                  >
                    Business Hours
                  </Typography>
                </Box>
                <Stack spacing={0.5}>
                  <Typography variant="body1" sx={{ color: "#424242" }}>
                    Monday - Friday: 9:00 AM - 6:00 PM
                  </Typography>
                  <Typography variant="body1" sx={{ color: "#424242" }}>
                    Saturday: 10:00 AM - 4:00 PM
                  </Typography>
                  <Typography variant="body1" sx={{ color: "#424242" }}>
                    Sunday: Closed
                  </Typography>
                </Stack>
              </Box>

              <Box>
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <Box
                    sx={{
                      fontSize: "1.75rem",
                      mr: 2,
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    📱
                  </Box>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 600,
                      color: "#212121",
                    }}
                  >
                    Social Media
                  </Typography>
                </Box>
                <Link
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    fontSize: "1.1rem",
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
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}
