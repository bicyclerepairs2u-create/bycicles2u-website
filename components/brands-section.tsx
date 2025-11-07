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
        py: { xs: 8, md: 12 },
        backgroundColor: "#ffffff",
        overflow: "hidden",
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="h2"
          sx={{
            fontSize: { xs: "2rem", md: "3rem" },
            fontWeight: 700,
            color: "#212121",
            mb: 2,
            textAlign: "center",
            letterSpacing: "-1px",
          }}
        >
          Our Brands
        </Typography>

        <Typography
          variant="body1"
          sx={{
            fontSize: "1.1rem",
            color: "#757575",
            mb: 6,
            textAlign: "center",
          }}
        >
          Premium components and bikes from industry leaders
        </Typography>
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
            width: "150px",
            height: "100%",
            zIndex: 2,
            pointerEvents: "none",
          },
          "&::before": {
            left: 0,
            background: "linear-gradient(to right, #ffffff, transparent)",
          },
          "&::after": {
            right: 0,
            background: "linear-gradient(to left, #ffffff, transparent)",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            gap: 8,
            animation: "scroll 30s linear infinite",
            "@keyframes scroll": {
              "0%": {
                transform: "translateX(0)",
              },
              "100%": {
                transform: "translateX(-50%)",
              },
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
                height: "100px",
              }}
            >
              <Box
                component="img"
                src={brand.logo}
                alt={brand.name}
                sx={{
                  maxWidth: "180px",
                  maxHeight: "80px",
                  objectFit: "contain",
                  filter: "grayscale(100%)",
                  opacity: 0.6,
                  transition: "all 0.3s ease",
                  "&:hover": {
                    filter: "grayscale(0%)",
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
                height: "100px",
              }}
            >
              <Box
                component="img"
                src={brand.logo}
                alt={brand.name}
                sx={{
                  maxWidth: "180px",
                  maxHeight: "80px",
                  objectFit: "contain",
                  filter: "grayscale(100%)",
                  opacity: 0.6,
                  transition: "all 0.3s ease",
                  "&:hover": {
                    filter: "grayscale(0%)",
                    opacity: 1,
                  },
                }}
              />
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  )
}
