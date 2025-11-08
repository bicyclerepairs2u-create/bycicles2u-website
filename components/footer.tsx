"use client"

import { Box, Container, Typography, Link, Divider } from "@mui/material"

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
        backgroundColor: "#212121",
        color: "#fafafa",
        pt: 6,
        pb: 3,
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "grid",
            gap: { xs: 4, md: 6 },
            mb: 4,
            gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", md: "2fr 1fr 1fr 1.5fr" },
          }}
        >
          {/* Column 1: Branding & Description */}
          <Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2 }}>
              <Box
                component="img"
                src="/b2u-logo.svg"
                alt="Bicycles2U Logo"
                sx={{
                  height: "32px",
                  width: "auto",
                  filter: "brightness(0) invert(1)",
                }}
              />
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  fontSize: "1.3rem",
                }}
              >
                Bicycles2U
              </Typography>
            </Box>
            <Typography
              variant="body2"
              sx={{
                color: "#bdbdbd",
                fontSize: "0.9rem",
                lineHeight: 1.6,
                mb: 2,
              }}
            >
              Road Bike ONLY Specialists
              <br />
              Premium service, repairs & custom builds for serious cyclists.
            </Typography>
            <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
              <Link
                href="mailto:bicyclerepairs2u@gmail.com"
                sx={{
                  color: "#bdbdbd",
                  "&:hover": { color: "#0288d1" },
                }}
              >
                <i className="fi fi-rr-envelope" style={{ fontSize: "1.3rem" }}></i>
              </Link>
              <Link
                href="tel:+61402880242"
                sx={{
                  color: "#bdbdbd",
                  "&:hover": { color: "#0288d1" },
                }}
              >
                <i className="fi fi-rr-phone-call" style={{ fontSize: "1.3rem" }}></i>
              </Link>
              <Link
                href="https://www.facebook.com/marketplace/profile/100015456158533/?ref=permalink&mibextid=6ojiHh"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  color: "#bdbdbd",
                  "&:hover": { color: "#0288d1" },
                }}
              >
                <i className="fi fi-brands-facebook" style={{ fontSize: "1.3rem" }}></i>
              </Link>
            </Box>
          </Box>

          {/* Column 2: Quick Links */}
          <Box>
            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: 600,
                mb: 2,
                fontSize: "1rem",
              }}
            >
              Quick Links
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <Link
                component="button"
                onClick={() => handleNavClick("#home")}
                sx={{
                  color: "#bdbdbd",
                  textDecoration: "none",
                  textAlign: "left",
                  fontSize: "0.875rem",
                  "&:hover": {
                    color: "#0288d1",
                  },
                }}
              >
                Home
              </Link>
              <Link
                component="button"
                onClick={() => handleNavClick("#bikes")}
                sx={{
                  color: "#bdbdbd",
                  textDecoration: "none",
                  textAlign: "left",
                  fontSize: "0.875rem",
                  "&:hover": {
                    color: "#0288d1",
                  },
                }}
              >
                Bikes
              </Link>
              <Link
                component="button"
                onClick={() => handleNavClick("#testimonials")}
                sx={{
                  color: "#bdbdbd",
                  textDecoration: "none",
                  textAlign: "left",
                  fontSize: "0.875rem",
                  "&:hover": {
                    color: "#0288d1",
                  },
                }}
              >
                Reviews
              </Link>
              <Link
                href="/bike-sizing"
                sx={{
                  color: "#bdbdbd",
                  textDecoration: "none",
                  fontSize: "0.875rem",
                  "&:hover": {
                    color: "#0288d1",
                  },
                }}
              >
                Find Your Size
              </Link>
            </Box>
          </Box>

          {/* Column 3: Services */}
          <Box>
            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: 600,
                mb: 2,
                fontSize: "1rem",
              }}
            >
              Services
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <Link
                component="button"
                onClick={() => handleNavClick("#services")}
                sx={{
                  color: "#bdbdbd",
                  textDecoration: "none",
                  textAlign: "left",
                  fontSize: "0.875rem",
                  "&:hover": {
                    color: "#0288d1",
                  },
                }}
              >
                Bike Service
              </Link>
              <Link
                href="/sell-bike"
                sx={{
                  color: "#bdbdbd",
                  textDecoration: "none",
                  fontSize: "0.875rem",
                  "&:hover": {
                    color: "#0288d1",
                  },
                }}
              >
                Sell Your Bike
              </Link>
              <Link
                component="button"
                onClick={() => handleNavClick("#brands")}
                sx={{
                  color: "#bdbdbd",
                  textDecoration: "none",
                  textAlign: "left",
                  fontSize: "0.875rem",
                  "&:hover": {
                    color: "#0288d1",
                  },
                }}
              >
                Brands
              </Link>
              <Link
                component="button"
                onClick={() => handleNavClick("#contact")}
                sx={{
                  color: "#bdbdbd",
                  textDecoration: "none",
                  textAlign: "left",
                  fontSize: "0.875rem",
                  "&:hover": {
                    color: "#0288d1",
                  },
                }}
              >
                Contact Us
              </Link>
            </Box>
          </Box>

          {/* Column 4: Contact Info */}
          <Box>
            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: 600,
                mb: 2,
                fontSize: "1rem",
              }}
            >
              Contact
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
              <Typography
                variant="body2"
                sx={{
                  color: "#bdbdbd",
                  fontSize: "0.875rem",
                  lineHeight: 1.6,
                }}
              >
                167/171 Bronte Rd
                <br />
                Queens Park NSW 2022
              </Typography>
              <Link
                href="tel:+61402880242"
                sx={{
                  color: "#bdbdbd",
                  textDecoration: "none",
                  fontSize: "0.875rem",
                  "&:hover": {
                    color: "#0288d1",
                  },
                }}
              >
                0402 880 242
              </Link>
              <Link
                href="mailto:bicyclerepairs2u@gmail.com"
                sx={{
                  color: "#bdbdbd",
                  textDecoration: "none",
                  fontSize: "0.875rem",
                  "&:hover": {
                    color: "#0288d1",
                  },
                }}
              >
                bicyclerepairs2u@gmail.com
              </Link>
              <Typography
                variant="body2"
                sx={{
                  color: "#ffb74d",
                  fontSize: "0.8rem",
                  fontWeight: 500,
                  mt: 1,
                }}
              >
                <i className="fi fi-rr-info" style={{ marginRight: "4px" }}></i>
                Road bikes only - No e-bikes
              </Typography>
            </Box>
          </Box>
        </Box>

        <Divider sx={{ borderColor: "#424242", mb: 3 }} />

        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "space-between",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Typography
            variant="body2"
            sx={{
              color: "#9e9e9e",
              fontSize: "0.85rem",
            }}
          >
            © {new Date().getFullYear()} Bicycles2U. All rights reserved.
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: "#9e9e9e",
              fontSize: "0.85rem",
            }}
          >
            Road Bike Specialists • Queens Park, Sydney
          </Typography>
        </Box>
      </Container>
    </Box>
  )
}
