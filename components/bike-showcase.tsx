"use client"

import {
  Box,
  Container,
  Typography,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Chip,
  Stack,
} from "@mui/material"

const bikes = [
  {
    name: "2021 Specialized Tarmac SL7",
    description: "Shimano Ultegra Di2, Carbon Frame",
    price: "$3,200",
    image: "/specialized-tarmac-road-bike-carbon-black.jpg",
    tags: ["Road", "Excellent Condition"],
    link: "#",
  },
  {
    name: "Cervélo P3 Triathlon Bike",
    description: "SRAM Force eTap, Aero Wheels",
    price: "$4,500",
    image: "/cervelo-p3-triathlon-bike-aero-blue.jpg",
    tags: ["Triathlon", "New Arrival"],
    link: "#",
  },
  {
    name: "Canyon Ultimate CF SL 8",
    description: "Shimano 105, Excellent Condition",
    price: "$2,100",
    image: "/canyon-ultimate-road-bike-white-red.jpg",
    tags: ["Road", "Great Value"],
    link: "#",
  },
  {
    name: "Trek Émonda SLR",
    description: "Lightweight Carbon, Dura-Ace",
    price: "$5,200",
    image: "/trek-emonda-lightweight-road-bike-silver.jpg",
    tags: ["Road", "Premium"],
    link: "#",
  },
  {
    name: "Giant TCR Advanced Pro",
    description: "Ultegra Groupset, Race Ready",
    price: "$2,850",
    image: "/giant-tcr-advanced-road-bike-blue-black.jpg",
    tags: ["Road", "Race Ready"],
    link: "#",
  },
  {
    name: "Scott Addict RC",
    description: "Custom Build, SRAM Red",
    price: "$4,800",
    image: "/scott-addict-road-bike-white-orange.jpg",
    tags: ["Road", "Custom Build"],
    link: "#",
  },
  {
    name: "Pinarello Dogma F10",
    description: "Campagnolo Super Record",
    price: "$6,500",
    image: "/pinarello-dogma-road-bike-black-red.jpg",
    tags: ["Road", "Premium"],
    link: "#",
  },
  {
    name: "BMC Teammachine SLR01",
    description: "Premium Components",
    price: "$3,900",
    image: "/bmc-teammachine-road-bike-red-white.jpg",
    tags: ["Road", "Excellent Condition"],
    link: "#",
  },
  {
    name: "Bianchi Oltre XR4",
    description: "Italian Craftsmanship, Di2",
    price: "$4,200",
    image: "/bianchi-oltre-road-bike-celeste-green.jpg",
    tags: ["Road", "New Arrival"],
    link: "#",
  },
]

export default function BikeShowcase() {
  return (
    <Box
      id="bikes"
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
          Featured Bikes for Sale
        </Typography>

        <Typography
          variant="body1"
          sx={{
            fontSize: "1rem",
            color: "#757575",
            mb: 6,
            textAlign: "center",
          }}
        >
          All bikes sold on Facebook Marketplace
        </Typography>

        <Box sx={{ display: 'grid', gap: 4, gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' } }}>
          {bikes.map((bike, index) => (
            <Card key={index} elevation={0} sx={{ display: 'flex', flexDirection: 'column', borderRadius: "12px", overflow: "hidden", transition: "all 0.3s ease", border: "1px solid #e0e0e0", "&:hover": { transform: "translateY(-4px)", boxShadow: "0 12px 24px rgba(0, 0, 0, 0.12)", "& .bike-image": { transform: "scale(1.05)", }, }, }}>
              <Box sx={{ overflow: "hidden", position: "relative" }}>
                <CardMedia
                  component="img"
                  image={bike.image}
                  alt={bike.name}
                  className="bike-image"
                  sx={{
                    height: 240,
                    objectFit: "cover",
                    transition: "transform 0.3s ease",
                  }}
                />
                <Stack
                  direction="row"
                  spacing={1}
                  sx={{
                    position: "absolute",
                    top: 12,
                    left: 12,
                  }}
                >
                  {bike.tags.map((tag, tagIndex) => (
                    <Chip
                      key={tagIndex}
                      label={tag}
                      size="small"
                      sx={{
                        backgroundColor: "rgba(255, 255, 255, 0.95)",
                        fontWeight: 600,
                        fontSize: "0.75rem",
                      }}
                    />
                  ))}
                </Stack>
              </Box>

              <CardContent sx={{ flexGrow: 1, p: 3 }}>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 600,
                    color: "#212121",
                    mb: 1,
                    fontSize: "1.1rem",
                  }}
                >
                  {bike.name}
                </Typography>

                <Typography
                  variant="body2"
                  sx={{
                    color: "#757575",
                    mb: 2,
                    lineHeight: 1.6,
                  }}
                >
                  {bike.description}
                </Typography>

                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 700,
                    color: "#0288d1",
                    fontSize: "1.5rem",
                  }}
                >
                  {bike.price}
                </Typography>
              </CardContent>

              <CardActions sx={{ p: 3, pt: 0 }}>
                <Button
                  variant="contained"
                  fullWidth
                  endIcon={
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"
                        fill="currentColor"
                      />
                    </svg>
                  }
                  href={bike.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    backgroundColor: "#0288d1",
                    color: "#ffffff",
                    fontWeight: 600,
                    py: 1.2,
                    textTransform: "none",
                    borderRadius: "8px",
                    "&:hover": {
                      backgroundColor: "#0277bd",
                    },
                  }}
                >
                  View on Facebook Marketplace
                </Button>
              </CardActions>
            </Card>
          ))}
        </Box>
      </Container>
    </Box>
  )
}
