"use client"

import { Box, Container, Typography, Button } from "@mui/material"

export default function BikeShowcase() {
  const handleScroll = (id: string) => {
    const element = document.querySelector(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <Box
      id="bikes"
      component="section"
      sx={{
        py: { xs: 12, md: 16 },
        backgroundColor: "#fafafa",
        position: "relative",
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            textAlign: "center",
            maxWidth: "700px",
            mx: "auto",
          }}
        >
          {/* Construction Icon */}
          <Box
            sx={{
              fontSize: "5rem",
              mb: 3,
              display: "flex",
              justifyContent: "center",
              color: "#0288d1",
            }}
          >
            <i className="fi fi-rr-tool-box"></i>
          </Box>

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
            Coming Soon
          </Typography>

          <Typography
            variant="h5"
            sx={{
              fontSize: { xs: "1.2rem", md: "1.4rem" },
              fontWeight: 600,
              color: "#0288d1",
              mb: 3,
            }}
          >
            Pre-Owned Bikes Section
          </Typography>

          <Typography
            variant="body1"
            sx={{
              fontSize: "1.1rem",
              color: "#757575",
              mb: 5,
              lineHeight: 1.8,
            }}
          >
            We're currently updating our inventory of premium pre-owned road and triathlon bikes. Check back soon to
            see our curated selection of quality second-hand bikes, all thoroughly inspected and serviced to perfection.
          </Typography>

          <Typography
            variant="body2"
            sx={{
              fontSize: "1rem",
              color: "#424242",
              mb: 4,
              fontStyle: "italic",
            }}
          >
            In the meantime, all bikes are available on Facebook Marketplace
          </Typography>

          <Button
            variant="contained"
            size="large"
            onClick={() => handleScroll("#contact")}
            sx={{
              backgroundColor: "#0288d1",
              color: "#ffffff",
              fontWeight: 600,
              fontSize: "1rem",
              px: 5,
              py: 1.5,
              textTransform: "none",
              borderRadius: "8px",
              boxShadow: "0 4px 12px rgba(2, 136, 209, 0.3)",
              "&:hover": {
                backgroundColor: "#0277bd",
                boxShadow: "0 6px 16px rgba(2, 136, 209, 0.4)",
                transform: "translateY(-2px)",
              },
              transition: "all 0.3s ease",
            }}
          >
            Contact Us About Available Bikes
          </Button>
        </Box>
      </Container>
    </Box>
  )
}
