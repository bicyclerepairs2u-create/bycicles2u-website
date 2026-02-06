"use client"

import { Box, Container, Typography, Link, Divider } from "@mui/material"

export default function Footer() {
  const handleNavClick = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "var(--theme-bg-primary)",
        color: "var(--theme-text-primary)",
        pt: 8,
        pb: 4,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Top accent line */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "2px",
          background: "linear-gradient(90deg, #00d4ff 0%, transparent 50%, #00d4ff 100%)",
          opacity: 0.5,
        }}
      />

      {/* Background pattern */}
      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          right: 0,
          width: "40%",
          height: "100%",
          backgroundImage: `repeating-linear-gradient(
            -45deg,
            #00d4ff,
            #00d4ff 1px,
            transparent 1px,
            transparent 60px
          )`,
          opacity: 0.02,
          zIndex: 0,
        }}
      />

      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        <Box
          sx={{
            display: "grid",
            gap: { xs: 4, md: 6 },
            mb: 6,
            gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", md: "2fr 1fr 1fr 1.5fr" },
          }}
        >
          {/* Column 1: Branding & Description */}
          <Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 3 }}>
              <Box
                component="img"
                src="/b2u-logo.svg"
                alt="Bicycles2U Logo"
                sx={{
                  height: "32px",
                  width: "auto",
                }}
              />
              <Typography
                sx={{
                  fontWeight: 900,
                  fontSize: "1.25rem",
                  textTransform: "uppercase",
                  letterSpacing: "-0.02em",
                }}
              >
                Bicycles2U
              </Typography>
            </Box>
            <Typography
              sx={{
                color: "var(--theme-text-muted)",
                fontSize: "0.875rem",
                lineHeight: 1.7,
                mb: 3,
              }}
            >
              <Box component="span" sx={{ color: "#00d4ff", fontWeight: 600 }}>Road Bike ONLY Specialists</Box>
              <br />
              Premium service, repairs & custom builds for serious cyclists.
            </Typography>
            <Box sx={{ display: "flex", gap: 3 }}>
              <Link
                href="mailto:bicyclerepairs2u@gmail.com"
                sx={{
                  color: "var(--theme-text-muted)",
                  transition: "all 0.2s ease",
                  "&:hover": { color: "#00d4ff", transform: "translateY(-2px)" },
                  display: "inline-block",
                }}
              >
                <i className="fi fi-rr-envelope" style={{ fontSize: "1.25rem" }}></i>
              </Link>
              <Link
                href="tel:+61402880242"
                sx={{
                  color: "var(--theme-text-muted)",
                  transition: "all 0.2s ease",
                  "&:hover": { color: "#00d4ff", transform: "translateY(-2px)" },
                  display: "inline-block",
                }}
              >
                <i className="fi fi-rr-phone-call" style={{ fontSize: "1.25rem" }}></i>
              </Link>
              <Link
                href="https://www.facebook.com/marketplace/profile/100015456158533/?ref=permalink&mibextid=6ojiHh"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  color: "var(--theme-text-muted)",
                  transition: "all 0.2s ease",
                  "&:hover": { color: "#00d4ff", transform: "translateY(-2px)" },
                  display: "inline-block",
                }}
              >
                <i className="fi fi-brands-facebook" style={{ fontSize: "1.25rem" }}></i>
              </Link>
            </Box>
          </Box>

          {/* Column 2: Quick Links */}
          <Box>
            <Typography
              sx={{
                fontWeight: 700,
                mb: 3,
                fontSize: "0.75rem",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                color: "var(--theme-text-primary)",
              }}
            >
              Quick Links
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {[
                { label: "Home", href: "#home", type: "scroll" },
                { label: "Bikes", href: "#bikes", type: "scroll" },
                { label: "Reviews", href: "#testimonials", type: "scroll" },
                { label: "Find Your Size", href: "/bike-sizing", type: "link" },
              ].map((item) => (
                <Link
                  key={item.label}
                  {...(item.type === "scroll" ? { component: "button", onClick: () => handleNavClick(item.href) } : { href: item.href })}
                  sx={{
                    color: "var(--theme-text-muted)",
                    textDecoration: "none",
                    textAlign: "left",
                    fontSize: "0.875rem",
                    transition: "all 0.2s ease",
                    display: "flex",
                    alignItems: "center",
                    gap: 1.5,
                    "&:hover": {
                      color: "#00d4ff",
                      paddingLeft: "8px",
                    },
                  }}
                >
                  <Box sx={{ width: "4px", height: "4px", backgroundColor: "#00d4ff", opacity: 0.5 }} />
                  {item.label}
                </Link>
              ))}
            </Box>
          </Box>

          {/* Column 3: Services */}
          <Box>
            <Typography
              sx={{
                fontWeight: 700,
                mb: 3,
                fontSize: "0.75rem",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                color: "var(--theme-text-primary)",
              }}
            >
              Services
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {[
                { label: "Bike Service", href: "#services", type: "scroll" },
                { label: "Sell Your Bike", href: "/sell-bike", type: "link" },
                { label: "Brands", href: "#brands", type: "scroll" },
                { label: "Contact Us", href: "#contact", type: "scroll" },
              ].map((item) => (
                <Link
                  key={item.label}
                  {...(item.type === "scroll" ? { component: "button", onClick: () => handleNavClick(item.href) } : { href: item.href })}
                  sx={{
                    color: "var(--theme-text-muted)",
                    textDecoration: "none",
                    textAlign: "left",
                    fontSize: "0.875rem",
                    transition: "all 0.2s ease",
                    display: "flex",
                    alignItems: "center",
                    gap: 1.5,
                    "&:hover": {
                      color: "#00d4ff",
                      paddingLeft: "8px",
                    },
                  }}
                >
                  <Box sx={{ width: "4px", height: "4px", backgroundColor: "#00d4ff", opacity: 0.5 }} />
                  {item.label}
                </Link>
              ))}
            </Box>
          </Box>

          {/* Column 4: Contact Info */}
          <Box>
            <Typography
              sx={{
                fontWeight: 700,
                mb: 3,
                fontSize: "0.75rem",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                color: "var(--theme-text-primary)",
              }}
            >
              Contact
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Typography
                sx={{
                  color: "var(--theme-text-muted)",
                  fontSize: "0.875rem",
                  lineHeight: 1.6,
                }}
              >
                167/171 Bronte Rd
                <br />
                Queens Park NSW 2022
              </Typography>
              <Link
                href="tel:+61402880242"
                sx={{
                  color: "var(--theme-text-muted)",
                  textDecoration: "none",
                  fontSize: "0.875rem",
                  transition: "color 0.2s ease",
                  "&:hover": {
                    color: "#00d4ff",
                  },
                }}
              >
                0402 880 242
              </Link>
              <Link
                href="mailto:bicyclerepairs2u@gmail.com"
                sx={{
                  color: "var(--theme-text-muted)",
                  textDecoration: "none",
                  fontSize: "0.875rem",
                  transition: "color 0.2s ease",
                  "&:hover": {
                    color: "#00d4ff",
                  },
                }}
              >
                bicyclerepairs2u@gmail.com
              </Link>
              <Box
                sx={{
                  mt: 2,
                  p: 2,
                  backgroundColor: "rgba(0, 212, 255, 0.08)",
                  border: "1px solid rgba(0, 212, 255, 0.2)",
                }}
              >
                <Typography
                  sx={{
                    color: "#00d4ff",
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  <i className="fi fi-rr-info" style={{ fontSize: "0.875rem" }}></i>
                  Road bikes only - No e-bikes
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>

        <Divider sx={{ borderColor: "var(--theme-border)", mb: 4 }} />

        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "space-between",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Typography
            sx={{
              color: "var(--theme-text-muted)",
              fontSize: "0.75rem",
              letterSpacing: "0.05em",
            }}
          >
            © {new Date().getFullYear()} Bicycles2U. All rights reserved.
          </Typography>
          <Typography
            sx={{
              color: "var(--theme-text-muted)",
              fontSize: "0.75rem",
              letterSpacing: "0.05em",
              display: "flex",
              alignItems: "center",
              gap: 2,
            }}
          >
            <Box component="span" sx={{ color: "#00d4ff" }}>Road Bike Specialists</Box>
            <Box component="span">•</Box>
            Queens Park, Sydney
          </Typography>
        </Box>
      </Container>
    </Box>
  )
}
