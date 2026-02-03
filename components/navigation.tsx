"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Box,
  Container,
  Badge,
} from "@mui/material"
import { useCart } from "@/components/providers/cart-provider"

const navItems = [
  { label: "Home", href: "#home", type: "section" },
  { label: "Shop", href: "/shop", type: "page" },
  { label: "Bikes", href: "#bikes", type: "section" },
  { label: "Testimonials", href: "#testimonials", type: "section" },
  { label: "Brands", href: "#brands", type: "section" },
  { label: "Services & Pricing", href: "#services", type: "section" },
  { label: "Find Your Size", href: "/bike-sizing", type: "page" },
  { label: "Sell Your Bike", href: "/sell-bike", type: "page" },
  { label: "Contact", href: "#contact", type: "section" },
]

export default function Navigation() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const router = useRouter()
  const { cart, openCart } = useCart()

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const handleNavClick = (href: string, type: string) => {
    handleMenuClose()

    if (type === "page") {
      // Navigate to a different page
      router.push(href)
    } else {
      // Check if we're on the home page
      if (window.location.pathname === "/") {
        // Scroll to section on current page
        const element = document.querySelector(href)
        if (element) {
          element.scrollIntoView({ behavior: "smooth" })
        }
      } else {
        // Navigate to home page with hash
        window.location.href = `/${href}`
      }
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
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <Box
              component="a"
              href="/"
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <Box
                component="img"
                src="/b2u-logo.svg"
                alt="Bicycles2U Logo"
                sx={{
                  height: { xs: "30px", md: "40px" },
                  width: "auto",
                  objectFit: "contain",
                }}
              />
            </Box>
            <Typography
              variant="h6"
              component="a"
              href="/"
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

          {/* Navigation Buttons */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            {/* Cart Button */}
            <IconButton
              color="inherit"
              aria-label="open cart"
              onClick={openCart}
              sx={{
                color: "#424242",
                transition: "color 0.2s ease, transform 0.2s ease",
                "&:hover": {
                  backgroundColor: "transparent",
                  color: "#0288d1",
                  transform: "scale(1.1)",
                },
              }}
            >
              <Badge
                badgeContent={cart?.totalQuantity || 0}
                color="primary"
                sx={{
                  "& .MuiBadge-badge": {
                    backgroundColor: "#0288d1",
                    color: "#fff",
                  },
                }}
              >
                <i className="fi fi-rr-shopping-cart" style={{ fontSize: "1.25rem" }}></i>
              </Badge>
            </IconButton>

            {/* Hamburger Menu Button */}
            <IconButton
              color="inherit"
              aria-label="open menu"
              aria-controls={open ? "navigation-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleMenuOpen}
              sx={{
                color: "#424242",
                transition: "color 0.2s ease, transform 0.2s ease",
                "&:hover": {
                  backgroundColor: "transparent",
                  color: "#0288d1",
                  transform: "scale(1.1)",
                },
              }}
            >
              <i className="fi fi-rr-menu-burger" style={{ fontSize: "1.5rem" }}></i>
            </IconButton>
          </Box>

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
                onClick={() => handleNavClick(item.href, item.type)}
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
