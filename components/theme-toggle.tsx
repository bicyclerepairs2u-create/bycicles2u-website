"use client"

import * as React from "react"
import { useTheme } from "next-themes"
import { Box } from "@mui/material"
import { Sun, Moon } from "lucide-react"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  // Avoid hydration mismatch
  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: 40,
          height: 40,
        }}
      />
    )
  }

  return (
    <Box
      component="button"
      aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
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
          backgroundColor: "rgba(0, 212, 255, 0.1)",
          borderColor: "rgba(0, 212, 255, 0.3)",
          color: "#00d4ff",
        },
      }}
    >
      {theme === "dark" ? (
        <Sun style={{ width: 20, height: 20 }} />
      ) : (
        <Moon style={{ width: 20, height: 20 }} />
      )}
    </Box>
  )
}
