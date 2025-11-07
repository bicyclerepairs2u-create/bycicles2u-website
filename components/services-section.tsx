"use client"

import type React from "react"

import { useState } from "react"
import {
  Box,
  Container,
  Typography,
  Tabs,
  Tab,
  Button,
  Alert,
  Paper,
  Grid,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material"

export default function ServicesSection() {
  const [tabValue, setTabValue] = useState(0)

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue)
  }

  const handleScroll = (id: string) => {
    const element = document.querySelector(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <Box
      id="services"
      component="section"
      sx={{
        py: { xs: 8, md: 12 },
        backgroundColor: "#fafafa",
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="h2"
          sx={{
            fontSize: { xs: "2rem", md: "3rem" },
            fontWeight: 700,
            color: "#212121",
            mb: 6,
            textAlign: "center",
            letterSpacing: "-1px",
          }}
        >
          Services & Pricing
        </Typography>

        <Paper
          elevation={0}
          sx={{
            borderRadius: "12px",
            overflow: "hidden",
            backgroundColor: "#ffffff",
            maxWidth: "900px",
            mx: "auto",
          }}
        >
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            centered
            sx={{
              borderBottom: "1px solid #e0e0e0",
              "& .MuiTab-root": {
                textTransform: "none",
                fontSize: "1.1rem",
                fontWeight: 600,
                py: 3,
                color: "#757575",
              },
              "& .Mui-selected": {
                color: "#0288d1",
              },
              "& .MuiTabs-indicator": {
                backgroundColor: "#0288d1",
                height: 3,
              },
            }}
          >
            <Tab label="Repair Services" />
            <Tab label="Custom Builds" />
          </Tabs>

          <Box sx={{ p: { xs: 3, md: 5 } }}>
            {tabValue === 0 && (
              <Box>
                {/* Comparison Table */}
                <TableContainer
                  component={Paper}
                  elevation={0}
                  sx={{
                    border: "2px solid #e0e0e0",
                    borderRadius: "12px",
                    overflowX: "auto",
                  }}
                >
                  <Table sx={{ minWidth: 800 }}>
                    <TableHead>
                      <TableRow>
                        <TableCell
                          sx={{
                            fontWeight: 600,
                            fontSize: "1.1rem",
                            color: "#212121",
                            backgroundColor: "#ffffff",
                            borderBottom: "2px solid #e0e0e0",
                            width: "40%",
                          }}
                        >
                          Service Features
                        </TableCell>
                        <TableCell
                          align="center"
                          sx={{
                            fontWeight: 700,
                            backgroundColor: "#fafafa",
                            borderBottom: "2px solid #e0e0e0",
                            borderLeft: "1px solid #e0e0e0",
                            width: "15%",
                          }}
                        >
                          <Typography variant="h6" sx={{ fontWeight: 700, color: "#212121", mb: 0.5 }}>
                            Basic
                          </Typography>
                          <Typography variant="h5" sx={{ fontWeight: 700, color: "#0288d1" }}>
                            $59
                          </Typography>
                        </TableCell>
                        <TableCell
                          align="center"
                          sx={{
                            fontWeight: 700,
                            backgroundColor: "#fafafa",
                            borderBottom: "2px solid #e0e0e0",
                            borderLeft: "1px solid #e0e0e0",
                            width: "15%",
                          }}
                        >
                          <Typography variant="h6" sx={{ fontWeight: 700, color: "#212121", mb: 0.5 }}>
                            Standard
                          </Typography>
                          <Typography variant="h5" sx={{ fontWeight: 700, color: "#0288d1" }}>
                            $119
                          </Typography>
                        </TableCell>
                        <TableCell
                          align="center"
                          sx={{
                            fontWeight: 700,
                            backgroundColor: "#e3f2fd",
                            borderBottom: "2px solid #0288d1",
                            borderLeft: "2px solid #0288d1",
                            borderRight: "2px solid #0288d1",
                            position: "relative",
                            width: "15%",
                          }}
                        >
                          <Box
                            sx={{
                              position: "absolute",
                              top: 8,
                              left: "50%",
                              transform: "translateX(-50%)",
                              backgroundColor: "#0288d1",
                              color: "#ffffff",
                              px: 2,
                              py: 0.5,
                              borderRadius: "4px",
                              fontSize: "0.65rem",
                              fontWeight: 600,
                            }}
                          >
                            POPULAR
                          </Box>
                          <Typography variant="h6" sx={{ fontWeight: 700, color: "#212121", mb: 0.5, mt: 3 }}>
                            Deluxe
                          </Typography>
                          <Typography variant="h5" sx={{ fontWeight: 700, color: "#0288d1" }}>
                            $159
                          </Typography>
                        </TableCell>
                        <TableCell
                          align="center"
                          sx={{
                            fontWeight: 700,
                            backgroundColor: "#fafafa",
                            borderBottom: "2px solid #e0e0e0",
                            borderLeft: "1px solid #e0e0e0",
                            width: "15%",
                          }}
                        >
                          <Typography variant="h6" sx={{ fontWeight: 700, color: "#212121", mb: 0.5 }}>
                            Ultimate
                          </Typography>
                          <Typography variant="h5" sx={{ fontWeight: 700, color: "#0288d1" }}>
                            $299
                          </Typography>
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {[
                        { name: "Drivetrain tune", basic: true, standard: true, deluxe: true, ultimate: true },
                        { name: "Brake tune", basic: true, standard: true, deluxe: true, ultimate: true },
                        { name: "Service report", basic: false, standard: true, deluxe: true, ultimate: true },
                        { name: "Safety check", basic: false, standard: true, deluxe: true, ultimate: true },
                        { name: "Frame wipe down", basic: false, standard: true, deluxe: true, ultimate: true },
                        { name: "All bolts tightened and checked", basic: false, standard: true, deluxe: true, ultimate: true },
                        { name: "Degrease drivetrain", basic: false, standard: true, deluxe: true, ultimate: true },
                        { name: "Lubricate drivetrain and components", basic: false, standard: true, deluxe: true, ultimate: true },
                        { name: "Spoke tension checked", basic: false, standard: true, deluxe: true, ultimate: true },
                        { name: "Wheels Trued", basic: false, standard: false, deluxe: true, ultimate: true },
                        { name: "Wheel hubs checked and adjusted", basic: false, standard: false, deluxe: true, ultimate: true },
                        { name: "Detail polish Frame & Wheels", basic: false, standard: false, deluxe: true, ultimate: true },
                        { name: "Headset inspect & adjusted", basic: false, standard: false, deluxe: true, ultimate: true },
                        { name: "Bottom Bracket inspected & Adjusted", basic: false, standard: false, deluxe: true, ultimate: true },
                        { name: "New inner Cables", basic: false, standard: false, deluxe: false, ultimate: true },
                        { name: "Bike stripped to frame", basic: false, standard: false, deluxe: false, ultimate: true },
                        { name: "Brake bleed (if applicable)", basic: false, standard: false, deluxe: false, ultimate: true },
                        { name: "Headset, Bottom bracket & Hubs greased", basic: false, standard: false, deluxe: false, ultimate: true },
                        { name: "Suspension Adjustment (if applicable)", basic: false, standard: false, deluxe: false, ultimate: true },
                      ].map((feature, index) => (
                        <TableRow
                          key={index}
                          sx={{
                            "&:nth-of-type(even)": {
                              backgroundColor: "#fafafa",
                            },
                            "&:last-child td": {
                              borderBottom: 0,
                            },
                          }}
                        >
                          <TableCell sx={{ py: 2, color: "#424242" }}>{feature.name}</TableCell>
                          <TableCell align="center" sx={{ py: 2, borderLeft: "1px solid #e0e0e0" }}>
                            {feature.basic ? (
                              <i className="fi fi-rr-check" style={{ color: "#4caf50", fontSize: "1.5rem" }}></i>
                            ) : (
                              <i className="fi fi-rr-cross" style={{ color: "#e0e0e0", fontSize: "1.5rem" }}></i>
                            )}
                          </TableCell>
                          <TableCell align="center" sx={{ py: 2, borderLeft: "1px solid #e0e0e0" }}>
                            {feature.standard ? (
                              <i className="fi fi-rr-check" style={{ color: "#4caf50", fontSize: "1.5rem" }}></i>
                            ) : (
                              <i className="fi fi-rr-cross" style={{ color: "#e0e0e0", fontSize: "1.5rem" }}></i>
                            )}
                          </TableCell>
                          <TableCell
                            align="center"
                            sx={{
                              py: 2,
                              backgroundColor: "#e3f2fd",
                              borderLeft: "2px solid #0288d1",
                              borderRight: "2px solid #0288d1",
                            }}
                          >
                            {feature.deluxe ? (
                              <i className="fi fi-rr-check" style={{ color: "#4caf50", fontSize: "1.5rem" }}></i>
                            ) : (
                              <i className="fi fi-rr-cross" style={{ color: "#e0e0e0", fontSize: "1.5rem" }}></i>
                            )}
                          </TableCell>
                          <TableCell align="center" sx={{ py: 2, borderLeft: "1px solid #e0e0e0" }}>
                            {feature.ultimate ? (
                              <i className="fi fi-rr-check" style={{ color: "#4caf50", fontSize: "1.5rem" }}></i>
                            ) : (
                              <i className="fi fi-rr-cross" style={{ color: "#e0e0e0", fontSize: "1.5rem" }}></i>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>

                <Typography
                  variant="caption"
                  sx={{
                    display: "block",
                    mt: 3,
                    textAlign: "center",
                    fontStyle: "italic",
                    color: "#757575",
                  }}
                >
                  * All labour for additional parts included in service price
                </Typography>

                {/* Additional Services */}
                <Box sx={{ mt: 4 }}>
                  <Divider sx={{ mb: 3 }} />
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 600,
                      color: "#212121",
                      mb: 2,
                      textAlign: "center",
                    }}
                  >
                    Additional Services
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <Paper
                        elevation={0}
                        sx={{
                          p: 2,
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          border: "1px solid #e0e0e0",
                          borderRadius: "8px",
                        }}
                      >
                        <Typography variant="body1" sx={{ fontWeight: 500 }}>
                          Pickup - Drop Off Service
                        </Typography>
                        <Typography variant="h6" sx={{ fontWeight: 700, color: "#0288d1" }}>
                          $29
                        </Typography>
                      </Paper>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Paper
                        elevation={0}
                        sx={{
                          p: 2,
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          border: "1px solid #e0e0e0",
                          borderRadius: "8px",
                        }}
                      >
                        <Typography variant="body1" sx={{ fontWeight: 500 }}>
                          On-Site Servicing Fee
                        </Typography>
                        <Typography variant="h6" sx={{ fontWeight: 700, color: "#0288d1" }}>
                          $39
                        </Typography>
                      </Paper>
                    </Grid>
                  </Grid>
                </Box>

                <Box sx={{ mt: 5, textAlign: "center" }}>
                  <Button
                    variant="contained"
                    size="large"
                    onClick={() => handleScroll("#contact")}
                    sx={{
                      backgroundColor: "#0288d1",
                      color: "#ffffff",
                      fontWeight: 600,
                      fontSize: "1rem",
                      px: 5,
                      py: 1.5,
                      textTransform: "none",
                      borderRadius: "8px",
                      "&:hover": {
                        backgroundColor: "#0277bd",
                      },
                    }}
                  >
                    Book Your Service
                  </Button>
                </Box>
              </Box>
            )}

            {tabValue === 1 && (
              <Box sx={{ textAlign: "center", py: 4 }}>
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 600,
                    color: "#212121",
                    mb: 3,
                  }}
                >
                  Custom Build Services
                </Typography>

                <Typography
                  variant="body1"
                  sx={{
                    fontSize: "1.1rem",
                    color: "#757575",
                    mb: 4,
                    maxWidth: "600px",
                    mx: "auto",
                    lineHeight: 1.8,
                  }}
                >
                  Every build is unique – pricing depends on components and specifications. Whether you're looking for a
                  race-ready road bike or a custom triathlon setup, I'll work with you to create the perfect machine for
                  your needs.
                </Typography>

                <Button
                  variant="contained"
                  size="large"
                  href="mailto:info@bicycles2u.com.au?subject=Custom Build Inquiry"
                  sx={{
                    backgroundColor: "#0288d1",
                    color: "#ffffff",
                    fontWeight: 600,
                    fontSize: "1rem",
                    px: 5,
                    py: 1.5,
                    textTransform: "none",
                    borderRadius: "8px",
                    "&:hover": {
                      backgroundColor: "#0277bd",
                    },
                  }}
                >
                  Email for Custom Build Consultation
                </Button>
              </Box>
            )}
          </Box>
        </Paper>

        <Alert
          severity="warning"
          icon={
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ color: "#f57c00" }}
            >
              <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z" fill="currentColor" />
            </svg>
          }
          sx={{
            mt: 4,
            borderRadius: "12px",
            backgroundColor: "#fff3e0",
            border: "1px solid #ffb74d",
            maxWidth: "900px",
            mx: "auto",
            "& .MuiAlert-icon": {
              color: "#f57c00",
            },
          }}
        >
          <Typography
            variant="body1"
            sx={{
              fontWeight: 500,
              color: "#424242",
            }}
          >
            Please note: We do not service e-bikes in any shape or form. We specialize in traditional road and triathlon
            bikes only.
          </Typography>
        </Alert>
      </Container>
    </Box>
  )
}
