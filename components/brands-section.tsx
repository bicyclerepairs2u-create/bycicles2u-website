"use client"

import { Box, Container, Typography, Paper } from "@mui/material"

const brands = [
  { name: "Shimano", logo: "/shimano-logo-grayscale.jpg" },
  { name: "SRAM", logo: "/sram-logo-grayscale.jpg" },
  { name: "Specialized", logo: "/specialized-bikes-logo-grayscale.jpg" },
  { name: "Cervélo", logo: "/cervelo-bikes-logo-grayscale.jpg" },
  { name: "Canyon", logo: "/canyon-bikes-logo-grayscale.jpg" },
  { name: "Campagnolo", logo: "/placeholder.svg?height=100&width=200" },
]

export default function BrandsSection() {
  return (
    <Box
      id="brands"
      component="section"
      sx={{
        py: { xs: 8, md: 12 },
        backgroundColor: "#ffffff",
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
          Trusted Brands We Work With
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

        <Box sx={{ display: 'grid', gap: 4, justifyContent: 'center', gridTemplateColumns: { xs: 'repeat(2, 1fr)', sm: 'repeat(3, 1fr)', md: 'repeat(6, 1fr)' } }}>
          {brands.map((brand, index) => (
            <Paper key={index} elevation={0} sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Box
                component="img"
                src={brand.logo}
                alt={brand.name}
                sx={{
                  maxWidth: "100%",
                  maxHeight: "60px",
                  objectFit: "contain",
                  filter: "grayscale(100%)",
                  opacity: 0.6,
                  transition: "all 0.3s ease",
                }}
              />
            </Paper>
          ))}
        </Box>
      </Container>
    </Box>
  )
}
