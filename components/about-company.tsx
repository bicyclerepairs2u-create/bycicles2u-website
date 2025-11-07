"use client"

import { Box, Container, Typography, Card, CardContent } from "@mui/material"

const services = [
  {
    icon: "fi fi-rr-tool-box",
    title: "Expert Repairs",
    description: "Professional tune-ups and repairs for road and tri bikes",
  },
  {
    icon: "fi fi-rr-bike",
    title: "Quality Bikes",
    description: "Carefully selected second-hand performance bikes",
  },
  {
    icon: "fi fi-rr-settings",
    title: "Custom Builds",
    description: "Bespoke builds tailored to your riding style",
  },
  {
    icon: "fi fi-rr-bolt",
    title: "Performance Focus",
    description: "Specialized in lightweight, fast bikes",
  },
]

export default function AboutCompany() {
  return (
    <Box
      id="our-story"
      component="section"
      sx={{
        py: { xs: 8, md: 12 },
        backgroundColor: "#fafafa",
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="h2"
          sx={{
            fontSize: { xs: "2rem", md: "3rem" },
            fontWeight: 700,
            color: "#212121",
            mb: 3,
            textAlign: "center",
            letterSpacing: "-1px",
          }}
        >
          Why Choose Bicycles2U?
        </Typography>

        <Typography
          variant="body1"
          sx={{
            fontSize: "1.2rem",
            color: "#757575",
            mb: 8,
            textAlign: "center",
            maxWidth: "800px",
            mx: "auto",
            lineHeight: 1.8,
          }}
        >
          We're dedicated to providing quality second-hand road and triathlon bikes, expert repair and maintenance
          services, and custom builds for performance cyclists. Our commitment is to traditional bikes only – we
          specialize in what we know best.
        </Typography>

        <Box sx={{ display: 'grid', gap: 4, gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' }, justifyContent: 'center' }}>
          {services.map((service, index) => {
            return (
              <Box key={index}>
                <Card
                   elevation={0}
                   sx={{
                     height: "100%",
                     minHeight: "320px",
                     borderRadius: "12px",
                     backgroundColor: "#ffffff",
                     transition: "all 0.3s ease",
                     cursor: "pointer",
                     "&:hover": {
                       transform: "translateY(-8px)",
                       boxShadow: "0 12px 24px rgba(0, 0, 0, 0.15)",
                     },
                   }}
                 >
                   <CardContent
                     sx={{
                       p: 4,
                       textAlign: "center",
                       display: "flex",
                       flexDirection: "column",
                       alignItems: "center",
                       height: "100%",
                     }}
                   >
                     <Box
                       sx={{
                         width: 80,
                         height: 80,
                         borderRadius: "50%",
                         backgroundColor: "rgba(2, 136, 209, 0.1)",
                         display: "flex",
                         alignItems: "center",
                         justifyContent: "center",
                         mb: 3,
                       }}
                     >
                       <i className={service.icon} style={{ fontSize: "2.5rem", color: "#0288d1" }}></i>
                     </Box>

                     <Typography
                       variant="h6"
                       sx={{
                         fontWeight: 600,
                         color: "#212121",
                         mb: 2,
                         fontSize: "1.2rem",
                       }}
                     >
                       {service.title}
                     </Typography>

                     <Typography
                       variant="body2"
                       sx={{
                         color: "#757575",
                         lineHeight: 1.6,
                         fontSize: "0.95rem",
                       }}
                     >
                       {service.description}
                     </Typography>
                   </CardContent>
                 </Card>
              </Box>
             )
           })}
        </Box>
      </Container>
    </Box>
  )
}
