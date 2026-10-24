"use client"

import { Box, Container, Typography } from "@mui/material"

const logoFrameSx = {
  flex: "0 0 auto",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: { xs: "220px", md: "300px" },
  height: { xs: "120px", md: "150px" },
  position: "relative",
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "scale(1.05)",
  },
}

const logoImageSx = {
  maxWidth: { xs: "220px", md: "300px" },
  maxHeight: { xs: "100px", md: "130px" },
  objectFit: "contain",
  filter: "grayscale(100%) brightness(0.7) contrast(1.2)",
  opacity: 0.5,
  transition: "all 0.4s ease",
  "&:hover": {
    filter: "grayscale(0%) brightness(1)",
    opacity: 1,
  },
}

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
            gap: { xs: 1.5, md: 2 },
            py: 4,
            animation: "scroll 20s linear infinite",
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
            <Box key={`first-${index}`} sx={logoFrameSx}>
              <Box component="img" src={brand.logo} alt={brand.name} sx={logoImageSx} />
            </Box>
          ))}
          {/* Duplicate set for seamless loop */}
          {brands.map((brand, index) => (
            <Box key={`second-${index}`} sx={logoFrameSx}>
              <Box component="img" src={brand.logo} alt="" sx={logoImageSx} />
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
