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
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material"

const packages = [
  { key: "standard" as const, name: "Standard", price: "$169", featured: false },
  { key: "deluxe" as const, name: "Deluxe", price: "$249", featured: true },
  { key: "ultimate" as const, name: "Ultimate", price: "$499", featured: false },
]

const features: { name: string; standard: boolean; deluxe: boolean; ultimate: boolean }[] = [
  { name: "Safety inspection and service report", standard: true, deluxe: true, ultimate: true },
  { name: "Gear and drivetrain tuning", standard: true, deluxe: true, ultimate: true },
  { name: "Brake adjustment", standard: true, deluxe: true, ultimate: true },
  { name: "Torque check of accessible fasteners", standard: true, deluxe: true, ultimate: true },
  { name: "Chain lubrication", standard: true, deluxe: true, ultimate: true },
  { name: "Frame wipe-down", standard: true, deluxe: true, ultimate: true },
  { name: "Spoke tension inspection", standard: true, deluxe: true, ultimate: true },
  { name: "Headset and bottom bracket inspection", standard: true, deluxe: true, ultimate: true },
  { name: "Brake pad and drivetrain wear measurements", standard: true, deluxe: true, ultimate: true },
  { name: "Drivetrain degrease and clean", standard: false, deluxe: true, ultimate: true },
  { name: "Minor wheel truing", standard: false, deluxe: true, ultimate: true },
  { name: "Hub inspection and adjustment", standard: false, deluxe: true, ultimate: true },
  { name: "Detailed frame and wheel wash", standard: false, deluxe: true, ultimate: true },
  { name: "Minor component replacement labour*", standard: false, deluxe: true, ultimate: true },
  { name: "Hydraulic brake bleeding", standard: false, deluxe: false, ultimate: true },
  { name: "Bike stripped down for deep cleaning", standard: false, deluxe: false, ultimate: true },
  { name: "Serviceable bearing systems cleaned and regreased**", standard: false, deluxe: false, ultimate: true },
]

const extraServices = [
  { name: "Additional workshop labour", price: "$110/hour" },
  { name: "Pickup and return (eligible Sydney zones)", price: "$39" },
  { name: "On-site call-out", price: "$49" },
  { name: "Hydraulic brake bleed (per brake)", price: "$50" },
  { name: "Tube replacement (labour only)", price: "$40" },
  { name: "Minor wheel true (per wheel)", price: "$40" },
  { name: "Gear indexing adjustment", price: "$39" },
  { name: "Brake adjustment", price: "$39" },
]

const workshopTerms = [
  "Road bikes only. Electric bicycles are not accepted for servicing, repairs or maintenance.",
  "All advertised prices include GST. Replacement parts and consumables are charged separately unless otherwise specified.",
  "Minor component replacement labour is included in Deluxe and Ultimate services only, subject to the exclusions in the fine print.",
  "Work outside the selected package may incur additional charges. You will be asked to approve those costs before work proceeds.",
  "Severely worn, damaged, seized or corroded components may require additional labour or parts, quoted before proceeding.",
  "Bottom bracket replacement, headset bearing replacement, wheel bearing replacement, specialist hydraulic repairs, carbon repairs and work requiring extensive disassembly are not included unless the selected package says so.",
  "Services already included in a booked package are not charged again as additional workshop services.",
  "Bikes must be collected within 14 calendar days of the ready notification. From day 15, storage is $5 per calendar day (including GST), payable on collection.",
  "Booking a service and leaving a bicycle with Bicycles2U means you accept the inclusions, exclusions, pricing and workshop terms available at the time of booking.",
]

function CheckCell({ included, featured }: { included: boolean; featured?: boolean }) {
  return (
    <TableCell
      align="center"
      sx={{
        py: 2,
        borderLeft: featured ? "2px solid #00d4ff" : "1px solid var(--theme-border)",
        borderRight: featured ? "2px solid #00d4ff" : undefined,
        borderBottom: "1px solid var(--theme-border)",
        backgroundColor: featured ? "rgba(0, 212, 255, 0.05)" : undefined,
      }}
    >
      {included ? (
        <i className="fi fi-rr-check" style={{ color: "#00d4ff", fontSize: "1.25rem" }}></i>
      ) : (
        <i className="fi fi-rr-minus" style={{ color: "var(--theme-border-hover)", fontSize: "1.25rem" }}></i>
      )}
    </TableCell>
  )
}

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
          opacity: 0.02,
          zIndex: 0,
        }}
      />

      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        <Box sx={{ textAlign: "center", mb: 6 }}>
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
            Road Bike Only Specialists
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
          <Typography
            sx={{
              color: "var(--theme-text-muted)",
              maxWidth: 680,
              mx: "auto",
              lineHeight: 1.7,
            }}
          >
            We specialise exclusively in road bicycle servicing, repairs and maintenance. Prices are in AUD and include GST.
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
                color: "#00d4ff",
              },
              "& .MuiTabs-indicator": {
                backgroundColor: "#00d4ff",
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
                  <Table sx={{ minWidth: 680 }}>
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
                            width: "46%",
                          }}
                        >
                          Service inclusion
                        </TableCell>
                        {packages.map((pkg) => (
                          <TableCell
                            key={pkg.name}
                            align="center"
                            sx={{
                              fontWeight: 700,
                              backgroundColor: pkg.featured ? "rgba(0, 212, 255, 0.08)" : "var(--theme-bg-primary)",
                              borderBottom: pkg.featured ? "2px solid #00d4ff" : "1px solid var(--theme-border)",
                              borderLeft: pkg.featured ? "2px solid #00d4ff" : "1px solid var(--theme-border)",
                              borderRight: pkg.featured ? "2px solid #00d4ff" : undefined,
                              position: "relative",
                              width: "18%",
                            }}
                          >
                            {pkg.featured && (
                              <Box
                                sx={{
                                  position: "absolute",
                                  top: 8,
                                  left: "50%",
                                  transform: "translateX(-50%)",
                                  backgroundColor: "#00d4ff",
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
                            )}
                            <Typography
                              sx={{
                                fontWeight: 700,
                                color: pkg.featured ? "var(--theme-text-primary)" : "var(--theme-text-secondary)",
                                mb: 0.5,
                                fontSize: "0.875rem",
                                mt: pkg.featured ? 3 : 0,
                                textTransform: "uppercase",
                              }}
                            >
                              {pkg.name}
                            </Typography>
                            <Typography sx={{ fontWeight: 700, color: "#00d4ff", fontSize: "1.5rem" }}>
                              {pkg.price}
                            </Typography>
                          </TableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {features.map((feature) => (
                        <TableRow
                          key={feature.name}
                          sx={{
                            "&:nth-of-type(even)": {
                              backgroundColor: "var(--theme-bg-secondary)",
                            },
                            "&:last-child td": {
                              borderBottom: 0,
                            },
                            "&:hover": {
                              backgroundColor: "rgba(0, 212, 255, 0.03)",
                            },
                          }}
                        >
                          <TableCell sx={{ py: 2, color: "var(--theme-text-muted)", fontSize: "0.875rem", borderBottom: "1px solid var(--theme-border)" }}>
                            {feature.name}
                          </TableCell>
                          <CheckCell included={feature.standard} />
                          <CheckCell included={feature.deluxe} featured />
                          <CheckCell included={feature.ultimate} />
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>

                <Box sx={{ mt: 3 }}>
                  <Typography sx={{ color: "var(--theme-text-muted)", fontSize: "0.8rem", lineHeight: 1.7, mb: 1.5 }}>
                    * Minor component replacement labour (Deluxe and Ultimate) covers labour to replace tyres, inner tubes, chains, cassettes, brake pads, brake rotors, gear and brake cables (inner and outer), derailleur hangers, bar tape and other minor components. It does not include bottom bracket replacement, headset bearing replacement, wheel bearing replacement, hydraulic brake bleeding (except Ultimate), or repairs that need extensive disassembly or specialist labour.
                  </Typography>
                  <Typography sx={{ color: "var(--theme-text-muted)", fontSize: "0.8rem", lineHeight: 1.7, mb: 1.5 }}>
                    ** Bearing servicing (Ultimate) covers cleaning, inspection, lubrication and reassembly of accessible, serviceable bearing assemblies. Replacement of bottom brackets, headset bearings and wheel bearings is quoted separately.
                  </Typography>
                  <Typography sx={{ color: "var(--theme-text-muted)", fontSize: "0.8rem", lineHeight: 1.7 }}>
                    All replacement parts and consumables are charged separately. Additional labour is quoted before proceeding. All prices include GST.
                  </Typography>
                </Box>

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
                    Additional workshop services
                  </Typography>
                  <Box
                    sx={{
                      display: "grid",
                      gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                      gap: 2,
                    }}
                  >
                    {extraServices.map((service) => (
                      <Paper
                        key={service.name}
                        elevation={0}
                        sx={{
                          p: 3,
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          gap: 2,
                          backgroundColor: "var(--theme-bg-secondary)",
                          border: "1px solid var(--theme-border)",
                          borderRadius: 0,
                          transition: "all 0.3s ease",
                          "&:hover": {
                            borderColor: "#00d4ff",
                            boxShadow: "0 0 20px rgba(0, 212, 255, 0.1)",
                          },
                        }}
                      >
                        <Typography sx={{ fontWeight: 600, color: "var(--theme-text-secondary)", fontSize: "0.875rem" }}>
                          {service.name}
                        </Typography>
                        <Typography sx={{ fontWeight: 700, color: "#00d4ff", fontSize: "1.1rem", whiteSpace: "nowrap" }}>
                          {service.price}
                        </Typography>
                      </Paper>
                    ))}
                  </Box>
                  <Typography sx={{ mt: 2, color: "var(--theme-text-muted)", fontSize: "0.8rem", textAlign: "center" }}>
                    Replacement parts and consumables are charged separately unless otherwise specified.
                  </Typography>
                </Box>

                <Accordion
                  disableGutters
                  elevation={0}
                  sx={{
                    mt: 4,
                    backgroundColor: "transparent",
                    border: "1px solid var(--theme-border)",
                    "&:before": { display: "none" },
                  }}
                >
                  <AccordionSummary expandIcon={<i className="fi fi-rr-angle-small-down" style={{ color: "#00d4ff" }}></i>}>
                    <Typography sx={{ fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", fontSize: "0.875rem" }}>
                      Workshop terms
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Box component="ol" sx={{ m: 0, pl: 2.5, color: "var(--theme-text-muted)", "& li": { mb: 1.5, lineHeight: 1.7, fontSize: "0.875rem" } }}>
                      {workshopTerms.map((term) => (
                        <li key={term}>{term}</li>
                      ))}
                    </Box>
                    <Typography sx={{ mt: 2, color: "var(--theme-text-secondary)", fontSize: "0.875rem", lineHeight: 1.7 }}>
                      Consumer rights and guarantees under the Australian Consumer Law continue to apply.
                    </Typography>
                  </AccordionDetails>
                </Accordion>

                <Box sx={{ mt: 5, textAlign: "center" }}>
                  <Button
                    variant="contained"
                    size="large"
                    onClick={() => handleScroll("#contact")}
                    sx={{
                      backgroundColor: "#00d4ff",
                      color: "#000000",
                      fontWeight: 700,
                      fontSize: "0.875rem",
                      px: 5,
                      py: 1.5,
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                      borderRadius: 0,
                      boxShadow: "0 4px 20px rgba(0, 212, 255, 0.3)",
                      "&:hover": {
                        backgroundColor: "#0099cc",
                        boxShadow: "0 6px 30px rgba(0, 212, 255, 0.4)",
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
                  Every build is unique – pricing depends on components and specifications. Whether you&apos;re looking for a
                  race-ready road bike or a custom triathlon setup, I&apos;ll work with you to create the perfect machine for
                  your needs.
                </Typography>

                <Button
                  variant="contained"
                  size="large"
                  href="mailto:bicyclerepairs2u@gmail.com?subject=Custom Build Inquiry"
                  sx={{
                    backgroundColor: "#00d4ff",
                    color: "#000000",
                    fontWeight: 700,
                    fontSize: "0.875rem",
                    px: 5,
                    py: 1.5,
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    borderRadius: 0,
                    boxShadow: "0 4px 20px rgba(0, 212, 255, 0.3)",
                    "&:hover": {
                      backgroundColor: "#0099cc",
                      boxShadow: "0 6px 30px rgba(0, 212, 255, 0.4)",
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
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ color: "#00d4ff" }}>
              <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z" fill="currentColor" />
            </svg>
          }
          sx={{
            mt: 5,
            borderRadius: 0,
            backgroundColor: "rgba(0, 212, 255, 0.08)",
            border: "1px solid rgba(0, 212, 255, 0.3)",
            maxWidth: "1000px",
            mx: "auto",
            "& .MuiAlert-icon": {
              color: "#00d4ff",
            },
          }}
        >
          <Typography sx={{ fontWeight: 600, color: "var(--theme-text-secondary)", fontSize: "0.875rem" }}>
            Road bikes only. We do not service e-bikes. We specialise in non-electric road bicycles.
          </Typography>
        </Alert>
      </Container>
    </Box>
  )
}
