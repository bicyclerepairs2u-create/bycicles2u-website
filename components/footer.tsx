"use client"

import { Box, Container, Typography, Grid, Link, Divider, Stack } from "@mui/material"

export default function Footer() {
  const handleNavClick = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#424242",
        color: "#fafafa",
        pt: 8,
        pb: 4,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={6} sx={{ mb: 6 }}>
          {/* Column 1: Branding */}
          <Grid item xs={12} md={4}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
              <Box sx={{ fontSize: "2rem", display: "flex", alignItems: "center" }}>🚴</Box>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  fontSize: "1.5rem",
                }}
              >
                Bicycles2U
              </Typography>
            </Box>
            <Typography
              variant="body1"
              sx={{
                color: "#bdbdbd",
                fontSize: "1rem",
                fontWeight: 500,
                letterSpacing: "0.5px",
              }}
            >
              Lightweight. Fast. Performance.
            </Typography>
          </Grid>

          {/* Column 2: Quick Links */}
          <Grid item xs={12} sm={6} md={4}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                mb: 2,
                fontSize: "1.1rem",
              }}
            >
              Quick Links
            </Typography>
            <Stack spacing={1.5}>
              <Link
                component="button"
                onClick={() => handleNavClick("#about-sam")}
                sx={{
                  color: "#bdbdbd",
                  textDecoration: "none",
                  textAlign: "left",
                  "&:hover": {
                    color: "#0288d1",
                  },
                }}
              >
                About Sam
              </Link>
              <Link
                component="button"
                onClick={() => handleNavClick("#services")}
                sx={{
                  color: "#bdbdbd",
                  textDecoration: "none",
                  textAlign: "left",
                  "&:hover": {
                    color: "#0288d1",
                  },
                }}
              >
                Services
              </Link>
              <Link
                component="button"
                onClick={() => handleNavClick("#bikes")}
                sx={{
                  color: "#bdbdbd",
                  textDecoration: "none",
                  textAlign: "left",
                  "&:hover": {
                    color: "#0288d1",
                  },
                }}
              >
                Browse Bikes
              </Link>
              <Link
                component="button"
                onClick={() => handleNavClick("#contact")}
                sx={{
                  color: "#bdbdbd",
                  textDecoration: "none",
                  textAlign: "left",
                  "&:hover": {
                    color: "#0288d1",
                  },
                }}
              >
                Contact
              </Link>
            </Stack>
          </Grid>

          {/* Column 3: Legal & Info */}
          <Grid item xs={12} sm={6} md={4}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                mb: 2,
                fontSize: "1.1rem",
              }}
            >
              Legal & Info
            </Typography>
            <Stack spacing={1.5}>
              <Typography
                variant="body2"
                sx={{
                  color: "#ffb74d",
                  fontWeight: 500,
                }}
              >
                ⚠️ We do not service e-bikes
              </Typography>
              <Link
                href="#"
                sx={{
                  color: "#bdbdbd",
                  textDecoration: "none",
                  "&:hover": {
                    color: "#0288d1",
                  },
                }}
              >
                Privacy Policy
              </Link>
              <Link
                href="#"
                sx={{
                  color: "#bdbdbd",
                  textDecoration: "none",
                  "&:hover": {
                    color: "#0288d1",
                  },
                }}
              >
                Terms & Conditions
              </Link>
            </Stack>
          </Grid>
        </Grid>

        <Divider sx={{ borderColor: "#616161", mb: 3 }} />

        <Typography
          variant="body2"
          sx={{
            textAlign: "center",
            color: "#bdbdbd",
          }}
        >
          © 2025 Bicycles2U. All rights reserved.
        </Typography>
      </Container>
    </Box>
  )
}
