"use client"

import { useState } from "react"
import {
  Box,
  Container,
  Typography,
  Paper,
  Stack,
  Divider,
  Button,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Chip,
  Grid,
} from "@mui/material"
import Link from "next/link"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"

export default function FirstBikeGuide() {
  const [expandedAccordion, setExpandedAccordion] = useState<string | false>(false)

  const handleAccordionChange = (panel: string) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpandedAccordion(isExpanded ? panel : false)
  }
  const bikeTypes = [
    {
      title: "Road Bikes",
      icon: "fi fi-rr-biking",
      description: "Lightweight bikes designed for speed and efficiency on paved roads",
      bestFor: ["Long distance riding", "Group rides", "General fitness", "Commuting"],
      features: ["Drop handlebars", "Thin tires (23-28mm)", "Multiple gears", "Lightweight frame"],
    },
    {
      title: "Triathlon Bikes",
      icon: "fi fi-rr-running",
      description: "Aerodynamic bikes optimized for time trials and triathlon events",
      bestFor: ["Triathlons", "Time trials", "Solo riding", "Maximum speed"],
      features: ["Aero bars", "Aggressive geometry", "Integrated storage", "Aerodynamic frame"],
    },
  ]

  const essentialChecks = [
    { text: "Frame is the correct size for your height and inseam", icon: "fi fi-rr-ruler-combined" },
    { text: "No cracks, dents, or damage to the frame or fork", icon: "fi fi-rr-shield-check" },
    { text: "Wheels spin true without wobbles or brake rub", icon: "fi fi-rr-refresh" },
    { text: "Brakes engage smoothly and stop effectively", icon: "fi fi-rr-hand" },
    { text: "Gears shift smoothly through all combinations", icon: "fi fi-rr-settings" },
    { text: "Handlebar tape and saddle are in good condition", icon: "fi fi-rr-check" },
    { text: "Chain and drivetrain show minimal wear", icon: "fi fi-rr-link" },
    { text: "Tires have good tread and no cracks", icon: "fi fi-rr-circle" },
  ]

  const commonMistakes = [
    {
      title: "Buying the Wrong Size",
      description: "The most common mistake. A bike that's too big or small will be uncomfortable and may cause injury.",
      solution: "Always use our bike sizing calculator and test ride before buying.",
    },
    {
      title: "Focusing Only on Price",
      description: "The cheapest bike isn't always the best value. Consider long-term costs and quality.",
      solution: "Set a realistic budget but prioritize fit and condition over the lowest price.",
    },
    {
      title: "Ignoring Bike Geometry",
      description: "Race bikes are aggressive and uncomfortable for beginners. Endurance geometry is more forgiving.",
      solution: "Choose endurance or sportive geometry for your first road bike.",
    },
    {
      title: "Not Getting a Professional Fit",
      description: "Even the right size can be uncomfortable without proper adjustments.",
      solution: "Invest in a basic bike fit to optimize saddle height, handlebar position, and reach.",
    },
  ]

  const budgetGuide = [
    {
      range: "Under $1,000",
      title: "Entry Level",
      description: "Quality second-hand bikes with aluminum frames and reliable components",
      whatToExpect: [
        "Aluminum frame",
        "8-10 speed groupset",
        "Caliper or mechanical disc brakes",
        "Basic wheelset",
      ],
    },
    {
      range: "$1,000 - $2,500",
      title: "Intermediate",
      description: "Better used bikes or entry-level new bikes with improved components",
      whatToExpect: [
        "Aluminum or carbon frame",
        "11 speed groupset (Shimano 105/Ultegra)",
        "Quality brakes",
        "Better wheelset",
      ],
    },
    {
      range: "$2,500+",
      title: "Advanced",
      description: "High-quality bikes with carbon frames and premium components",
      whatToExpect: [
        "Full carbon frame",
        "Shimano Ultegra/Dura-Ace or SRAM Force",
        "Hydraulic disc brakes",
        "Premium wheels",
      ],
    },
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
              variant="h1"
              sx={{
                fontSize: { xs: "2.5rem", md: "4rem" },
                fontWeight: 700,
                color: "#212121",
                mb: 2,
                letterSpacing: "-1px",
              }}
            >
              Buying Your First Road Bike
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontSize: "1.2rem",
                color: "#757575",
                lineHeight: 1.7,
                maxWidth: "800px",
                mx: "auto",
              }}
            >
              A comprehensive guide to help you choose the perfect bike, avoid common mistakes, and start your cycling
              journey with confidence
            </Typography>
          </Box>

          {/* Introduction */}
          <Paper
            elevation={0}
            sx={{
              p: { xs: 3, md: 5 },
              mb: 5,
              borderRadius: "12px",
              backgroundColor: "#ffffff",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "flex-start", gap: 2, mb: 3 }}>
              <i className="fi fi-rr-lightbulb-on" style={{ color: "#0288d1", fontSize: "2.5rem" }}></i>
              <Box>
                <Typography variant="h4" sx={{ fontWeight: 700, color: "#212121", mb: 2 }}>
                  Why This Guide Matters
                </Typography>
                <Typography variant="body1" sx={{ color: "#424242", lineHeight: 1.8, mb: 2 }}>
                  Buying your first road bike is an exciting milestone, but it can also be overwhelming. With so many
                  options, technical jargon, and varying price points, it's easy to make costly mistakes.
                </Typography>
                <Typography variant="body1" sx={{ color: "#424242", lineHeight: 1.8 }}>
                  At Bicycles2U, we've helped hundreds of riders find their perfect bike. This guide distills our
                  expertise into actionable advice to help you make an informed decision and start riding with
                  confidence.
                </Typography>
              </Box>
            </Box>
          </Paper>

          {/* Getting the Right Size */}
          <Box sx={{ mb: 5 }}>
            <Typography
              variant="h3"
              sx={{
                fontSize: { xs: "2rem", md: "2.5rem" },
                fontWeight: 700,
                color: "#212121",
                mb: 3,
                display: "flex",
                alignItems: "center",
                gap: 2,
              }}
            >
              <i className="fi fi-rr-ruler-combined" style={{ color: "#0288d1" }}></i>
              Step 1: Getting the Right Size
            </Typography>

            <Paper
              elevation={0}
              sx={{
                p: { xs: 3, md: 4 },
                borderRadius: "12px",
                backgroundColor: "#e3f2fd",
                border: "2px solid #0288d1",
                mb: 3,
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 600, color: "#212121", mb: 2 }}>
                <i className="fi fi-rr-exclamation" style={{ marginRight: "8px", color: "#0288d1" }}></i>
                The Most Important Decision
              </Typography>
              <Typography variant="body1" sx={{ color: "#424242", lineHeight: 1.8, mb: 3 }}>
                Bike fit is THE most critical factor when buying a bike. A bike that's too large or too small will be
                uncomfortable, inefficient, and potentially cause injury - no matter how expensive or high-quality it
                is.
              </Typography>

              <Box sx={{ textAlign: "center" }}>
                <Button
                  component={Link}
                  href="/bike-sizing"
                  variant="contained"
                  size="large"
                  sx={{
                    backgroundColor: "#0288d1",
                    color: "#ffffff",
                    fontWeight: 600,
                    fontSize: "1.1rem",
                    px: 4,
                    py: 2,
                    textTransform: "none",
                    borderRadius: "8px",
                    "&:hover": {
                      backgroundColor: "#0277bd",
                    },
                  }}
                >
                  <i className="fi fi-rr-calculator" style={{ marginRight: "12px", fontSize: "1.2rem" }}></i>
                  Use Our Bike Sizing Calculator
                </Button>
              </Box>
            </Paper>

            <Grid container spacing={3}>
              <Grid size={{ xs: 12, md: 6 }}>
                <Card
                  elevation={0}
                  sx={{
                    height: "100%",
                    borderRadius: "12px",
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Typography variant="h6" sx={{ fontWeight: 600, color: "#212121", mb: 2 }}>
                      <i className="fi fi-rr-angle-down" style={{ marginRight: "8px", color: "#0288d1" }}></i>
                      Too Small
                    </Typography>
                    <List dense>
                      <ListItem>
                        <ListItemIcon sx={{ minWidth: 35 }}>
                          <i className="fi fi-rr-cross-small" style={{ color: "#d32f2f", fontSize: "1.2rem" }}></i>
                        </ListItemIcon>
                        <ListItemText
                          primary="Cramped riding position"
                          primaryTypographyProps={{ variant: "body2", color: "#424242" }}
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon sx={{ minWidth: 35 }}>
                          <i className="fi fi-rr-cross-small" style={{ color: "#d32f2f", fontSize: "1.2rem" }}></i>
                        </ListItemIcon>
                        <ListItemText
                          primary="Knee pain from excessive bend"
                          primaryTypographyProps={{ variant: "body2", color: "#424242" }}
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon sx={{ minWidth: 35 }}>
                          <i className="fi fi-rr-cross-small" style={{ color: "#d32f2f", fontSize: "1.2rem" }}></i>
                        </ListItemIcon>
                        <ListItemText
                          primary="Poor power transfer"
                          primaryTypographyProps={{ variant: "body2", color: "#424242" }}
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon sx={{ minWidth: 35 }}>
                          <i className="fi fi-rr-cross-small" style={{ color: "#d32f2f", fontSize: "1.2rem" }}></i>
                        </ListItemIcon>
                        <ListItemText
                          primary="Difficult to control at speed"
                          primaryTypographyProps={{ variant: "body2", color: "#424242" }}
                        />
                      </ListItem>
                    </List>
                  </CardContent>
                </Card>
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <Card
                  elevation={0}
                  sx={{
                    height: "100%",
                    borderRadius: "12px",
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Typography variant="h6" sx={{ fontWeight: 600, color: "#212121", mb: 2 }}>
                      <i className="fi fi-rr-angle-up" style={{ marginRight: "8px", color: "#0288d1" }}></i>
                      Too Large
                    </Typography>
                    <List dense>
                      <ListItem>
                        <ListItemIcon sx={{ minWidth: 35 }}>
                          <i className="fi fi-rr-cross-small" style={{ color: "#d32f2f", fontSize: "1.2rem" }}></i>
                        </ListItemIcon>
                        <ListItemText
                          primary="Overextended reach to handlebars"
                          primaryTypographyProps={{ variant: "body2", color: "#424242" }}
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon sx={{ minWidth: 35 }}>
                          <i className="fi fi-rr-cross-small" style={{ color: "#d32f2f", fontSize: "1.2rem" }}></i>
                        </ListItemIcon>
                        <ListItemText
                          primary="Lower back and neck strain"
                          primaryTypographyProps={{ variant: "body2", color: "#424242" }}
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon sx={{ minWidth: 35 }}>
                          <i className="fi fi-rr-cross-small" style={{ color: "#d32f2f", fontSize: "1.2rem" }}></i>
                        </ListItemIcon>
                        <ListItemText
                          primary="Difficulty standing over top tube"
                          primaryTypographyProps={{ variant: "body2", color: "#424242" }}
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon sx={{ minWidth: 35 }}>
                          <i className="fi fi-rr-cross-small" style={{ color: "#d32f2f", fontSize: "1.2rem" }}></i>
                        </ListItemIcon>
                        <ListItemText
                          primary="Poor handling and maneuverability"
                          primaryTypographyProps={{ variant: "body2", color: "#424242" }}
                        />
                      </ListItem>
                    </List>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Box>

          {/* Understanding Bike Types */}
          <Box sx={{ mb: 5 }}>
            <Typography
              variant="h3"
              sx={{
                fontSize: { xs: "2rem", md: "2.5rem" },
                fontWeight: 700,
                color: "#212121",
                mb: 3,
                display: "flex",
                alignItems: "center",
                gap: 2,
              }}
            >
              <i className="fi fi-rr-bike" style={{ color: "#0288d1" }}></i>
              Step 2: Understanding Bike Types
            </Typography>

            <Typography variant="body1" sx={{ color: "#424242", lineHeight: 1.8, mb: 4 }}>
              At Bicycles2U, we specialize in road and triathlon bikes - lightweight, fast bicycles designed for paved
              surfaces. Here's what makes each type unique:
            </Typography>

            <Grid container spacing={3}>
              {bikeTypes.map((type, index) => (
                <Grid size={{ xs: 12, md: 6 }} key={index}>
                  <Card
                    elevation={0}
                    sx={{
                      height: "100%",
                      borderRadius: "12px",
                      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
                      border: "2px solid #e0e0e0",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        border: "2px solid #0288d1",
                        transform: "translateY(-4px)",
                        boxShadow: "0 8px 20px rgba(2, 136, 209, 0.2)",
                      },
                    }}
                  >
                    <CardContent sx={{ p: 4 }}>
                      <Box sx={{ textAlign: "center", mb: 3 }}>
                        <i className={type.icon} style={{ fontSize: "3rem", color: "#0288d1" }}></i>
                        <Typography variant="h5" sx={{ fontWeight: 700, color: "#212121", mt: 2 }}>
                          {type.title}
                        </Typography>
                      </Box>

                      <Typography variant="body1" sx={{ color: "#424242", lineHeight: 1.7, mb: 3 }}>
                        {type.description}
                      </Typography>

                      <Divider sx={{ my: 2 }} />

                      <Typography variant="subtitle2" sx={{ fontWeight: 600, color: "#212121", mb: 1 }}>
                        Best For:
                      </Typography>
                      <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap sx={{ mb: 2 }}>
                        {type.bestFor.map((item, idx) => (
                          <Chip
                            key={idx}
                            label={item}
                            size="small"
                            sx={{
                              backgroundColor: "#e3f2fd",
                              color: "#0288d1",
                              fontWeight: 500,
                            }}
                          />
                        ))}
                      </Stack>

                      <Typography variant="subtitle2" sx={{ fontWeight: 600, color: "#212121", mb: 1 }}>
                        Key Features:
                      </Typography>
                      <List dense>
                        {type.features.map((feature, idx) => (
                          <ListItem key={idx} sx={{ py: 0.5 }}>
                            <ListItemIcon sx={{ minWidth: 30 }}>
                              <i className="fi fi-rr-check" style={{ color: "#0288d1", fontSize: "1rem" }}></i>
                            </ListItemIcon>
                            <ListItemText
                              primary={feature}
                              primaryTypographyProps={{ variant: "body2", color: "#424242" }}
                            />
                          </ListItem>
                        ))}
                      </List>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>

            <Paper
              elevation={0}
              sx={{
                p: 3,
                mt: 3,
                borderRadius: "12px",
                backgroundColor: "#fff3e0",
                border: "1px solid #ffb74d",
              }}
            >
              <Typography variant="subtitle1" sx={{ fontWeight: 600, color: "#212121", mb: 1 }}>
                <i className="fi fi-rr-bulb" style={{ marginRight: "8px", color: "#f57c00" }}></i>
                For Your First Bike
              </Typography>
              <Typography variant="body2" sx={{ color: "#424242", lineHeight: 1.7 }}>
                We recommend starting with a road bike with endurance geometry rather than a race bike. Endurance bikes
                have a more upright, comfortable position that's better for beginners, while still being fast and
                capable for longer rides.
              </Typography>
            </Paper>
          </Box>

          {/* Budget Guide */}
          <Box sx={{ mb: 5 }}>
            <Typography
              variant="h3"
              sx={{
                fontSize: { xs: "2rem", md: "2.5rem" },
                fontWeight: 700,
                color: "#212121",
                mb: 3,
                display: "flex",
                alignItems: "center",
                gap: 2,
              }}
            >
              <i className="fi fi-rr-piggy-bank" style={{ color: "#0288d1" }}></i>
              Step 3: Setting Your Budget
            </Typography>

            <Typography variant="body1" sx={{ color: "#424242", lineHeight: 1.8, mb: 4 }}>
              Your budget will determine what level of bike you can afford. Here's what to expect at different price
              points:
            </Typography>

            <Stack spacing={3}>
              {budgetGuide.map((budget, index) => (
                <Card
                  key={index}
                  elevation={0}
                  sx={{
                    borderRadius: "12px",
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
                  }}
                >
                  <CardContent sx={{ p: 4 }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
                      <Chip
                        label={budget.range}
                        sx={{
                          backgroundColor: "#0288d1",
                          color: "#ffffff",
                          fontWeight: 700,
                          fontSize: "1rem",
                          px: 2,
                          py: 2.5,
                        }}
                      />
                      <Typography variant="h5" sx={{ fontWeight: 700, color: "#212121" }}>
                        {budget.title}
                      </Typography>
                    </Box>

                    <Typography variant="body1" sx={{ color: "#424242", lineHeight: 1.7, mb: 3 }}>
                      {budget.description}
                    </Typography>

                    <Typography variant="subtitle2" sx={{ fontWeight: 600, color: "#212121", mb: 1 }}>
                      What to Expect:
                    </Typography>
                    <Grid container spacing={2}>
                      {budget.whatToExpect.map((item, idx) => (
                        <Grid size={{ xs: 12, sm: 6 }} key={idx}>
                          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                            <i className="fi fi-rr-check-circle" style={{ color: "#4caf50", fontSize: "1.2rem" }}></i>
                            <Typography variant="body2" sx={{ color: "#424242" }}>
                              {item}
                            </Typography>
                          </Box>
                        </Grid>
                      ))}
                    </Grid>
                  </CardContent>
                </Card>
              ))}
            </Stack>

            <Paper
              elevation={0}
              sx={{
                p: 3,
                mt: 3,
                borderRadius: "12px",
                backgroundColor: "#e8f5e9",
                border: "1px solid #66bb6a",
              }}
            >
              <Typography variant="subtitle1" sx={{ fontWeight: 600, color: "#212121", mb: 1 }}>
                <i className="fi fi-rr-thumbs-up" style={{ marginRight: "8px", color: "#2e7d32" }}></i>
                Our Recommendation
              </Typography>
              <Typography variant="body2" sx={{ color: "#424242", lineHeight: 1.7 }}>
                For most beginners, a quality second-hand bike in the $1,000-$2,500 range offers the best value. You'll
                get a bike with good components that will last for years, without overspending on features you don't
                need yet.
              </Typography>
            </Paper>
          </Box>

          {/* Essential Checks */}
          <Box sx={{ mb: 5 }}>
            <Typography
              variant="h3"
              sx={{
                fontSize: { xs: "2rem", md: "2.5rem" },
                fontWeight: 700,
                color: "#212121",
                mb: 3,
                display: "flex",
                alignItems: "center",
                gap: 2,
              }}
            >
              <i className="fi fi-rr-list-check" style={{ color: "#0288d1" }}></i>
              Step 4: Essential Pre-Purchase Checks
            </Typography>

            <Paper
              elevation={0}
              sx={{
                p: { xs: 3, md: 4 },
                borderRadius: "12px",
                backgroundColor: "#ffffff",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
                mb: 3,
              }}
            >
              <Typography variant="body1" sx={{ color: "#424242", lineHeight: 1.8, mb: 3 }}>
                Before buying any bike - new or used - make sure to check these critical items:
              </Typography>

              <Box sx={{ maxWidth: "900px", mx: "auto" }}>
                <Grid container spacing={2} justifyContent="center" alignItems="stretch">
                  {essentialChecks.map((check, index) => (
                    <Grid size={{ xs: 12, md: 6 }} key={index} sx={{ display: "flex" }}>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "flex-start",
                          gap: 2,
                          p: 2,
                          borderRadius: "8px",
                          backgroundColor: "#fafafa",
                          border: "1px solid #e0e0e0",
                          width: "100%",
                        }}
                      >
                        <i className={check.icon} style={{ color: "#0288d1", fontSize: "1.5rem", marginTop: "2px" }}></i>
                        <Typography variant="body2" sx={{ color: "#424242", lineHeight: 1.6 }}>
                          {check.text}
                        </Typography>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </Paper>

            <Paper
              elevation={0}
              sx={{
                p: 3,
                borderRadius: "12px",
                backgroundColor: "#fff3e0",
                border: "1px solid #ffb74d",
              }}
            >
              <Typography variant="subtitle1" sx={{ fontWeight: 600, color: "#212121", mb: 1 }}>
                <i className="fi fi-rr-comment-info" style={{ marginRight: "8px", color: "#f57c00" }}></i>
                Not Sure What to Look For?
              </Typography>
              <Typography variant="body2" sx={{ color: "#424242", lineHeight: 1.7 }}>
                Bring the bike to us for a pre-purchase inspection! We'll thoroughly check the frame, components, and
                overall condition to help you make an informed decision.
              </Typography>
            </Paper>
          </Box>

          {/* Common Mistakes */}
          <Box sx={{ mb: 5 }}>
            <Typography
              variant="h3"
              sx={{
                fontSize: { xs: "2rem", md: "2.5rem" },
                fontWeight: 700,
                color: "#212121",
                mb: 3,
                display: "flex",
                alignItems: "center",
                gap: 2,
              }}
            >
              <i className="fi fi-rr-exclamation" style={{ color: "#0288d1" }}></i>
              Common Mistakes to Avoid
            </Typography>

            <Stack spacing={2}>
              {commonMistakes.map((mistake, index) => (
                <Accordion
                  key={index}
                  expanded={expandedAccordion === `panel${index}`}
                  onChange={handleAccordionChange(`panel${index}`)}
                  elevation={0}
                  sx={{
                    border: "1px solid #e0e0e0",
                    borderRadius: "8px !important",
                    "&:before": { display: "none" },
                    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.06)",
                  }}
                >
                  <AccordionSummary
                    expandIcon={
                      <Box
                        component="i"
                        className="fi fi-rr-angle-down"
                        sx={{
                          fontSize: "1.2rem",
                          color: "#424242",
                          display: "flex",
                          alignItems: "center",
                          transition: "transform 0.3s",
                          transform: expandedAccordion === `panel${index}` ? "rotate(180deg)" : "rotate(0deg)",
                        }}
                      />
                    }
                    sx={{
                      "& .MuiAccordionSummary-content": {
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                      },
                    }}
                  >
                    <i className="fi fi-rr-cross-circle" style={{ color: "#d32f2f", fontSize: "1.5rem" }}></i>
                    <Typography variant="h6" sx={{ fontWeight: 600, color: "#212121" }}>
                      {mistake.title}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Box sx={{ pl: 5 }}>
                      <Typography variant="body1" sx={{ color: "#424242", lineHeight: 1.7, mb: 2 }}>
                        <strong>Why it's a problem:</strong> {mistake.description}
                      </Typography>
                      <Box
                        sx={{
                          p: 2,
                          borderRadius: "8px",
                          backgroundColor: "#e8f5e9",
                          borderLeft: "4px solid #4caf50",
                        }}
                      >
                        <Typography variant="body2" sx={{ color: "#212121", lineHeight: 1.6 }}>
                          <strong>
                            <i className="fi fi-rr-lightbulb-on" style={{ marginRight: "8px", color: "#2e7d32" }}></i>
                            Solution:
                          </strong>{" "}
                          {mistake.solution}
                        </Typography>
                      </Box>
                    </Box>
                  </AccordionDetails>
                </Accordion>
              ))}
            </Stack>
          </Box>

          {/* Next Steps */}
          <Paper
            elevation={0}
            sx={{
              p: { xs: 3, md: 5 },
              borderRadius: "12px",
              backgroundColor: "#0288d1",
              color: "#ffffff",
              textAlign: "center",
            }}
          >
            <i className="fi fi-rr-rocket-launch" style={{ fontSize: "3rem", marginBottom: "16px" }}></i>
            <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
              Ready to Find Your Perfect Bike?
            </Typography>
            <Typography variant="body1" sx={{ lineHeight: 1.8, mb: 4, maxWidth: "700px", mx: "auto" }}>
              Whether you're looking for expert advice, a pre-purchase inspection, or help finding the right bike for
              your needs, we're here to help. Our team specializes in road and triathlon bikes, and we're passionate
              about getting you on the right bike.
            </Typography>

            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={2}
              justifyContent="center"
              alignItems="center"
            >
              <Button
                component={Link}
                href="/bike-sizing"
                variant="contained"
                size="large"
                sx={{
                  backgroundColor: "#ffffff",
                  color: "#0288d1",
                  fontWeight: 600,
                  fontSize: "1rem",
                  px: 4,
                  py: 1.5,
                  textTransform: "none",
                  borderRadius: "8px",
                  "&:hover": {
                    backgroundColor: "#f5f5f5",
                  },
                }}
              >
                <i className="fi fi-rr-calculator" style={{ marginRight: "12px", fontSize: "1.2rem" }}></i>
                Calculate Your Size
              </Button>

              <Button
                variant="outlined"
                size="large"
                href="/#contact"
                onClick={(e) => {
                  e.preventDefault()
                  window.location.href = "/#contact"
                }}
                sx={{
                  borderColor: "#ffffff",
                  color: "#ffffff",
                  fontWeight: 600,
                  fontSize: "1rem",
                  px: 4,
                  py: 1.5,
                  textTransform: "none",
                  borderRadius: "8px",
                  "&:hover": {
                    borderColor: "#ffffff",
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                  },
                }}
              >
                <i className="fi fi-rr-envelope" style={{ marginRight: "12px", fontSize: "1.2rem" }}></i>
                Contact Us for Advice
              </Button>
            </Stack>
          </Paper>
        </Container>
      </Box>
      <Footer />
    </>
  )
}
