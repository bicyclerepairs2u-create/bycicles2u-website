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
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"

export default function BikeSizingForm() {
  const [unit, setUnit] = useState<"cm" | "inches">("cm")
  const [formData, setFormData] = useState({
    height: "",
    inseam: "",
    armLength: "",
    torsoLength: "",
  })
  const [result, setResult] = useState<{
    frameSize: number
    sizeRange: string
    fitNotes: string
  } | null>(null)

  const handleUnitChange = (_event: React.MouseEvent<HTMLElement>, newUnit: "cm" | "inches" | null) => {
    if (newUnit !== null) {
      // Convert existing values
      if (unit === "cm" && newUnit === "inches") {
        setFormData({
          height: formData.height ? (parseFloat(formData.height) / 2.54).toFixed(1) : "",
          inseam: formData.inseam ? (parseFloat(formData.inseam) / 2.54).toFixed(1) : "",
          armLength: formData.armLength ? (parseFloat(formData.armLength) / 2.54).toFixed(1) : "",
          torsoLength: formData.torsoLength ? (parseFloat(formData.torsoLength) / 2.54).toFixed(1) : "",
        })
      } else if (unit === "inches" && newUnit === "cm") {
        setFormData({
          height: formData.height ? (parseFloat(formData.height) * 2.54).toFixed(1) : "",
          inseam: formData.inseam ? (parseFloat(formData.inseam) * 2.54).toFixed(1) : "",
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

  const calculateSize = () => {
    if (!formData.height || !formData.inseam) {
      return
    }

    // Convert to cm if needed
    const inseamCm = unit === "cm" ? parseFloat(formData.inseam) : parseFloat(formData.inseam) * 2.54
    const heightCm = unit === "cm" ? parseFloat(formData.height) : parseFloat(formData.height) * 2.54

    // Calculate road bike frame size using the standard formula
    const calculatedSize = inseamCm * 0.665

    // Determine size range
    let sizeRange = ""
    let fitNotes = ""

    if (calculatedSize < 50) {
      sizeRange = "47-49 cm (XXS)"
      fitNotes = "Extra extra small frame. Suitable for riders under 160 cm."
    } else if (calculatedSize < 52) {
      sizeRange = "50-51 cm (XS)"
      fitNotes = "Extra small frame. Suitable for riders 155-165 cm."
    } else if (calculatedSize < 54) {
      sizeRange = "52-53 cm (S)"
      fitNotes = "Small frame. Suitable for riders 162-170 cm."
    } else if (calculatedSize < 56) {
      sizeRange = "54-55 cm (M)"
      fitNotes = "Medium frame. Suitable for riders 170-178 cm."
    } else if (calculatedSize < 58) {
      sizeRange = "56-57 cm (L)"
      fitNotes = "Large frame. Suitable for riders 178-185 cm."
    } else if (calculatedSize < 60) {
      sizeRange = "58-59 cm (XL)"
      fitNotes = "Extra large frame. Suitable for riders 185-193 cm."
    } else {
      sizeRange = "60+ cm (XXL)"
      fitNotes = "Extra extra large frame. Suitable for riders 193+ cm."
    }

    // Additional fit notes based on height vs inseam ratio
    const ratio = heightCm / inseamCm
    if (ratio > 2.2) {
      fitNotes += " You have a longer torso relative to your legs - consider a bike with a slightly longer reach or top tube."
    } else if (ratio < 2.0) {
      fitNotes += " You have longer legs relative to your torso - consider a bike with a slightly shorter reach or top tube."
    }

    setResult({
      frameSize: Math.round(calculatedSize),
      sizeRange,
      fitNotes,
    })

    // Scroll to results
    setTimeout(() => {
      document.getElementById("results")?.scrollIntoView({ behavior: "smooth" })
    }, 100)
  }

  const sizeChart = [
    { height: "155-165", inseam: "72-78", frameSize: "48-52", size: "XS" },
    { height: "162-170", inseam: "77-81", frameSize: "52-53", size: "S" },
    { height: "170-178", inseam: "80-84", frameSize: "54-55", size: "M" },
    { height: "178-185", inseam: "83-87", frameSize: "56-57", size: "L" },
    { height: "185-193", inseam: "86-92", frameSize: "58-59", size: "XL" },
    { height: "193+", inseam: "91+", frameSize: "60+", size: "XXL" },
  ]

  return (
    <>
      <Navigation />
      <Box
        sx={{
          minHeight: "100vh",
          backgroundColor: "#fafafa",
          pt: { xs: 10, md: 12 },
          pb: 8,
        }}
      >
        <Container maxWidth="lg">
          {/* Header */}
          <Box sx={{ mb: 6, textAlign: "center" }}>
            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: "2.5rem", md: "3.5rem" },
                fontWeight: 700,
                color: "#212121",
                mb: 2,
                letterSpacing: "-1px",
              }}
            >
              Find Your Bike Size
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontSize: "1.1rem",
                color: "#757575",
                lineHeight: 1.7,
                maxWidth: "700px",
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
                borderRadius: "12px",
                backgroundColor: "#ffffff",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
                height: "fit-content",
              }}
            >
              <Box sx={{ mb: 3, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Typography variant="h6" sx={{ fontWeight: 600, color: "#212121" }}>
                  Enter Your Measurements
                </Typography>
                <ToggleButtonGroup
                  value={unit}
                  exclusive
                  onChange={handleUnitChange}
                  size="small"
                  sx={{
                    "& .MuiToggleButton-root": {
                      textTransform: "none",
                      fontWeight: 600,
                      px: 2,
                    },
                    "& .Mui-selected": {
                      backgroundColor: "#0288d1 !important",
                      color: "#ffffff !important",
                    },
                  }}
                >
                  <ToggleButton value="cm">cm</ToggleButton>
                  <ToggleButton value="inches">inches</ToggleButton>
                </ToggleButtonGroup>
              </Box>

              <Stack spacing={3}>
                <TextField
                  fullWidth
                  label={`Height (${unit}) *`}
                  name="height"
                  type="number"
                  value={formData.height}
                  onChange={handleChange}
                  required
                  variant="outlined"
                  inputProps={{ step: "0.1", min: "0" }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "&:hover fieldset": {
                        borderColor: "#0288d1",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#0288d1",
                      },
                    },
                  }}
                />

                <TextField
                  fullWidth
                  label={`Inseam / Inner Leg Length (${unit}) *`}
                  name="inseam"
                  type="number"
                  value={formData.inseam}
                  onChange={handleChange}
                  required
                  variant="outlined"
                  inputProps={{ step: "0.1", min: "0" }}
                  helperText="Measure from your crotch to the floor while standing barefoot"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "&:hover fieldset": {
                        borderColor: "#0288d1",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#0288d1",
                      },
                    },
                  }}
                />

                <TextField
                  fullWidth
                  label={`Arm Length (${unit})`}
                  name="armLength"
                  type="number"
                  value={formData.armLength}
                  onChange={handleChange}
                  variant="outlined"
                  inputProps={{ step: "0.1", min: "0" }}
                  helperText="From shoulder to wrist (optional)"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "&:hover fieldset": {
                        borderColor: "#0288d1",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#0288d1",
                      },
                    },
                  }}
                />

                <TextField
                  fullWidth
                  label={`Torso Length (${unit})`}
                  name="torsoLength"
                  type="number"
                  value={formData.torsoLength}
                  onChange={handleChange}
                  variant="outlined"
                  inputProps={{ step: "0.1", min: "0" }}
                  helperText="From hip to shoulder (optional)"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "&:hover fieldset": {
                        borderColor: "#0288d1",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#0288d1",
                      },
                    },
                  }}
                />

                <Button
                  variant="contained"
                  size="large"
                  fullWidth
                  onClick={calculateSize}
                  disabled={!formData.height || !formData.inseam}
                  sx={{
                    backgroundColor: "#0288d1",
                    color: "#ffffff",
                    fontWeight: 600,
                    fontSize: "1rem",
                    py: 1.5,
                    mt: 2,
                    textTransform: "none",
                    borderRadius: "8px",
                    "&:hover": {
                      backgroundColor: "#0277bd",
                    },
                    "&:disabled": {
                      backgroundColor: "#e0e0e0",
                      color: "#9e9e9e",
                    },
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
                    border: "1px solid #e0e0e0",
                    borderRadius: "8px !important",
                    "&:before": { display: "none" },
                  }}
                >
                  <AccordionSummary
                    expandIcon={<i className="fi fi-rr-angle-down" style={{ fontSize: "1.2rem" }}></i>}
                    sx={{
                      "& .MuiAccordionSummary-content": {
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                      },
                    }}
                  >
                    <i className="fi fi-rr-info" style={{ color: "#0288d1", fontSize: "1.2rem" }}></i>
                    <Typography sx={{ fontWeight: 600, color: "#212121" }}>How to Measure</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Stack spacing={2}>
                      <Box>
                        <Typography variant="subtitle2" sx={{ fontWeight: 600, color: "#212121", mb: 0.5 }}>
                          Height:
                        </Typography>
                        <Typography variant="body2" sx={{ color: "#424242", lineHeight: 1.6 }}>
                          Stand barefoot against a wall. Mark the top of your head and measure from the floor to the
                          mark.
                        </Typography>
                      </Box>
                      <Box>
                        <Typography variant="subtitle2" sx={{ fontWeight: 600, color: "#212121", mb: 0.5 }}>
                          Inseam (Most Important):
                        </Typography>
                        <Typography variant="body2" sx={{ color: "#424242", lineHeight: 1.6 }}>
                          Stand barefoot with your back against a wall. Place a book between your legs (spine up) and
                          pull it up snugly. Measure from the top of the book spine to the floor.
                        </Typography>
                      </Box>
                      <Box>
                        <Typography variant="subtitle2" sx={{ fontWeight: 600, color: "#212121", mb: 0.5 }}>
                          Arm Length:
                        </Typography>
                        <Typography variant="body2" sx={{ color: "#424242", lineHeight: 1.6 }}>
                          Measure from the bony point at the top of your shoulder to the wrist bone.
                        </Typography>
                      </Box>
                      <Box>
                        <Typography variant="subtitle2" sx={{ fontWeight: 600, color: "#212121", mb: 0.5 }}>
                          Torso Length:
                        </Typography>
                        <Typography variant="body2" sx={{ color: "#424242", lineHeight: 1.6 }}>
                          Measure from the top of your hip bone to the bony point at the top of your shoulder.
                        </Typography>
                      </Box>
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
                    borderRadius: "12px",
                    backgroundColor: "#e3f2fd",
                    border: "2px solid #0288d1",
                    mb: 4,
                  }}
                >
                  <Box sx={{ textAlign: "center", mb: 3 }}>
                    <i
                      className="fi fi-rr-check-circle"
                      style={{ color: "#0288d1", fontSize: "3rem", marginBottom: "16px", display: "block" }}
                    ></i>
                    <Typography variant="h5" sx={{ fontWeight: 700, color: "#212121", mb: 1 }}>
                      Your Recommended Frame Size
                    </Typography>
                    <Typography
                      variant="h3"
                      sx={{
                        fontWeight: 800,
                        color: "#0288d1",
                        fontSize: { xs: "2.5rem", md: "3rem" },
                      }}
                    >
                      {result.frameSize} cm
                    </Typography>
                    <Typography variant="h6" sx={{ color: "#424242", mt: 1 }}>
                      ({result.sizeRange})
                    </Typography>
                  </Box>

                  <Divider sx={{ my: 3 }} />

                  <Alert
                    severity="info"
                    icon={<i className="fi fi-rr-bulb" style={{ fontSize: "1.5rem" }}></i>}
                    sx={{
                      backgroundColor: "transparent",
                      border: "1px solid #0288d1",
                      "& .MuiAlert-icon": {
                        color: "#0288d1",
                      },
                    }}
                  >
                    <Typography variant="body2" sx={{ color: "#212121", lineHeight: 1.7 }}>
                      {result.fitNotes}
                    </Typography>
                  </Alert>

                  <Box sx={{ mt: 3, textAlign: "center" }}>
                    <Button
                      variant="contained"
                      size="large"
                      href="#contact"
                      sx={{
                        backgroundColor: "#0288d1",
                        color: "#ffffff",
                        fontWeight: 600,
                        fontSize: "1rem",
                        px: 4,
                        py: 1.5,
                        textTransform: "none",
                        borderRadius: "8px",
                        "&:hover": {
                          backgroundColor: "#0277bd",
                        },
                      }}
                      onClick={(e) => {
                        e.preventDefault()
                        const element = document.querySelector("#contact")
                        if (element) {
                          element.scrollIntoView({ behavior: "smooth" })
                        } else {
                          window.location.href = "/#contact"
                        }
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
                  borderRadius: "12px",
                  backgroundColor: "#ffffff",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: 600, color: "#212121", mb: 2 }}>
                  <i className="fi fi-rr-chart-histogram" style={{ marginRight: "8px", color: "#0288d1" }}></i>
                  Standard Road Bike Size Chart
                </Typography>

                <TableContainer>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell sx={{ fontWeight: 600, backgroundColor: "#fafafa" }}>Height (cm)</TableCell>
                        <TableCell sx={{ fontWeight: 600, backgroundColor: "#fafafa" }}>Inseam (cm)</TableCell>
                        <TableCell sx={{ fontWeight: 600, backgroundColor: "#fafafa" }}>Frame Size (cm)</TableCell>
                        <TableCell sx={{ fontWeight: 600, backgroundColor: "#fafafa" }}>Size</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {sizeChart.map((row, index) => (
                        <TableRow
                          key={index}
                          sx={{
                            "&:nth-of-type(even)": {
                              backgroundColor: "#fafafa",
                            },
                          }}
                        >
                          <TableCell>{row.height}</TableCell>
                          <TableCell>{row.inseam}</TableCell>
                          <TableCell sx={{ fontWeight: 600, color: "#0288d1" }}>{row.frameSize}</TableCell>
                          <TableCell>{row.size}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>

                <Typography
                  variant="caption"
                  sx={{
                    display: "block",
                    mt: 2,
                    fontStyle: "italic",
                    color: "#757575",
                    textAlign: "center",
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
                  borderRadius: "12px",
                  backgroundColor: "#fff3e0",
                  border: "1px solid #ffb74d",
                  mt: 3,
                }}
              >
                <Typography variant="subtitle1" sx={{ fontWeight: 600, color: "#212121", mb: 2 }}>
                  <i className="fi fi-rr-exclamation" style={{ marginRight: "8px", color: "#f57c00" }}></i>
                  Important Notes
                </Typography>
                <Stack spacing={1}>
                  <Typography variant="body2" sx={{ color: "#424242", lineHeight: 1.6 }}>
                    • This calculator provides a starting point. Professional bike fitting is recommended for optimal
                    comfort and performance.
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#424242", lineHeight: 1.6 }}>
                    • Different bike geometries (race vs endurance) may require different sizes even with the same
                    measurements.
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#424242", lineHeight: 1.6 }}>
                    • If you're between sizes, consider your riding style: smaller for racing/aggressive, larger for
                    comfort/endurance.
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#424242", lineHeight: 1.6 }}>
                    • Contact us for personalized sizing advice based on the specific bike you're interested in.
                  </Typography>
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
