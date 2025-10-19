"use client"

import { Box, Container, Typography, Card, CardMedia } from "@mui/material"

export default function AboutSam() {
  return (
    <Box
      id="about-sam"
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
            mb: 6,
            textAlign: "center",
            letterSpacing: "-1px",
          }}
        >
          Meet Sam
        </Typography>

        <Box sx={{ display: 'grid', gap: 6, alignItems: 'center', gridTemplateColumns: { xs: '1fr', md: 'repeat(12, 1fr)' } }}>
          <Box sx={{ gridColumn: { xs: '1 / -1', md: 'span 5' } }}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
              <Card
                elevation={0}
                sx={{
                  borderRadius: "12px",
                  overflow: "hidden",
                  boxShadow: "0 8px 24px rgba(0, 0, 0, 0.12)",
                }}
              >
                <CardMedia
                  component="img"
                  image="/professional-bike-mechanic-working-on-road-bike-wo.jpg"
                  alt="Sam working on a bike"
                  sx={{
                    height: { xs: 300, md: 350 },
                    objectFit: "cover",
                  }}
                />
              </Card>

              <Card
                elevation={0}
                sx={{
                  borderRadius: "12px",
                  overflow: "hidden",
                  boxShadow: "0 8px 24px rgba(0, 0, 0, 0.12)",
                }}
              >
                <CardMedia
                  component="img"
                  image="/bike-mechanic-tuning-road-bike-in-workshop.jpg"
                  alt="Sam tuning a bike"
                  sx={{
                    height: { xs: 300, md: 350 },
                    objectFit: "cover",
                  }}
                />
              </Card>
            </Box>
          </Box>

          <Box sx={{ gridColumn: { xs: '1 / -1', md: 'span 7' } }}>
            <Box>
              <Typography
                variant="h5"
                sx={{
                  fontSize: { xs: "1.3rem", md: "1.5rem" },
                  fontWeight: 600,
                  color: "#0288d1",
                  mb: 3,
                  fontStyle: "italic",
                }}
              >
                "Every bike deserves to perform at its peak"
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  fontSize: "1.1rem",
                  color: "#424242",
                  mb: 2.5,
                  lineHeight: 1.8,
                }}
              >
                With over a decade of experience specializing in lightweight, high-performance bikes, I've dedicated my
                career to helping cyclists achieve their best rides. Whether you're training for your next triathlon or
                pushing for a personal best on the road, I understand the critical role every component plays in your
                performance.
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  fontSize: "1.1rem",
                  color: "#424242",
                  mb: 2.5,
                  lineHeight: 1.8,
                }}
              >
                My expertise lies in road bikes and triathlon bikes – the machines built for speed, efficiency, and
                precision. From custom builds tailored to your exact specifications to meticulous repairs that restore
                your bike to factory-fresh condition, I bring a personal approach and attention to detail that
                competitive cyclists demand.
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  fontSize: "1.1rem",
                  color: "#424242",
                  lineHeight: 1.8,
                }}
              >
                My passion for cycling extends beyond the workshop. I'm an active member of the local cycling community
                and understand firsthand what it takes to optimize a bike for peak performance. When you bring your bike
                to Bicycles2U, you're not just getting a mechanic – you're getting a fellow cyclist who cares about your
                ride as much as you do.
              </Typography>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  )
}
