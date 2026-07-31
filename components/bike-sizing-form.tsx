"use client"

import { useState } from "react"
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Stack,
  Alert,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  ToggleButton,
  ToggleButtonGroup,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material"
import Link from "next/link"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { SIZE_DEFINITIONS, getSizeFromFrame, type SizeCategory, type SizeDefinition } from "@/lib/bike-sizes"

export default function BikeSizingForm() {
  const [unit, setUnit] = useState<"cm" | "inches">("cm")
  const [formData, setFormData] = useState({
    height: "",
    heightFeet: "",
    heightInches: "",
    inseam: "",
    inseamFeet: "",
    inseamInches: "",
    armLength: "",
    torsoLength: "",
  })
  const [result, setResult] = useState<{
    frameSize: number
    sizeRange: string
    sizeCategory: SizeCategory | null
    fitNotes: string
    estimatedFromHeight: boolean
  } | null>(null)

  const handleUnitChange = (_event: React.MouseEvent<HTMLElement>, newUnit: "cm" | "inches" | null) => {
    if (newUnit !== null) {
      // Convert existing values
      if (unit === "cm" && newUnit === "inches") {
        // Convert height cm to feet + inches
        const heightTotalIn = formData.height ? parseFloat(formData.height) / 2.54 : 0
        const hFeet = heightTotalIn ? Math.floor(heightTotalIn / 12) : 0
        const hInches = heightTotalIn ? Math.round(heightTotalIn % 12) : 0
        // Convert inseam cm to feet + inches
        const inseamTotalIn = formData.inseam ? parseFloat(formData.inseam) / 2.54 : 0
        const iFeet = inseamTotalIn ? Math.floor(inseamTotalIn / 12) : 0
        const iInches = inseamTotalIn ? Math.round(inseamTotalIn % 12) : 0
        setFormData({
          height: "",
          heightFeet: heightTotalIn ? String(hFeet) : "",
          heightInches: heightTotalIn ? String(hInches) : "",
          inseam: "",
          inseamFeet: inseamTotalIn ? String(iFeet) : "",
          inseamInches: inseamTotalIn ? String(iInches) : "",
          armLength: formData.armLength ? (parseFloat(formData.armLength) / 2.54).toFixed(1) : "",
          torsoLength: formData.torsoLength ? (parseFloat(formData.torsoLength) / 2.54).toFixed(1) : "",
        })
      } else if (unit === "inches" && newUnit === "cm") {
        // Convert feet + inches to cm
        const heightTotalIn = (formData.heightFeet ? parseFloat(formData.heightFeet) * 12 : 0) + (formData.heightInches ? parseFloat(formData.heightInches) : 0)
        const inseamTotalIn = (formData.inseamFeet ? parseFloat(formData.inseamFeet) * 12 : 0) + (formData.inseamInches ? parseFloat(formData.inseamInches) : 0)
        setFormData({
          height: heightTotalIn ? (heightTotalIn * 2.54).toFixed(1) : "",
          heightFeet: "",
          heightInches: "",
          inseam: inseamTotalIn ? (inseamTotalIn * 2.54).toFixed(1) : "",
          inseamFeet: "",
          inseamInches: "",
          armLength: formData.armLength ? (parseFloat(formData.armLength) * 2.54).toFixed(1) : "",
          torsoLength: formData.torsoLength ? (parseFloat(formData.torsoLength) * 2.54).toFixed(1) : "",
        })
      }
      setUnit(newUnit)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
    setResult(null) // Clear result when form changes
  }

  const hasHeight = unit === "cm" ? !!formData.height : !!(formData.heightFeet || formData.heightInches)

  const calculateSize = () => {
    if (!hasHeight) {
      return
    }

    let heightCm: number
    if (unit === "cm") {
      heightCm = parseFloat(formData.height)
    } else {
      const totalInches = (formData.heightFeet ? parseFloat(formData.heightFeet) * 12 : 0) + (formData.heightInches ? parseFloat(formData.heightInches) : 0)
      heightCm = totalInches * 2.54
    }
    const hasInseam = unit === "cm" ? !!formData.inseam : !!(formData.inseamFeet || formData.inseamInches)
    let inseamCm: number | null = null
    if (hasInseam) {
      if (unit === "cm") {
        inseamCm = parseFloat(formData.inseam)
      } else {
        const totalInseamInches = (formData.inseamFeet ? parseFloat(formData.inseamFeet) * 12 : 0) + (formData.inseamInches ? parseFloat(formData.inseamInches) : 0)
        inseamCm = totalInseamInches * 2.54
      }
    }

    let calculatedSize: number;
    let sizeMatch: SizeDefinition | null;

    if (inseamCm) {
      // If inseam provided: use the precise formula (inseam × 0.665)
      calculatedSize = inseamCm * 0.665;
      sizeMatch = getSizeFromFrame(calculatedSize);
    } else {
      // If only height: estimate using height-based lookup
      sizeMatch = SIZE_DEFINITIONS.find((s) => {
        const [minHeightStr, maxHeightStr] = s.heightRange.split('-').map(str => str.replace(/[^0-9.]/g, ''));
        const minHeight = parseFloat(minHeightStr);
        const maxHeight = maxHeightStr ? parseFloat(maxHeightStr) : Infinity;

        if (s.heightRange.startsWith('<')) {
          return heightCm < minHeight;
        } else if (s.heightRange.endsWith('+')) {
          return heightCm >= minHeight;
        } else {
          return heightCm >= minHeight && heightCm <= maxHeight;
        }
      }) ?? null;
      calculatedSize = sizeMatch ? sizeMatch.typicalFrame : 0; // Representative frame size for this category
    }

    let sizeRange = ""
    let sizeCategory: SizeCategory | null = null
    let fitNotes = ""

    if (sizeMatch) {
      sizeRange = `${sizeMatch.frameSizeRange} cm (${sizeMatch.category})`
      sizeCategory = sizeMatch.category
      fitNotes = sizeMatch.fitNotes
    }

    // Additional fit notes based on height vs inseam ratio (only when inseam provided)
    if (inseamCm) {
      const ratio = heightCm / inseamCm
      if (ratio > 2.2) {
        fitNotes += " You have a longer torso relative to your legs - consider a bike with a slightly longer reach or top tube."
      } else if (ratio < 2.0) {
        fitNotes += " You have longer legs relative to your torso - consider a bike with a slightly shorter reach or top tube."
      }
    }

    setResult({
      frameSize: Math.round(calculatedSize),
      sizeRange,
      sizeCategory,
      fitNotes,
      estimatedFromHeight: !hasInseam,
    })

    // Scroll to results
    setTimeout(() => {
      document.getElementById("results")?.scrollIntoView({ behavior: "smooth" })
    }, 100)
  }

  const sizeChart = SIZE_DEFINITIONS
    .filter((s) => s.category !== "XXS")
    .map((s) => ({
      height: s.heightRange,
      inseam: s.inseamRange,
      frameSize: s.frameSizeRange,
      size: s.category,
    }))

  // Theme-aware input styles
  const darkInputStyles = {
    "& .MuiOutlinedInput-root": {
      backgroundColor: "var(--theme-bg-secondary)",
      color: "var(--theme-text-secondary)",
      "& fieldset": {
        borderColor: "var(--theme-border)",
      },
      "&:hover fieldset": {
        borderColor: "#00d4ff",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#00d4ff",
      },
    },
    "& .MuiInputLabel-root": {
      color: "var(--theme-text-muted)",
      "&.Mui-focused": {
        color: "#00d4ff",
      },
    },
    "& .MuiFormHelperText-root": {
      color: "var(--theme-text-muted)",
    },
  }

  return (
    <>
      <Navigation />
      <Box
        sx={{
          minHeight: "100vh",
          backgroundColor: "var(--theme-bg-primary)",
          pt: { xs: 12, md: 14 },
          pb: 10,
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background Pattern */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            right: 0,
            width: "40%",
            height: "100%",
            backgroundImage: `repeating-linear-gradient(
              -45deg,
              #00d4ff,
              #00d4ff 1px,
              transparent 1px,
              transparent 50px
            )`,
            opacity: 0.03,
            zIndex: 0,
          }}
        />

        <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
          {/* Header */}
          <Box sx={{ mb: 6, textAlign: "center" }}>
            <Typography
              sx={{
                fontSize: "0.625rem",
                fontWeight: 600,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "#00d4ff",
                mb: 2,
              }}
            >
              Bike Fit Calculator
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
              Find Your Size
            </Typography>
            <Typography
              sx={{
                fontSize: "1rem",
                color: "var(--theme-text-muted)",
                lineHeight: 1.7,
                maxWidth: "600px",
                mx: "auto",
              }}
            >
              Use our bike sizing calculator to determine the perfect frame size for your road or triathlon bike
            </Typography>
          </Box>

          <Box
            sx={{
              display: "grid",
              gap: 4,
              gridTemplateColumns: { xs: "1fr", lg: "1fr 1fr" },
            }}
          >
            {/* Form Section */}
            <Paper
              elevation={0}
              sx={{
                p: { xs: 3, md: 4 },
                borderRadius: 0,
                backgroundColor: "var(--theme-bg-secondary)",
                border: "1px solid var(--theme-border)",
                height: "fit-content",
                position: "relative",
                clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%)",
              }}
            >
              {/* Corner accent */}
              <Box sx={{ position: "absolute", top: 0, right: 0, width: "60px", height: "2px", backgroundColor: "#00d4ff" }} />
              <Box sx={{ position: "absolute", top: 0, right: 0, width: "2px", height: "40px", backgroundColor: "#00d4ff" }} />

              <Box sx={{ mb: 3, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 2 }}>
                <Typography sx={{ fontWeight: 700, color: "var(--theme-text-primary)", fontSize: "0.875rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                  Enter Your Measurements
                </Typography>
                <ToggleButtonGroup
                  value={unit}
                  exclusive
                  onChange={handleUnitChange}
                  size="small"
                  sx={{
                    "& .MuiToggleButton-root": {
                      textTransform: "uppercase",
                      fontWeight: 700,
                      px: 2,
                      py: 0.5,
                      fontSize: "0.75rem",
                      letterSpacing: "0.05em",
                      color: "var(--theme-text-muted)",
                      borderColor: "var(--theme-border)",
                      borderRadius: 0,
                    },
                    "& .Mui-selected": {
                      backgroundColor: "#00d4ff !important",
                      color: "#000000 !important",
                      borderColor: "#00d4ff !important",
                    },
                  }}
                >
                  <ToggleButton value="cm">CM</ToggleButton>
                  <ToggleButton value="inches">FT/IN</ToggleButton>
                </ToggleButtonGroup>
              </Box>

              <Stack spacing={3}>
                {unit === "cm" ? (
                  <TextField
                    fullWidth
                    label="Height (cm) *"
                    name="height"
                    type="number"
                    value={formData.height}
                    onChange={handleChange}
                    required
                    variant="outlined"
                    inputProps={{ step: "0.1", min: "0" }}
                    sx={darkInputStyles}
                  />
                ) : (
                  <Box sx={{ border: "1px solid var(--theme-border)", p: 2, pt: 1 }}>
                    <Typography sx={{ fontSize: "0.75rem", color: "var(--theme-text-muted)", mb: 1.5, textTransform: "uppercase", letterSpacing: "0.05em", fontWeight: 600 }}>
                      Height *
                    </Typography>
                    <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                      <TextField
                        label="ft"
                        name="heightFeet"
                        type="number"
                        value={formData.heightFeet}
                        onChange={handleChange}
                        variant="outlined"
                        inputProps={{ step: "1", min: "0", max: "8" }}
                        sx={{ ...darkInputStyles, flex: 1 }}
                      />
                      <TextField
                        label="in"
                        name="heightInches"
                        type="number"
                        value={formData.heightInches}
                        onChange={handleChange}
                        variant="outlined"
                        inputProps={{ step: "1", min: "0", max: "11" }}
                        sx={{ ...darkInputStyles, flex: 1 }}
                      />
                    </Box>
                  </Box>
                )}

                {unit === "cm" ? (
                  <TextField
                    fullWidth
                    label="Inseam / Inner Leg Length (cm) — Strongly Recommended"
                    name="inseam"
                    type="number"
                    value={formData.inseam}
                    onChange={handleChange}
                    variant="outlined"
                    inputProps={{ step: "0.1", min: "0" }}
                    helperText="Measure from your crotch to the floor while standing barefoot. Providing inseam gives a much more accurate result."
                    sx={darkInputStyles}
                  />
                ) : (
                  <Box sx={{ border: "1px solid var(--theme-border)", p: 2, pt: 1 }}>
                    <Typography sx={{ fontSize: "0.75rem", color: "var(--theme-text-muted)", mb: 0.5, textTransform: "uppercase", letterSpacing: "0.05em", fontWeight: 600 }}>
                      Inseam / Inner Leg Length — Strongly Recommended
                    </Typography>
                    <Typography sx={{ fontSize: "0.75rem", color: "var(--theme-text-muted)", mb: 1.5 }}>
                      Measure from your crotch to the floor while standing barefoot. Providing inseam gives a much more accurate result.
                    </Typography>
                    <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                      <TextField
                        label="ft"
                        name="inseamFeet"
                        type="number"
                        value={formData.inseamFeet}
                        onChange={handleChange}
                        variant="outlined"
                        inputProps={{ step: "1", min: "0", max: "4" }}
                        sx={{ ...darkInputStyles, flex: 1 }}
                      />
                      <TextField
                        label="in"
                        name="inseamInches"
                        type="number"
                        value={formData.inseamInches}
                        onChange={handleChange}
                        variant="outlined"
                        inputProps={{ step: "1", min: "0", max: "11" }}
                        sx={{ ...darkInputStyles, flex: 1 }}
                      />
                    </Box>
                  </Box>
                )}

                <TextField
                  fullWidth
                  label={`Arm Length (${unit === "cm" ? "cm" : "in"})`}
                  name="armLength"
                  type="number"
                  value={formData.armLength}
                  onChange={handleChange}
                  variant="outlined"
                  inputProps={{ step: "0.1", min: "0" }}
                  helperText="From shoulder to wrist (optional)"
                  sx={darkInputStyles}
                />

                <TextField
                  fullWidth
                  label={`Torso Length (${unit === "cm" ? "cm" : "in"})`}
                  name="torsoLength"
                  type="number"
                  value={formData.torsoLength}
                  onChange={handleChange}
                  variant="outlined"
                  inputProps={{ step: "0.1", min: "0" }}
                  helperText="From hip to shoulder (optional)"
                  sx={darkInputStyles}
                />

                <Button
                  variant="contained"
                  size="large"
                  fullWidth
                  onClick={calculateSize}
                  disabled={!hasHeight}
                  sx={{
                    backgroundColor: "#00d4ff",
                    color: "#000000",
                    fontWeight: 700,
                    fontSize: "0.875rem",
                    py: 1.5,
                    mt: 2,
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    borderRadius: 0,
                    boxShadow: "0 4px 20px rgba(0, 212, 255, 0.3)",
                    "&:hover": {
                      backgroundColor: "#0099cc",
                      boxShadow: "0 6px 30px rgba(0, 212, 255, 0.4)",
                    },
                    "&:disabled": {
                      backgroundColor: "var(--theme-border-hover)",
                      color: "var(--theme-text-muted)",
                    },
                    transition: "all 0.3s ease",
                  }}
                >
                  Calculate My Size
                </Button>
              </Stack>

              {/* How to Measure */}
              <Box sx={{ mt: 4 }}>
                <Accordion
                  elevation={0}
                  sx={{
                    backgroundColor: "var(--theme-bg-primary)",
                    border: "1px solid var(--theme-border)",
                    borderRadius: "0 !important",
                    "&:before": { display: "none" },
                  }}
                >
                  <AccordionSummary
                    expandIcon={<i className="fi fi-rr-angle-down" style={{ fontSize: "1rem", color: "var(--theme-text-muted)" }}></i>}
                    sx={{
                      "& .MuiAccordionSummary-content": {
                        display: "flex",
                        alignItems: "center",
                        gap: 1.5,
                      },
                    }}
                  >
                    <i className="fi fi-rr-info" style={{ color: "#00d4ff", fontSize: "1rem" }}></i>
                    <Typography sx={{ fontWeight: 700, color: "var(--theme-text-primary)", fontSize: "0.875rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>How to Measure</Typography>
                  </AccordionSummary>
                  <AccordionDetails sx={{ borderTop: "1px solid var(--theme-border)" }}>
                    <Stack spacing={3}>
                      {[
                        { title: "Height:", desc: "Stand barefoot against a wall. Mark the top of your head and measure from the floor to the mark." },
                        { title: "Inseam (Most Important):", desc: "Stand barefoot with your back against a wall. Place a book between your legs (spine up) and pull it up snugly. Measure from the top of the book spine to the floor." },
                        { title: "Arm Length:", desc: "Measure from the bony point at the top of your shoulder to the wrist bone." },
                        { title: "Torso Length:", desc: "Measure from the top of your hip bone to the bony point at the top of your shoulder." },
                      ].map((item) => (
                        <Box key={item.title}>
                          <Typography sx={{ fontWeight: 700, color: "var(--theme-text-secondary)", mb: 0.5, fontSize: "0.875rem" }}>
                            {item.title}
                          </Typography>
                          <Typography sx={{ color: "var(--theme-text-muted)", lineHeight: 1.6, fontSize: "0.875rem" }}>
                            {item.desc}
                          </Typography>
                        </Box>
                      ))}
                    </Stack>
                  </AccordionDetails>
                </Accordion>
              </Box>
            </Paper>

            {/* Results and Size Chart */}
            <Box>
              {/* Results */}
              {result && (
                <Paper
                  id="results"
                  elevation={0}
                  sx={{
                    p: { xs: 3, md: 4 },
                    borderRadius: 0,
                    backgroundColor: "rgba(0, 212, 255, 0.08)",
                    border: "2px solid #00d4ff",
                    mb: 4,
                  }}
                >
                  {result.estimatedFromHeight && (
                    <Alert
                      severity="warning"
                      icon={<i className="fi fi-rr-exclamation" style={{ fontSize: "1.25rem" }}></i>}
                      sx={{
                        mb: 3,
                        backgroundColor: "rgba(255, 167, 38, 0.1)",
                        border: "1px solid rgba(255, 167, 38, 0.4)",
                        borderRadius: 0,
                        "& .MuiAlert-icon": { color: "#ffa726" },
                      }}
                    >
                      <Typography sx={{ color: "var(--theme-text-secondary)", lineHeight: 1.7, fontSize: "0.875rem" }}>
                        This is an approximate estimate based on height only. For a much more accurate result, go back and enter your <strong>inseam measurement</strong>.
                      </Typography>
                    </Alert>
                  )}

                  <Box sx={{ textAlign: "center", mb: 3 }}>
                    <i
                      className="fi fi-rr-check-circle"
                      style={{ color: "#00d4ff", fontSize: "2.5rem", marginBottom: "16px", display: "block" }}
                    ></i>
                    <Typography sx={{ fontWeight: 700, color: "var(--theme-text-primary)", mb: 1, fontSize: "0.875rem", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                      {result.estimatedFromHeight ? "Estimated Frame Size" : "Your Recommended Frame Size"}
                    </Typography>
                    <Typography
                      sx={{
                        fontWeight: 900,
                        color: "#00d4ff",
                        fontSize: { xs: "3rem", md: "4rem" },
                        letterSpacing: "-0.02em",
                      }}
                    >
                      {result.frameSize} cm
                    </Typography>
                    <Typography sx={{ color: "var(--theme-text-muted)", mt: 1, fontSize: "1rem" }}>
                      ({result.sizeRange})
                    </Typography>
                  </Box>

                  <Divider sx={{ my: 3, borderColor: "rgba(0, 212, 255, 0.3)" }} />

                  <Alert
                    severity="info"
                    icon={<i className="fi fi-rr-bulb" style={{ fontSize: "1.25rem" }}></i>}
                    sx={{
                      backgroundColor: "rgba(0, 212, 255, 0.1)",
                      border: "1px solid rgba(0, 212, 255, 0.3)",
                      borderRadius: 0,
                      "& .MuiAlert-icon": {
                        color: "#00d4ff",
                      },
                    }}
                  >
                    <Typography sx={{ color: "var(--theme-text-secondary)", lineHeight: 1.7, fontSize: "0.875rem" }}>
                      {result.fitNotes}
                    </Typography>
                  </Alert>

                  <Box sx={{ mt: 3, textAlign: "center", display: "flex", flexDirection: { xs: "column", sm: "row" }, gap: 2, justifyContent: "center" }}>
                    {result.sizeCategory && (
                      <Button
                        component={Link}
                        href={`/shop?size=${result.sizeCategory.toLowerCase()}`}
                        variant="contained"
                        size="large"
                        sx={{
                          backgroundColor: "#00d4ff",
                          color: "#000000",
                          fontWeight: 700,
                          fontSize: "0.875rem",
                          px: 4,
                          py: 1.5,
                          textTransform: "uppercase",
                          letterSpacing: "0.05em",
                          borderRadius: 0,
                          textDecoration: "none",
                          "&:hover": {
                            backgroundColor: "#0099cc",
                          },
                        }}
                      >
                        Shop Bikes in Your Size
                      </Button>
                    )}
                    <Button
                      variant="outlined"
                      size="large"
                      href="#contact"
                      sx={{
                        borderColor: "#00d4ff",
                        color: "#00d4ff",
                        fontWeight: 700,
                        fontSize: "0.875rem",
                        px: 4,
                        py: 1.5,
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                        borderRadius: 0,
                        "&:hover": {
                          borderColor: "#0099cc",
                          color: "#0099cc",
                          backgroundColor: "rgba(0, 212, 255, 0.05)",
                        },
                      }}
                      onClick={(e) => {
                        e.preventDefault()
                        window.location.href = "/#contact"
                      }}
                    >
                      Contact Us About Your Fit
                    </Button>
                  </Box>
                </Paper>
              )}

              {/* Standard Size Chart */}
              <Paper
                elevation={0}
                sx={{
                  p: { xs: 2, md: 3 },
                  borderRadius: 0,
                  backgroundColor: "var(--theme-bg-secondary)",
                  border: "1px solid var(--theme-border)",
                }}
              >
                <Typography sx={{ fontWeight: 700, color: "var(--theme-text-primary)", mb: 3, display: "flex", alignItems: "center", gap: 1.5, fontSize: "0.875rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                  <i className="fi fi-rr-chart-histogram" style={{ color: "#00d4ff" }}></i>
                  Standard Road Bike Size Chart
                </Typography>

                <TableContainer>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        {["Height (cm)", "Inseam (cm)", "Frame Size (cm)", "Size"].map((header) => (
                          <TableCell key={header} sx={{ fontWeight: 700, backgroundColor: "var(--theme-bg-primary)", color: "var(--theme-text-secondary)", borderColor: "var(--theme-border)", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                            {header}
                          </TableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {sizeChart.map((row, index) => (
                        <TableRow
                          key={index}
                          sx={{
                            "&:nth-of-type(even)": {
                              backgroundColor: "var(--theme-bg-primary)",
                            },
                            "&:hover": {
                              backgroundColor: "rgba(0, 212, 255, 0.05)",
                            },
                          }}
                        >
                          <TableCell sx={{ color: "var(--theme-text-muted)", borderColor: "var(--theme-border)", fontSize: "0.875rem" }}>{row.height}</TableCell>
                          <TableCell sx={{ color: "var(--theme-text-muted)", borderColor: "var(--theme-border)", fontSize: "0.875rem" }}>{row.inseam}</TableCell>
                          <TableCell sx={{ fontWeight: 700, color: "#00d4ff", borderColor: "var(--theme-border)", fontSize: "0.875rem" }}>{row.frameSize}</TableCell>
                          <TableCell sx={{ color: "var(--theme-text-secondary)", borderColor: "var(--theme-border)", fontSize: "0.875rem" }}>{row.size}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>

                <Typography
                  sx={{
                    display: "block",
                    mt: 3,
                    fontStyle: "italic",
                    color: "var(--theme-text-muted)",
                    textAlign: "center",
                    fontSize: "0.75rem",
                  }}
                >
                  * This is a general guide. Frame geometry varies between brands and models.
                </Typography>
              </Paper>

              {/* Important Notes */}
              <Paper
                elevation={0}
              sx={{
                  p: 3,
                  borderRadius: 0,
                  backgroundColor: "rgba(0, 212, 255, 0.08)",
                  border: "1px solid rgba(0, 212, 255, 0.2)",
                  mt: 3,
                }}
              >
                <Typography sx={{ fontWeight: 700, color: "var(--theme-text-primary)", mb: 2, display: "flex", alignItems: "center", gap: 1.5, fontSize: "0.875rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                  <i className="fi fi-rr-exclamation" style={{ color: "#00d4ff" }}></i>
                  Important Notes
                </Typography>
                <Stack spacing={2}>
                  {[
                    "This calculator provides a starting point. Professional bike fitting is recommended for optimal comfort and performance.",
                    "Different bike geometries (race vs endurance) may require different sizes even with the same measurements.",
                    "If you're between sizes, consider your riding style: smaller for racing/aggressive, larger for comfort/endurance.",
                    "Contact us for personalized sizing advice based on the specific bike you're interested in.",
                  ].map((note, index) => (
                    <Box key={index} sx={{ display: "flex", alignItems: "flex-start", gap: 2 }}>
                      <Box sx={{ width: "4px", height: "4px", backgroundColor: "#00d4ff", mt: 1.5, flexShrink: 0 }} />
                      <Typography sx={{ color: "var(--theme-text-muted)", lineHeight: 1.6, fontSize: "0.875rem" }}>
                        {note}
                      </Typography>
                    </Box>
                  ))}
                </Stack>
              </Paper>
            </Box>
          </Box>
        </Container>
      </Box>
      <Footer />
    </>
  )
}