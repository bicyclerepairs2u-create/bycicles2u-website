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
        py: { xs: 10, md: 14 },
        backgroundColor: "var(--theme-bg-secondary)",
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
            #ff1744,
            #ff1744 1px,
            transparent 1px,
            transparent 50px
          )`,
          opacity: 0.02,
          zIndex: 0,
        }}
      />

      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        {/* Section Header */}
        <Box sx={{ textAlign: "center", mb: 6 }}>
          <Typography
            sx={{
              fontSize: "0.625rem",
              fontWeight: 600,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#ff1744",
              mb: 2,
            }}
          >
            Expert Service
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
            Services & Pricing
          </Typography>
        </Box>

        <Paper
          elevation={0}
          sx={{
            borderRadius: 0,
            overflow: "hidden",
            backgroundColor: "var(--theme-bg-primary)",
            border: "1px solid var(--theme-border)",
            maxWidth: "1000px",
            mx: "auto",
            clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 25px), calc(100% - 25px) 100%, 0 100%)",
          }}
        >
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            centered
            sx={{
              borderBottom: "1px solid var(--theme-border)",
              backgroundColor: "var(--theme-bg-secondary)",
              "& .MuiTab-root": {
                textTransform: "uppercase",
                fontSize: "0.875rem",
                fontWeight: 700,
                letterSpacing: "0.05em",
                py: 3,
                color: "var(--theme-text-muted)",
                transition: "all 0.2s ease",
              },
              "& .Mui-selected": {
                color: "#ff1744",
              },
              "& .MuiTabs-indicator": {
                backgroundColor: "#ff1744",
                height: 2,
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
                    border: "1px solid var(--theme-border)",
                    borderRadius: 0,
                    overflowX: "auto",
                    backgroundColor: "transparent",
                  }}
                >
                  <Table sx={{ minWidth: 800 }}>
                    <TableHead>
                      <TableRow>
                        <TableCell
                          sx={{
                            fontWeight: 700,
                            fontSize: "0.875rem",
                            color: "var(--theme-text-secondary)",
                            backgroundColor: "var(--theme-bg-secondary)",
                            borderBottom: "1px solid var(--theme-border)",
                            textTransform: "uppercase",
                            letterSpacing: "0.05em",
                            width: "40%",
                          }}
                        >
                          Service Features
                        </TableCell>
                        <TableCell
                          align="center"
                          sx={{
                            fontWeight: 700,
                            backgroundColor: "var(--theme-bg-primary)",
                            borderBottom: "1px solid var(--theme-border)",
                            borderLeft: "1px solid var(--theme-border)",
                            width: "15%",
                          }}
                        >
                          <Typography sx={{ fontWeight: 700, color: "var(--theme-text-secondary)", mb: 0.5, fontSize: "0.875rem", textTransform: "uppercase" }}>
                            Basic
                          </Typography>
                          <Typography sx={{ fontWeight: 700, color: "#ff1744", fontSize: "1.5rem" }}>
                            $59
                          </Typography>
                        </TableCell>
                        <TableCell
                          align="center"
                          sx={{
                            fontWeight: 700,
                            backgroundColor: "var(--theme-bg-primary)",
                            borderBottom: "1px solid var(--theme-border)",
                            borderLeft: "1px solid var(--theme-border)",
                            width: "15%",
                          }}
                        >
                          <Typography sx={{ fontWeight: 700, color: "var(--theme-text-secondary)", mb: 0.5, fontSize: "0.875rem", textTransform: "uppercase" }}>
                            Standard
                          </Typography>
                          <Typography sx={{ fontWeight: 700, color: "#ff1744", fontSize: "1.5rem" }}>
                            $119
                          </Typography>
                        </TableCell>
                        <TableCell
                          align="center"
                          sx={{
                            fontWeight: 700,
                            backgroundColor: "rgba(255, 23, 68, 0.08)",
                            borderBottom: "2px solid #ff1744",
                            borderLeft: "2px solid #ff1744",
                            borderRight: "2px solid #ff1744",
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
                              backgroundColor: "#ff1744",
                              color: "#000000",
                              px: 2,
                              py: 0.5,
                              fontSize: "0.625rem",
                              fontWeight: 700,
                              letterSpacing: "0.1em",
                              textTransform: "uppercase",
                            }}
                          >
                            Popular
                          </Box>
                          <Typography sx={{ fontWeight: 700, color: "var(--theme-text-primary)", mb: 0.5, fontSize: "0.875rem", mt: 3, textTransform: "uppercase" }}>
                            Deluxe
                          </Typography>
                          <Typography sx={{ fontWeight: 700, color: "#ff1744", fontSize: "1.5rem" }}>
                            $159
                          </Typography>
                        </TableCell>
                        <TableCell
                          align="center"
                          sx={{
                            fontWeight: 700,
                            backgroundColor: "var(--theme-bg-primary)",
                            borderBottom: "1px solid var(--theme-border)",
                            borderLeft: "1px solid var(--theme-border)",
                            width: "15%",
                          }}
                        >
                          <Typography sx={{ fontWeight: 700, color: "var(--theme-text-secondary)", mb: 0.5, fontSize: "0.875rem", textTransform: "uppercase" }}>
                            Ultimate
                          </Typography>
                          <Typography sx={{ fontWeight: 700, color: "#ff1744", fontSize: "1.5rem" }}>
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
                              backgroundColor: "var(--theme-bg-secondary)",
                            },
                            "&:last-child td": {
                              borderBottom: 0,
                            },
                            transition: "background-color 0.2s ease",
                            "&:hover": {
                              backgroundColor: "rgba(255, 23, 68, 0.03)",
                            },
                          }}
                        >
                          <TableCell sx={{ py: 2, color: "var(--theme-text-muted)", fontSize: "0.875rem", borderBottom: "1px solid var(--theme-border)" }}>{feature.name}</TableCell>
                          <TableCell align="center" sx={{ py: 2, borderLeft: "1px solid var(--theme-border)", borderBottom: "1px solid var(--theme-border)" }}>
                            {feature.basic ? (
                              <i className="fi fi-rr-check" style={{ color: "#ff1744", fontSize: "1.25rem" }}></i>
                            ) : (
                              <i className="fi fi-rr-cross" style={{ color: "var(--theme-border-hover)", fontSize: "1.25rem" }}></i>
                            )}
                          </TableCell>
                          <TableCell align="center" sx={{ py: 2, borderLeft: "1px solid var(--theme-border)", borderBottom: "1px solid var(--theme-border)" }}>
                            {feature.standard ? (
                              <i className="fi fi-rr-check" style={{ color: "#ff1744", fontSize: "1.25rem" }}></i>
                            ) : (
                              <i className="fi fi-rr-cross" style={{ color: "var(--theme-border-hover)", fontSize: "1.25rem" }}></i>
                            )}
                          </TableCell>
                          <TableCell
                            align="center"
                            sx={{
                              py: 2,
                              backgroundColor: "rgba(255, 23, 68, 0.05)",
                              borderLeft: "2px solid #ff1744",
                              borderRight: "2px solid #ff1744",
                              borderBottom: "1px solid var(--theme-border)",
                            }}
                          >
                            {feature.deluxe ? (
                              <i className="fi fi-rr-check" style={{ color: "#ff1744", fontSize: "1.25rem" }}></i>
                            ) : (
                              <i className="fi fi-rr-cross" style={{ color: "var(--theme-border-hover)", fontSize: "1.25rem" }}></i>
                            )}
                          </TableCell>
                          <TableCell align="center" sx={{ py: 2, borderLeft: "1px solid var(--theme-border)", borderBottom: "1px solid var(--theme-border)" }}>
                            {feature.ultimate ? (
                              <i className="fi fi-rr-check" style={{ color: "#ff1744", fontSize: "1.25rem" }}></i>
                            ) : (
                              <i className="fi fi-rr-cross" style={{ color: "var(--theme-border-hover)", fontSize: "1.25rem" }}></i>
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
                    color: "var(--theme-text-muted)",
                    fontSize: "0.75rem",
                  }}
                >
                  * All labour for additional parts included in service price
                </Typography>

                {/* Additional Services */}
                <Box sx={{ mt: 5 }}>
                  <Divider sx={{ mb: 4, borderColor: "var(--theme-border)" }} />
                  <Typography
                    sx={{
                      fontWeight: 700,
                      color: "var(--theme-text-primary)",
                      mb: 3,
                      textAlign: "center",
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                      fontSize: "1rem",
                    }}
                  >
                    Additional Services
                  </Typography>
                  <Box
                    sx={{
                      display: "grid",
                      gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                      gap: 2,
                    }}
                  >
                    <Paper
                      elevation={0}
                      sx={{
                        p: 3,
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        backgroundColor: "var(--theme-bg-secondary)",
                        border: "1px solid var(--theme-border)",
                        borderRadius: 0,
                        transition: "all 0.3s ease",
                        "&:hover": {
                          borderColor: "#ff1744",
                          boxShadow: "0 0 20px rgba(255, 23, 68, 0.1)",
                        },
                      }}
                    >
                      <Typography sx={{ fontWeight: 600, color: "var(--theme-text-secondary)", fontSize: "0.875rem" }}>
                        Pickup - Drop Off Service
                      </Typography>
                      <Typography sx={{ fontWeight: 700, color: "#ff1744", fontSize: "1.25rem" }}>
                        $29
                      </Typography>
                    </Paper>
                    <Paper
                      elevation={0}
                      sx={{
                        p: 3,
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        backgroundColor: "var(--theme-bg-secondary)",
                        border: "1px solid var(--theme-border)",
                        borderRadius: 0,
                        transition: "all 0.3s ease",
                        "&:hover": {
                          borderColor: "#ff1744",
                          boxShadow: "0 0 20px rgba(255, 23, 68, 0.1)",
                        },
                      }}
                    >
                      <Typography sx={{ fontWeight: 600, color: "var(--theme-text-secondary)", fontSize: "0.875rem" }}>
                        On-Site Servicing Fee
                      </Typography>
                      <Typography sx={{ fontWeight: 700, color: "#ff1744", fontSize: "1.25rem" }}>
                        $39
                      </Typography>
                    </Paper>
                  </Box>
                </Box>

                <Box sx={{ mt: 5, textAlign: "center" }}>
                  <Button
                    variant="contained"
                    size="large"
                    onClick={() => handleScroll("#contact")}
                    sx={{
                      backgroundColor: "#ff1744",
                      color: "#000000",
                      fontWeight: 700,
                      fontSize: "0.875rem",
                      px: 5,
                      py: 1.5,
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                      borderRadius: 0,
                      boxShadow: "0 4px 20px rgba(255, 23, 68, 0.3)",
                      "&:hover": {
                        backgroundColor: "#d50032",
                        boxShadow: "0 6px 30px rgba(255, 23, 68, 0.4)",
                        transform: "translateY(-2px)",
                      },
                      transition: "all 0.3s ease",
                    }}
                  >
                    Book Your Service
                  </Button>
                </Box>
              </Box>
            )}

            {tabValue === 1 && (
              <Box sx={{ textAlign: "center", py: 6 }}>
                <Typography
                  sx={{
                    fontWeight: 900,
                    color: "var(--theme-text-primary)",
                    mb: 3,
                    textTransform: "uppercase",
                    letterSpacing: "-0.02em",
                    fontSize: { xs: "1.5rem", md: "2rem" },
                  }}
                >
                  Custom Build Services
                </Typography>

                <Typography
                  sx={{
                    fontSize: "1rem",
                    color: "var(--theme-text-muted)",
                    mb: 5,
                    maxWidth: "550px",
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
                  href="mailto:bicyclerepairs2u@gmail.com?subject=Custom Build Inquiry"
                  sx={{
                    backgroundColor: "#ff1744",
                    color: "#000000",
                    fontWeight: 700,
                    fontSize: "0.875rem",
                    px: 5,
                    py: 1.5,
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    borderRadius: 0,
                    boxShadow: "0 4px 20px rgba(255, 23, 68, 0.3)",
                    "&:hover": {
                      backgroundColor: "#d50032",
                      boxShadow: "0 6px 30px rgba(255, 23, 68, 0.4)",
                      transform: "translateY(-2px)",
                    },
                    transition: "all 0.3s ease",
                  }}
                >
                  Email for Custom Build
                </Button>
              </Box>
            )}
          </Box>
        </Paper>

        <Alert
          severity="warning"
          icon={
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ color: "#ff1744" }}
            >
              <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z" fill="currentColor" />
            </svg>
          }
          sx={{
            mt: 5,
            borderRadius: 0,
            backgroundColor: "rgba(255, 23, 68, 0.08)",
            border: "1px solid rgba(255, 23, 68, 0.3)",
            maxWidth: "1000px",
            mx: "auto",
            "& .MuiAlert-icon": {
              color: "#ff1744",
            },
          }}
        >
          <Typography
            sx={{
              fontWeight: 600,
              color: "var(--theme-text-secondary)",
              fontSize: "0.875rem",
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
