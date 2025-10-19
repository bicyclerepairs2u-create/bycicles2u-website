"use client"

import { useState } from "react"
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Box,
  Container,
} from "@mui/material"

const navItems = [
  { label: "Home", href: "#home" },
  { label: "About Sam", href: "#about-sam" },
  { label: "Our Story", href: "#our-story" },
  { label: "Bikes", href: "#bikes" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Brands", href: "#brands" },
  { label: "Services & Pricing", href: "#services" },
  { label: "Contact", href: "#contact" },
]

export default function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const handleNavClick = (href: string) => {
    setMobileOpen(false)
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(10px)",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)",
        }}
      >
        <Container maxWidth="lg">
          <Toolbar sx={{ justifyContent: "space-between", py: 1 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Box sx={{ fontSize: "2rem", display: "flex", alignItems: "center" }}>🚴</Box>
              <Typography
                variant="h6"
                component="a"
                href="#home"
                onClick={(e) => {
                  e.preventDefault()
                  handleNavClick("#home")
                }}
                sx={{
                  fontWeight: 700,
                  color: "#212121",
                  textDecoration: "none",
                  fontSize: { xs: "1.25rem", md: "1.5rem" },
                  letterSpacing: "-0.5px",
                }}
              >
                Bicycles2U
              </Typography>
            </Box>

            {/* Desktop Navigation */}
            <Box sx={{ display: { xs: "none", md: "flex" }, gap: 1 }}>
              {navItems.map((item) => (
                <Button
                  key={item.label}
                  onClick={() => handleNavClick(item.href)}
                  sx={{
                    color: "#424242",
                    fontWeight: 500,
                    fontSize: "0.9rem",
                    textTransform: "none",
                    px: 2,
                    "&:hover": {
                      color: "#0288d1",
                      backgroundColor: "rgba(2, 136, 209, 0.08)",
                    },
                  }}
                >
                  {item.label}
                </Button>
              ))}
            </Box>

            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="end"
              onClick={handleDrawerToggle}
              sx={{ display: { md: "none" }, color: "#424242" }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" fill="currentColor" />
              </svg>
            </IconButton>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": {
            width: 280,
            backgroundColor: "#ffffff",
          },
        }}
      >
        <Box sx={{ p: 2, display: "flex", justifyContent: "flex-end" }}>
          <IconButton onClick={handleDrawerToggle}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
                fill="currentColor"
              />
            </svg>
          </IconButton>
        </Box>
        <List>
          {navItems.map((item) => (
            <ListItem key={item.label} disablePadding>
              <ListItemButton
                onClick={() => handleNavClick(item.href)}
                sx={{
                  py: 2,
                  "&:hover": {
                    backgroundColor: "rgba(2, 136, 209, 0.08)",
                  },
                }}
              >
                <ListItemText
                  primary={item.label}
                  sx={{
                    "& .MuiTypography-root": {
                      fontWeight: 500,
                      color: "#424242",
                    },
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  )
}
