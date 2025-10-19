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
        background: "linear-gradient(135deg, rgba(2, 136, 209, 0.05) 0%, rgba(255, 255, 255, 1) 100%)",
        pt: { xs: 12, md: 0 },
      }}
    >
      {/* Background Pattern */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          right: 0,
          width: { xs: "100%", md: "50%" },
          height: "100%",
          backgroundImage:
            "url(/placeholder.svg?height=800&width=1200&query=sleek+aerodynamic+road+bike+in+motion+speed+blur+professional+cycling)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.15,
          zIndex: 0,
        }}
      />

      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
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
              color: "#212121",
              mb: 2,
              lineHeight: 1.1,
              letterSpacing: "-2px",
            }}
          >
            Premium Road & Triathlon Bikes
          </Typography>

          <Typography
            variant="h5"
            sx={{
              fontSize: { xs: "1.1rem", md: "1.3rem" },
              fontWeight: 400,
              color: "#757575",
              mb: 4,
              lineHeight: 1.6,
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
                backgroundColor: "#ff5722",
                color: "#ffffff",
                fontWeight: 600,
                fontSize: "1rem",
                px: 4,
                py: 1.5,
                textTransform: "none",
                borderRadius: "8px",
                boxShadow: "0 4px 12px rgba(255, 87, 34, 0.3)",
                "&:hover": {
                  backgroundColor: "#f4511e",
                  boxShadow: "0 6px 16px rgba(255, 87, 34, 0.4)",
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
                borderColor: "#0288d1",
                color: "#0288d1",
                fontWeight: 600,
                fontSize: "1rem",
                px: 4,
                py: 1.5,
                textTransform: "none",
                borderRadius: "8px",
                borderWidth: "2px",
                "&:hover": {
                  borderColor: "#0277bd",
                  backgroundColor: "rgba(2, 136, 209, 0.08)",
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
