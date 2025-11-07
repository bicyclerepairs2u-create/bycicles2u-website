"use client"

import { useState } from "react"
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
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
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const handleNavClick = (href: string) => {
    handleMenuClose()
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
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

          {/* Hamburger Menu Button */}
          <IconButton
            color="inherit"
            aria-label="open menu"
            aria-controls={open ? "navigation-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleMenuOpen}
            sx={{ color: "#424242" }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" fill="currentColor" />
            </svg>
          </IconButton>

          {/* Dropdown Menu */}
          <Menu
            id="navigation-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleMenuClose}
            MenuListProps={{
              "aria-labelledby": "navigation-button",
            }}
            sx={{
              "& .MuiPaper-root": {
                minWidth: 200,
                mt: 1,
                boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
              },
            }}
          >
            {navItems.map((item) => (
              <MenuItem
                key={item.label}
                onClick={() => handleNavClick(item.href)}
                sx={{
                  py: 1.5,
                  px: 3,
                  fontWeight: 500,
                  color: "#424242",
                  "&:hover": {
                    color: "#0288d1",
                    backgroundColor: "rgba(2, 136, 209, 0.08)",
                  },
                }}
              >
                {item.label}
              </MenuItem>
            ))}
          </Menu>
        </Toolbar>
      </Container>
    </AppBar>
  )
}
