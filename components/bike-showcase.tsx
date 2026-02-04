"use client"

import { Box, Container, Typography, Button } from "@mui/material"

export default function BikeShowcase() {
  const handleScroll = (id: string) => {
    const element = document.querySelector(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <Box
      id="bikes"
      component="section"
      sx={{
        py: { xs: 12, md: 16 },
        backgroundColor: "var(--theme-bg-primary)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background Diagonal Pattern */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundImage: `repeating-linear-gradient(
            -45deg,
            #ff1744,
            #ff1744 1px,
            transparent 1px,
            transparent 60px
          )`,
          opacity: 0.03,
          zIndex: 0,
        }}
      />

      {/* Radial Glow */}
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "600px",
          height: "600px",
          background: "radial-gradient(circle, var(--theme-accent-glow) 0%, transparent 70%)",
          zIndex: 0,
        }}
      />

      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        <Box
          sx={{
            textAlign: "center",
            maxWidth: "700px",
            mx: "auto",
          }}
        >
          {/* Angular Card Container */}
          <Box
            sx={{
              backgroundColor: "var(--theme-bg-secondary)",
              p: { xs: 4, md: 6 },
              position: "relative",
              clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 30px), calc(100% - 30px) 100%, 0 100%)",
              transition: "box-shadow 0.3s ease",
              "&:hover": {
                boxShadow: "0 0 40px var(--theme-accent-glow)",
              },
            }}
          >
            {/* Corner Accent Lines */}
            <Box
              sx={{
                position: "absolute",
                top: 0,
                right: 0,
                width: "80px",
                height: "3px",
                backgroundColor: "#ff1744",
              }}
            />
            <Box
              sx={{
                position: "absolute",
                top: 0,
                right: 0,
                width: "3px",
                height: "60px",
                backgroundColor: "#ff1744",
              }}
            />

            {/* Construction Icon */}
            <Box
              sx={{
                fontSize: "4rem",
                mb: 3,
                display: "flex",
                justifyContent: "center",
                color: "#ff1744",
                animation: "pulse 2s ease-in-out infinite",
                "@keyframes pulse": {
                  "0%, 100%": { opacity: 1, transform: "scale(1)" },
                  "50%": { opacity: 0.7, transform: "scale(1.05)" },
                },
              }}
            >
              <i className="fi fi-rr-tool-box"></i>
            </Box>

            <Typography
              sx={{
                fontSize: "0.625rem",
                fontWeight: 600,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "#ff1744",
                mb: 2,
              }}
            >
              Under Development
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
              Coming Soon
            </Typography>

            <Typography
              variant="h5"
              sx={{
                fontSize: { xs: "1.1rem", md: "1.25rem" },
                fontWeight: 700,
                color: "#ff1744",
                mb: 3,
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}
            >
              Pre-Owned Bikes Section
            </Typography>

            <Typography
              variant="body1"
              sx={{
                fontSize: "1rem",
                color: "var(--theme-text-muted)",
                mb: 4,
                lineHeight: 1.8,
                maxWidth: "500px",
                mx: "auto",
              }}
            >
              We're building an in-site shopping experience. Soon you'll be able to browse and purchase all bikes directly through our website.
            </Typography>

            {/* Divider */}
            <Box
              sx={{
                width: "60px",
                height: "2px",
                backgroundColor: "#ff1744",
                mx: "auto",
                mb: 4,
                opacity: 0.5,
              }}
            />

            <Typography
              variant="body2"
              sx={{
                fontSize: "0.875rem",
                color: "var(--theme-text-muted)",
                mb: 4,
                fontStyle: "italic",
              }}
            >
              In the meantime, all bikes are available on Facebook Marketplace
            </Typography>

            <Box sx={{ display: "flex", gap: 2, justifyContent: "center", flexWrap: "wrap" }}>
              <Button
                variant="contained"
                size="large"
                href="https://www.facebook.com/marketplace/profile/100015456158533/?ref=permalink&mibextid=6ojiHh"
                target="_blank"
                rel="noopener noreferrer"
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
                  boxShadow: "0 4px 20px rgba(255, 23, 68, 0.3)",
                  "&:hover": {
                    backgroundColor: "#d50032",
                    boxShadow: "0 6px 30px rgba(255, 23, 68, 0.4)",
                    transform: "translateY(-2px)",
                  },
                  transition: "all 0.3s ease",
                }}
              >
                <i className="fi fi-brands-facebook" style={{ marginRight: "10px", fontSize: "1.1rem" }}></i>
                View on Marketplace
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
                Contact Us
              </Button>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  )
}
