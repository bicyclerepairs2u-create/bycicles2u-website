"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  AppBar,
  Toolbar,
  Typography,
  Menu,
  MenuItem,
  Box,
  Container,
  Badge,
} from "@mui/material"
import { useCart } from "@/components/providers/cart-provider"
import { ThemeToggle } from "@/components/theme-toggle"

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
  { label: "Style Preview", href: "/styles", type: "page" },
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
        backgroundColor: "var(--theme-nav-bg)",
        backdropFilter: "blur(10px)",
        boxShadow: "0 2px 20px rgba(0, 0, 0, 0.1)",
        borderBottom: "1px solid var(--theme-nav-border)",
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
                fontWeight: 900,
                color: "var(--theme-text-primary)",
                textDecoration: "none",
                fontSize: { xs: "1.25rem", md: "1.5rem" },
                letterSpacing: "-0.02em",
                textTransform: "uppercase",
                transition: "color 0.2s ease",
                "&:hover": {
                  color: "#ff1744",
                },
              }}
            >
              Bicycles2U
            </Typography>
          </Box>

          {/* Navigation Buttons */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Cart Button */}
            <Box
              component="button"
              aria-label="open cart"
              onClick={openCart}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 40,
                height: 40,
                color: "var(--theme-text-secondary)",
                backgroundColor: "transparent",
                border: "1px solid transparent",
                cursor: "pointer",
                transition: "all 0.2s ease",
                "&:hover": {
                  backgroundColor: "rgba(255, 23, 68, 0.1)",
                  borderColor: "rgba(255, 23, 68, 0.3)",
                  color: "#ff1744",
                },
              }}
            >
              <Badge
                badgeContent={cart?.totalQuantity || 0}
                color="primary"
                sx={{
                  "& .MuiBadge-badge": {
                    backgroundColor: "#ff1744",
                    color: "#000",
                    fontWeight: 700,
                    fontSize: "0.7rem",
                    minWidth: 18,
                    height: 18,
                  },
                }}
              >
                <i className="fi fi-rr-shopping-cart" style={{ fontSize: "1.25rem", display: "flex" }}></i>
              </Badge>
            </Box>

            {/* Hamburger Menu Button */}
            <Box
              component="button"
              aria-label="open menu"
              aria-controls={open ? "navigation-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleMenuOpen}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 40,
                height: 40,
                color: "var(--theme-text-secondary)",
                backgroundColor: "transparent",
                border: "1px solid transparent",
                cursor: "pointer",
                transition: "all 0.2s ease",
                "&:hover": {
                  backgroundColor: "rgba(255, 23, 68, 0.1)",
                  borderColor: "rgba(255, 23, 68, 0.3)",
                  color: "#ff1744",
                },
              }}
            >
              <i className="fi fi-rr-menu-burger" style={{ fontSize: "1.5rem", display: "flex" }}></i>
            </Box>
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
                minWidth: 220,
                mt: 1,
                backgroundColor: "var(--theme-bg-card)",
                border: "1px solid var(--theme-border)",
                boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
              },
            }}
          >
            {navItems.map((item, index) => (
              <MenuItem
                key={item.label}
                onClick={() => handleNavClick(item.href, item.type)}
                sx={{
                  py: 1.5,
                  px: 3,
                  fontWeight: 600,
                  fontSize: "0.875rem",
                  color: "var(--theme-text-secondary)",
                  borderLeft: "2px solid transparent",
                  transition: "all 0.2s ease",
                  animation: `fadeIn 0.3s ease ${index * 0.05}s forwards`,
                  opacity: 0,
                  "@keyframes fadeIn": {
                    "0%": { opacity: 0, transform: "translateX(-10px)" },
                    "100%": { opacity: 1, transform: "translateX(0)" },
                  },
                  "&:hover": {
                    color: "#ff1744",
                    backgroundColor: "rgba(255, 23, 68, 0.08)",
                    borderLeftColor: "#ff1744",
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
