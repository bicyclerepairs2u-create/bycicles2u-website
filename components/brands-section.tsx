"use client"

import { Box, Container, Typography } from "@mui/material"

const brands = [
  { name: "Shimano", logo: "/shimano-logo-grayscale.jpg" },
  { name: "SRAM", logo: "/sram-logo-grayscale.jpg" },
  { name: "Specialized", logo: "/specialized-bikes-logo-grayscale.jpg" },
  { name: "Cervélo", logo: "/cervelo-bikes-logo-grayscale.jpg" },
  { name: "Canyon", logo: "/canyon-bikes-logo-grayscale.jpg" },
  { name: "Shimano", logo: "/shimano-logo-grayscale.jpg" },
  { name: "SRAM", logo: "/sram-logo-grayscale.jpg" },
  { name: "Specialized", logo: "/specialized-bikes-logo-grayscale.jpg" },
]

export default function BrandsSection() {
  return (
    <Box
      id="brands"
      component="section"
      sx={{
        py: { xs: 10, md: 14 },
        backgroundColor: "var(--theme-bg-primary)",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Top Border Accent */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "1px",
          background: "linear-gradient(90deg, transparent 0%, #00d4ff 50%, transparent 100%)",
          opacity: 0.3,
        }}
      />

      <Container maxWidth="lg">
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
            Trusted Partners
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
            Premium Brands
          </Typography>

          <Typography
            variant="body1"
            sx={{
              fontSize: "1rem",
              color: "var(--theme-text-muted)",
              maxWidth: "500px",
              mx: "auto",
            }}
          >
            Industry-leading components and frames from the best in cycling
          </Typography>
        </Box>
      </Container>

      {/* Scrolling Marquee Container */}
      <Box
        sx={{
          position: "relative",
          width: "100%",
          overflow: "hidden",
          "&::before, &::after": {
            content: '""',
            position: "absolute",
            top: 0,
            width: "200px",
            height: "100%",
            zIndex: 2,
            pointerEvents: "none",
          },
          "&::before": {
            left: 0,
            background: "linear-gradient(to right, var(--theme-bg-primary), transparent)",
          },
          "&::after": {
            right: 0,
            background: "linear-gradient(to left, var(--theme-bg-primary), transparent)",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            gap: 10,
            py: 4,
            animation: "scroll 35s linear infinite",
            "@keyframes scroll": {
              "0%": {
                transform: "translateX(0)",
              },
              "100%": {
                transform: "translateX(-50%)",
              },
            },
            "&:hover": {
              animationPlayState: "paused",
            },
          }}
        >
          {/* First set of logos */}
          {brands.map((brand, index) => (
            <Box
              key={`first-${index}`}
              sx={{
                flex: "0 0 auto",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "200px",
                height: "80px",
                position: "relative",
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "scale(1.05)",
                },
              }}
            >
              <Box
                component="img"
                src={brand.logo}
                alt={brand.name}
                sx={{
                  maxWidth: "160px",
                  maxHeight: "70px",
                  objectFit: "contain",
                  filter: "grayscale(100%) brightness(0.7) contrast(1.2)",
                  opacity: 0.5,
                  transition: "all 0.4s ease",
                  "&:hover": {
                    filter: "grayscale(0%) brightness(1)",
                    opacity: 1,
                  },
                }}
              />
            </Box>
          ))}
          {/* Duplicate set for seamless loop */}
          {brands.map((brand, index) => (
            <Box
              key={`second-${index}`}
              sx={{
                flex: "0 0 auto",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "200px",
                height: "80px",
                position: "relative",
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "scale(1.05)",
                },
              }}
            >
              <Box
                component="img"
                src={brand.logo}
                alt={brand.name}
                sx={{
                  maxWidth: "160px",
                  maxHeight: "70px",
                  objectFit: "contain",
                  filter: "grayscale(100%) brightness(0.7) contrast(1.2)",
                  opacity: 0.5,
                  transition: "all 0.4s ease",
                  "&:hover": {
                    filter: "grayscale(0%) brightness(1)",
                    opacity: 1,
                  },
                }}
              />
            </Box>
          ))}
        </Box>
      </Box>

      {/* Bottom Border Accent */}
      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
          height: "1px",
          background: "linear-gradient(90deg, transparent 0%, #00d4ff 50%, transparent 100%)",
          opacity: 0.3,
        }}
      />
    </Box>
  )
}
