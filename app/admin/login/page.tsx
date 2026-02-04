"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  Box,
  Container,
  TextField,
  Button,
  Typography,
  Alert,
  Paper,
  CircularProgress,
} from "@mui/material"

export default function AdminLoginPage() {
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const inputStyles = {
    "& .MuiOutlinedInput-root": {
      backgroundColor: "var(--theme-bg-primary)",
      borderRadius: 0,
      "& fieldset": {
        borderColor: "var(--theme-border)",
      },
      "&:hover fieldset": {
        borderColor: "#ff1744",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#ff1744",
      },
    },
    "& .MuiOutlinedInput-input": {
      color: "var(--theme-text-primary)",
      "&::placeholder": {
        color: "var(--theme-text-muted)",
        opacity: 1,
      },
    },
    "& .MuiInputLabel-root": {
      color: "var(--theme-text-muted)",
      "&.Mui-focused": {
        color: "#ff1744",
      },
    },
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const response = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      })

      if (response.ok) {
        router.push("/admin/upload-bike")
      } else {
        const data = await response.json()
        setError(data.error || "Invalid password")
      }
    } catch {
      setError("Authentication failed. Please try again.")
    }

    setLoading(false)
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "var(--theme-bg-primary)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Container maxWidth="xs">
        <Paper
          elevation={0}
          sx={{
            p: 4,
            position: "relative",
            backgroundColor: "var(--theme-bg-secondary)",
            border: "1px solid var(--theme-border)",
            borderRadius: 0,
          }}
        >
          {/* Corner Accent */}
          <Box
            sx={{
              position: "absolute",
              top: 0,
              right: 0,
              width: "60px",
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
              height: "40px",
              backgroundColor: "#ff1744",
            }}
          />

          <Box sx={{ textAlign: "center", mb: 4 }}>
            <Typography
              sx={{
                fontSize: "0.625rem",
                fontWeight: 600,
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                color: "#ff1744",
                mb: 1,
              }}
            >
              Bicycles2U
            </Typography>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
                color: "var(--theme-text-primary)",
                letterSpacing: "-0.02em",
              }}
            >
              Admin Access
            </Typography>
          </Box>

          {error && (
            <Alert
              severity="error"
              sx={{
                mb: 3,
                borderRadius: 0,
                backgroundColor: "rgba(244, 67, 54, 0.1)",
                border: "1px solid #f44336",
                color: "#f44336",
              }}
            >
              {error}
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              type="password"
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              sx={{ ...inputStyles, mb: 3 }}
              autoFocus
              InputLabelProps={{
                shrink: password.length > 0 || undefined,
              }}
            />
            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={loading || !password}
              sx={{
                backgroundColor: "#ff1744",
                color: "#000000",
                fontWeight: 700,
                fontSize: "0.875rem",
                py: 1.5,
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                borderRadius: 0,
                boxShadow: "0 4px 20px rgba(255, 23, 68, 0.3)",
                "&:hover": {
                  backgroundColor: "#d50032",
                  boxShadow: "0 6px 30px rgba(255, 23, 68, 0.4)",
                },
                "&.Mui-disabled": {
                  backgroundColor: "rgba(255, 23, 68, 0.5)",
                  color: "#000000",
                },
              }}
            >
              {loading ? (
                <CircularProgress size={20} sx={{ color: "#000" }} />
              ) : (
                "Login"
              )}
            </Button>
          </form>
        </Paper>
      </Container>
    </Box>
  )
}
