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
        backgroundColor: "var(--theme-bg-primary)",
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

      {/* Gradient Overlay - adapts to theme */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: "linear-gradient(135deg, var(--theme-overlay) 0%, var(--theme-overlay) 50%, var(--theme-accent-glow) 100%)",
          zIndex: 1,
        }}
      />

      {/* Diagonal Stripe Pattern - Right Side */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          right: 0,
          width: "50%",
          height: "100%",
          backgroundImage: `repeating-linear-gradient(
            -45deg,
            #ff1744,
            #ff1744 1px,
            transparent 1px,
            transparent 40px
          )`,
          opacity: 0.08,
          zIndex: 2,
        }}
      />

      {/* Animated Red Accent Line - Top */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "30%",
          height: "3px",
          background: "linear-gradient(90deg, #ff1744 0%, transparent 100%)",
          zIndex: 3,
          animation: "slideInLeft 1s ease-out forwards",
          "@keyframes slideInLeft": {
            "0%": { transform: "translateX(-100%)", opacity: 0 },
            "100%": { transform: "translateX(0)", opacity: 1 },
          },
        }}
      />

      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 4 }}>
        <Box
          sx={{
            maxWidth: { xs: "100%", md: "700px" },
            textAlign: { xs: "center", md: "left" },
          }}
        >
          {/* Brand Tag */}
          <Typography
            component="span"
            sx={{
              display: "inline-block",
              fontSize: "0.625rem",
              fontWeight: 600,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#ff1744",
              mb: 2,
              animation: "fadeInUp 0.6s ease-out forwards",
              animationDelay: "0.2s",
              opacity: 0,
              "@keyframes fadeInUp": {
                "0%": { opacity: 0, transform: "translateY(20px)" },
                "100%": { opacity: 1, transform: "translateY(0)" },
              },
            }}
          >
            Sydney's Premier Pre-Owned Specialists
          </Typography>

          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: "2.5rem", sm: "3.5rem", md: "5rem" },
              fontWeight: 900,
              color: "#ffffff",
              mb: 3,
              lineHeight: 1.0,
              letterSpacing: "-0.05em",
              textTransform: "uppercase",
              animation: "fadeInUp 0.6s ease-out forwards",
              animationDelay: "0.4s",
              opacity: 0,
              textShadow: "0 2px 10px rgba(0,0,0,0.3)",
            }}
          >
            Premium Road &{" "}
            <Box
              component="span"
              sx={{
                color: "#ff1744",
                display: "inline",
              }}
            >
              Triathlon
            </Box>{" "}
            Bikes
          </Typography>

          <Typography
            variant="h5"
            sx={{
              fontSize: { xs: "1rem", md: "1.25rem" },
              fontWeight: 400,
              color: "#e5e5e5",
              mb: 4,
              lineHeight: 1.7,
              maxWidth: "560px",
              animation: "fadeInUp 0.6s ease-out forwards",
              animationDelay: "0.6s",
              opacity: 0,
              textShadow: "0 1px 3px rgba(0,0,0,0.3)",
            }}
          >
            Sydney's first and only bike store dedicated to pre-owned and professionally refurbished road, triathlon, and gravel bikes.
          </Typography>

          {/* Category Tags */}
          <Stack
            direction="row"
            spacing={1.5}
            sx={{
              mb: 4,
              justifyContent: { xs: "center", md: "flex-start" },
              flexWrap: "wrap",
              gap: 1,
              animation: "fadeInUp 0.6s ease-out forwards",
              animationDelay: "0.8s",
              opacity: 0,
            }}
          >
            {["Road", "Triathlon", "Time Trial", "Gravel"].map((category) => (
              <Box
                key={category}
                sx={{
                  px: 2,
                  py: 0.75,
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  border: "1px solid #ff1744",
                  color: "#ff1744",
                  backgroundColor: "rgba(0,0,0,0.3)",
                  transition: "all 0.2s ease",
                  cursor: "pointer",
                  "&:hover": {
                    backgroundColor: "#ff1744",
                    color: "#000000",
                  },
                }}
              >
                {category}
              </Box>
            ))}
          </Stack>

          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            sx={{
              justifyContent: { xs: "center", md: "flex-start" },
              animation: "fadeInUp 0.6s ease-out forwards",
              animationDelay: "1s",
              opacity: 0,
            }}
          >
            <Button
              variant="contained"
              size="large"
              onClick={() => handleScroll("#bikes")}
              sx={{
                backgroundColor: "#ff1744",
                color: "#000000",
                fontWeight: 700,
                fontSize: "0.875rem",
                px: 4,
                py: 1.5,
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                borderRadius: 0,
                boxShadow: "0 4px 20px rgba(255, 23, 68, 0.4)",
                "&:hover": {
                  backgroundColor: "#d50032",
                  boxShadow: "0 6px 30px rgba(255, 23, 68, 0.5)",
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
                borderColor: "#ff1744",
                color: "#ff1744",
                fontWeight: 700,
                fontSize: "0.875rem",
                px: 4,
                py: 1.5,
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                borderRadius: 0,
                borderWidth: "1px",
                backgroundColor: "rgba(0,0,0,0.2)",
                "&:hover": {
                  borderColor: "#ff1744",
                  backgroundColor: "#ff1744",
                  color: "#000000",
                  borderWidth: "1px",
                  transform: "translateY(-2px)",
                },
                transition: "all 0.3s ease",
              }}
            >
              Book a Repair
            </Button>

            <Button
              variant="outlined"
              size="large"
              href="/sell-bike"
              sx={{
                borderColor: "rgba(255,255,255,0.3)",
                color: "#e5e5e5",
                fontWeight: 700,
                fontSize: "0.875rem",
                px: 4,
                py: 1.5,
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                borderRadius: 0,
                borderWidth: "1px",
                backgroundColor: "rgba(0,0,0,0.2)",
                "&:hover": {
                  borderColor: "#ff1744",
                  color: "#ff1744",
                  backgroundColor: "rgba(0,0,0,0.3)",
                  borderWidth: "1px",
                  transform: "translateY(-2px)",
                },
                transition: "all 0.3s ease",
              }}
            >
              Sell My Bike
            </Button>
          </Stack>
        </Box>
      </Container>

      {/* Bottom Gradient Fade */}
      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
          height: "150px",
          background: "linear-gradient(to top, var(--theme-bg-primary) 0%, transparent 100%)",
          zIndex: 3,
        }}
      />
    </Box>
  )
}
