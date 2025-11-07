"use client"

import type React from "react"

import { useState } from "react"
import {
  Box,
  Container,
  Typography,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Button,
  Alert,
  Paper,
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
                <Table>
                  <TableBody>
                    <TableRow
                      sx={{
                        "&:nth-of-type(odd)": {
                          backgroundColor: "#fafafa",
                        },
                      }}
                    >
                      <TableCell
                        sx={{
                          fontSize: "1.05rem",
                          fontWeight: 500,
                          color: "#212121",
                          py: 2.5,
                        }}
                      >
                        Basic Tune-Up
                      </TableCell>
                      <TableCell
                        align="right"
                        sx={{
                          fontSize: "1.1rem",
                          fontWeight: 700,
                          color: "#0288d1",
                          py: 2.5,
                        }}
                      >
                        $75 - $120
                      </TableCell>
                    </TableRow>
                    <TableRow
                      sx={{
                        "&:nth-of-type(odd)": {
                          backgroundColor: "#fafafa",
                        },
                      }}
                    >
                      <TableCell
                        sx={{
                          fontSize: "1.05rem",
                          fontWeight: 500,
                          color: "#212121",
                          py: 2.5,
                        }}
                      >
                        Full Service / Overhaul
                      </TableCell>
                      <TableCell
                        align="right"
                        sx={{
                          fontSize: "1.1rem",
                          fontWeight: 700,
                          color: "#0288d1",
                          py: 2.5,
                        }}
                      >
                        $200 - $350
                      </TableCell>
                    </TableRow>
                    <TableRow
                      sx={{
                        "&:nth-of-type(odd)": {
                          backgroundColor: "#fafafa",
                        },
                      }}
                    >
                      <TableCell
                        sx={{
                          fontSize: "1.05rem",
                          fontWeight: 500,
                          color: "#212121",
                          py: 2.5,
                        }}
                      >
                        Wheel Truing
                      </TableCell>
                      <TableCell
                        align="right"
                        sx={{
                          fontSize: "1.1rem",
                          fontWeight: 700,
                          color: "#0288d1",
                          py: 2.5,
                        }}
                      >
                        $30 - $50
                      </TableCell>
                    </TableRow>
                    <TableRow
                      sx={{
                        "&:nth-of-type(odd)": {
                          backgroundColor: "#fafafa",
                        },
                      }}
                    >
                      <TableCell
                        sx={{
                          fontSize: "1.05rem",
                          fontWeight: 500,
                          color: "#212121",
                          py: 2.5,
                        }}
                      >
                        Brake Adjustment
                      </TableCell>
                      <TableCell
                        align="right"
                        sx={{
                          fontSize: "1.1rem",
                          fontWeight: 700,
                          color: "#0288d1",
                          py: 2.5,
                        }}
                      >
                        $25 - $40
                      </TableCell>
                    </TableRow>
                    <TableRow
                      sx={{
                        "&:nth-of-type(odd)": {
                          backgroundColor: "#fafafa",
                        },
                      }}
                    >
                      <TableCell
                        sx={{
                          fontSize: "1.05rem",
                          fontWeight: 500,
                          color: "#212121",
                          py: 2.5,
                        }}
                      >
                        Di2 / Electronic Setup
                      </TableCell>
                      <TableCell
                        align="right"
                        sx={{
                          fontSize: "1.1rem",
                          fontWeight: 700,
                          color: "#0288d1",
                          py: 2.5,
                        }}
                      >
                        $100 - $150
                      </TableCell>
                    </TableRow>
                    <TableRow
                      sx={{
                        "&:nth-of-type(odd)": {
                          backgroundColor: "#fafafa",
                        },
                      }}
                    >
                      <TableCell
                        sx={{
                          fontSize: "1.05rem",
                          fontWeight: 500,
                          color: "#212121",
                          py: 2.5,
                        }}
                      >
                        Custom Build
                      </TableCell>
                      <TableCell
                        align="right"
                        sx={{
                          fontSize: "1.1rem",
                          fontWeight: 700,
                          color: "#0288d1",
                          py: 2.5,
                        }}
                      >
                        Starting at $500
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>

                <Box sx={{ mt: 4, textAlign: "center" }}>
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
                    Request a Quote
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
