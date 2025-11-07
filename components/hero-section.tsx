"use client"

import { Box, Container, Typography, Button, Stack } from "@mui/material"

export default function HeroSection() {
  const handleScroll = (id: string) => {
    const element = document.querySelector(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <Box
      id="home"
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        position: "relative",
        pt: { xs: 12, md: 0 },
      }}
    >
      {/* Background Image */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundImage: "url(/hero-section.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          zIndex: 0,
        }}
      />

      {/* Dark Overlay */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          zIndex: 1,
        }}
      />

      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 2 }}>
        <Box
          sx={{
            maxWidth: { xs: "100%", md: "600px" },
            textAlign: { xs: "center", md: "left" },
          }}
        >
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: "2.5rem", sm: "3.5rem", md: "4.5rem" },
              fontWeight: 700,
              color: "#ffffff",
              mb: 2,
              lineHeight: 1.1,
              letterSpacing: "-2px",
              textShadow: "0 2px 4px rgba(0, 0, 0, 0.3)",
            }}
          >
            Premium Road & Triathlon Bikes
          </Typography>

          <Typography
            variant="h5"
            sx={{
              fontSize: { xs: "1.1rem", md: "1.3rem" },
              fontWeight: 400,
              color: "#f5f5f5",
              mb: 4,
              lineHeight: 1.6,
              textShadow: "0 1px 2px rgba(0, 0, 0, 0.3)",
            }}
          >
            Expert repairs, custom builds, and quality second-hand bikes for serious cyclists
          </Typography>

          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            sx={{
              justifyContent: { xs: "center", md: "flex-start" },
            }}
          >
            <Button
              variant="contained"
              size="large"
              onClick={() => handleScroll("#bikes")}
              sx={{
                backgroundColor: "#0288d1",
                color: "#ffffff",
                fontWeight: 600,
                fontSize: "1rem",
                px: 4,
                py: 1.5,
                textTransform: "none",
                borderRadius: "8px",
                boxShadow: "0 4px 12px rgba(2, 136, 209, 0.4)",
                "&:hover": {
                  backgroundColor: "#0277bd",
                  boxShadow: "0 6px 16px rgba(2, 136, 209, 0.5)",
                  transform: "translateY(-2px)",
                },
                transition: "all 0.3s ease",
              }}
            >
              Browse Bikes
            </Button>

            <Button
              variant="outlined"
              size="large"
              onClick={() => handleScroll("#contact")}
              sx={{
                borderColor: "#ffffff",
                color: "#ffffff",
                fontWeight: 600,
                fontSize: "1rem",
                px: 4,
                py: 1.5,
                textTransform: "none",
                borderRadius: "8px",
                borderWidth: "2px",
                "&:hover": {
                  borderColor: "#ffffff",
                  backgroundColor: "rgba(255, 255, 255, 0.15)",
                  borderWidth: "2px",
                  transform: "translateY(-2px)",
                },
                transition: "all 0.3s ease",
              }}
            >
              Book a Repair
            </Button>
          </Stack>
        </Box>
      </Container>
    </Box>
  )
}
