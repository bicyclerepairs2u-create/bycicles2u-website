"use client"

import { Box, Container, Typography, Grid, Paper } from "@mui/material"

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

        <Grid container spacing={4} justifyContent="center">
          {brands.map((brand, index) => (
            <Grid item xs={6} sm={4} md={2} key={index}>
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  height: 120,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "12px",
                  border: "1px solid #e0e0e0",
                  transition: "all 0.3s ease",
                  cursor: "pointer",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)",
                    "& img": {
                      filter: "grayscale(0%)",
                      opacity: 1,
                    },
                  },
                }}
              >
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
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  )
}
