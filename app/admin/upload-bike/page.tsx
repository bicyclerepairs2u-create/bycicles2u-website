"use client"

import { useRouter } from "next/navigation"
import { Box, Container, Typography, Button, IconButton } from "@mui/material"
import { LogOut, ArrowLeft } from "lucide-react"
import Link from "next/link"
import BikeUploadForm from "@/components/admin/bike-upload-form"

export default function UploadBikePage() {
  const router = useRouter()

  const handleLogout = async () => {
    await fetch("/api/admin/auth", { method: "DELETE" })
    router.push("/admin/login")
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "var(--theme-bg-primary)",
      }}
    >
      {/* Header */}
      <Box
        sx={{
          backgroundColor: "var(--theme-bg-secondary)",
          borderBottom: "1px solid var(--theme-border)",
          position: "sticky",
          top: 0,
          zIndex: 100,
        }}
      >
        <Container maxWidth="xl">
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              py: 2,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Link href="/">
                <IconButton
                  sx={{
                    color: "var(--theme-text-muted)",
                    "&:hover": { color: "#ff1744" },
                  }}
                >
                  <ArrowLeft size={20} />
                </IconButton>
              </Link>
              <Box>
                <Typography
                  sx={{
                    fontSize: "0.625rem",
                    fontWeight: 600,
                    letterSpacing: "0.3em",
                    textTransform: "uppercase",
                    color: "#ff1744",
                  }}
                >
                  Admin Panel
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 700,
                    color: "var(--theme-text-primary)",
                    letterSpacing: "-0.02em",
                  }}
                >
                  Upload New Bike
                </Typography>
              </Box>
            </Box>

            <Button
              onClick={handleLogout}
              startIcon={<LogOut size={16} />}
              sx={{
                color: "var(--theme-text-muted)",
                textTransform: "none",
                "&:hover": { color: "#ff1744" },
              }}
            >
              Logout
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Main Content */}
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <BikeUploadForm />
      </Container>
    </Box>
  )
}
