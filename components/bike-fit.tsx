"use client"

import { Box, Container, Typography, Paper, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"

const packages = [
  {
    name: "Basic Bike Fit",
    price: "$99",
    withBike: "Free",
    summary: "Essential adjustments for new cyclists, recreational riders and anyone looking to improve comfort.",
    includes: [
      "Saddle height adjustment",
      "Saddle fore/aft adjustment",
      "Handlebar height and reach assessment",
      "Basic riding position assessment",
      "On-bike pedalling observation",
      "Minor positional adjustments",
    ],
  },
  {
    name: "Comprehensive Road Bike Fit",
    price: "$199",
    withBike: "$159",
    summary: "A more precise position for regular road cyclists, including road bikes with clip-on aero bars.",
    includes: [
      "Everything in the Basic Bike Fit",
      "Detailed saddle and cockpit positioning",
      "Cleat positioning and adjustment",
      "Knee, hip and torso angle assessment",
      "Saddle suitability assessment",
      "Road bike clip-on aero bar positioning",
      "Riding position optimisation",
      "Written bike fit measurement sheet",
      "Personalised component recommendations",
    ],
  },
  {
    name: "Race & Time Trial Bike Fit",
    price: "$299",
    withBike: "$239",
    summary: "For competitive road cyclists, dedicated time trial bikes and triathlon bikes.",
    includes: [
      "Everything in the Comprehensive Road Bike Fit",
      "Race-specific riding position optimisation",
      "TT aero bar extension and pad positioning",
      "Armrest height, width and reach adjustments",
      "Saddle positioning for aerodynamic riding",
      "Detailed riding angle assessments",
      "Assessment of sustainable aero positioning",
      "Written bike fit measurement sheet",
      "Component and setup recommendations",
      "One complimentary 30-minute follow-up adjustment session",
    ],
  },
]

const comparison: { name: string; values: string[] }[] = [
  { name: "Standard price (inc. GST)", values: ["$99", "$199", "$299"] },
  { name: "With a Bicycles2U bike purchase", values: ["Free", "$159", "$239"] },
  { name: "Saddle height and fore/aft adjustment", values: ["Yes", "Yes", "Yes"] },
  { name: "Handlebar height and reach", values: ["Yes", "Yes", "Yes"] },
  { name: "Pedalling position assessment", values: ["Basic", "Detailed", "Detailed"] },
  { name: "Cleat positioning and adjustment", values: ["—", "Yes", "Yes"] },
  { name: "Knee, hip and torso angle checks", values: ["—", "Yes", "Yes"] },
  { name: "Cockpit optimisation", values: ["Basic", "Yes", "Yes"] },
  { name: "Saddle suitability assessment", values: ["—", "Yes", "Yes"] },
  { name: "Road bike clip-on aero bars", values: ["—", "Yes", "Yes"] },
  { name: "Dedicated TT / triathlon bike fitting", values: ["—", "—", "Yes"] },
  { name: "Aero pad and extension adjustments", values: ["—", "—", "Yes"] },
  { name: "Race position optimisation", values: ["—", "—", "Yes"] },
  { name: "Written measurement sheet", values: ["—", "Yes", "Yes"] },
  { name: "Component recommendations", values: ["—", "Yes", "Yes"] },
  { name: "Follow-up adjustment", values: ["—", "—", "30 min"] },
]

const extras = [
  { name: "Cleat fitting and adjustment", price: "$59", duration: "20–30 minutes" },
  { name: "Saddle positioning adjustment", price: "$49", duration: "15–20 minutes" },
  { name: "Transfer an existing fit to another road bike", price: "$119", duration: "45–60 minutes" },
  { name: "Additional 30-minute fitting adjustment", price: "$59", duration: "30 minutes" },
  { name: "Pre-purchase bike sizing consultation", price: "$79", duration: "20–30 minutes" },
]

const durations = [
  { name: "Basic Bike Fit", duration: "30–45 minutes" },
  { name: "Comprehensive Road Bike Fit", duration: "60–90 minutes" },
  { name: "Race & TT Bike Fit", duration: "75–90 minutes" },
]

const terms = [
  "All prices are in Australian dollars and include GST.",
  "Bike fitting is available for conventional road bikes, road racing bikes and time trial or triathlon bikes only. No e-bikes.",
  "A complimentary Basic Bike Fit is included with every bicycle purchased from Bicycles2U.",
  "Discounted Comprehensive and Race & TT fits are available when booked within 30 days of buying a bicycle from Bicycles2U.",
  "Replacement components, including stems, saddles, handlebars, seatposts, cleats and aero bar components, are charged separately.",
  "Mechanical repairs and component installations outside the adjustments in the selected package may incur additional labour.",
  "Written measurement sheets are provided with Comprehensive and Race & TT fits only.",
  "Adjustments depend on the compatibility and available adjustment range of the bicycle's existing components.",
  "The complimentary Race & TT follow-up must be booked within 30 days of the original fitting.",
  "The $79 pre-purchase sizing consultation is credited towards a bicycle purchased from Bicycles2U within 30 days.",
  "Bike fitting is not a medical or physiotherapy assessment and does not guarantee the prevention of injury or discomfort.",
]

export default function BikeFit() {
  return (
    <>
      <Navigation />
      <Box sx={{ backgroundColor: "var(--theme-bg-primary)", pt: { xs: 12, md: 14 }, pb: { xs: 8, md: 12 } }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: "center", mb: 6 }}>
            <Typography sx={{ fontSize: "0.625rem", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "#00d4ff", mb: 2 }}>
              Road Bike Only Specialists
            </Typography>
            <Typography variant="h2" sx={{ fontSize: { xs: "2rem", md: "3rem" }, fontWeight: 900, letterSpacing: "-0.04em", textTransform: "uppercase", mb: 2 }}>
              Bike Fitting
            </Typography>
            <Typography sx={{ color: "var(--theme-text-muted)", maxWidth: 720, mx: "auto", lineHeight: 1.7 }}>
              Whether you are new to road cycling, looking for more comfort, or setting a racing position, every road bike bought from Bicycles2U includes a free Basic Bike Fit.
            </Typography>
          </Box>

          <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1fr 1fr" }, gap: 2, mb: 6 }}>
            {packages.map((pkg) => (
              <Paper key={pkg.name} elevation={0} sx={{ p: 3, borderRadius: 0, border: "1px solid var(--theme-border)", backgroundColor: "var(--theme-bg-secondary)", display: "flex", flexDirection: "column" }}>
                <Typography sx={{ fontWeight: 800, textTransform: "uppercase", letterSpacing: "-0.02em", mb: 1 }}>{pkg.name}</Typography>
                <Typography sx={{ color: "#00d4ff", fontWeight: 800, fontSize: "2rem", lineHeight: 1 }}>{pkg.price}</Typography>
                <Typography sx={{ color: "var(--theme-text-muted)", fontSize: "0.875rem", mb: 2 }}>{pkg.withBike} with a bike purchased from us</Typography>
                <Typography sx={{ color: "var(--theme-text-secondary)", fontSize: "0.9rem", lineHeight: 1.6, mb: 2 }}>{pkg.summary}</Typography>
                <Box component="ul" sx={{ m: 0, pl: 2.2, color: "var(--theme-text-muted)", fontSize: "0.875rem", "& li": { mb: 0.75 } }}>
                  {pkg.includes.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </Box>
              </Paper>
            ))}
          </Box>

          <Paper elevation={0} sx={{ p: { xs: 2, md: 3 }, border: "1px solid rgba(0, 212, 255, 0.35)", backgroundColor: "rgba(0, 212, 255, 0.08)", borderRadius: 0, mb: 6 }}>
            <Typography sx={{ fontWeight: 800, textTransform: "uppercase", mb: 1 }}>Pre-purchase bike sizing consultation — $79</Typography>
            <Typography sx={{ color: "var(--theme-text-secondary)", lineHeight: 1.7, mb: 1.5 }}>
              Not sure which road bike size is right for you? The consultation covers rider height and inseam, recommended frame sizing, stack and reach, and an assessment of bikes you are considering.
            </Typography>
            <Typography sx={{ color: "var(--theme-text-secondary)", lineHeight: 1.7 }}>
              Buy a road bike from Bicycles2U within 30 days and the full $79 is credited towards the bicycle.
            </Typography>
          </Paper>

          <Typography sx={{ fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.04em", mb: 2 }}>Package comparison</Typography>
          <TableContainer component={Paper} elevation={0} sx={{ border: "1px solid var(--theme-border)", borderRadius: 0, mb: 6, overflowX: "auto" }}>
            <Table sx={{ minWidth: 680 }}>
              <TableHead>
                <TableRow>
                  {["Inclusion", "Basic", "Comprehensive", "Race & TT"].map((heading) => (
                    <TableCell key={heading} sx={{ fontWeight: 700, textTransform: "uppercase", fontSize: "0.75rem", letterSpacing: "0.04em", borderBottom: "1px solid var(--theme-border)" }}>
                      {heading}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {comparison.map((row) => (
                  <TableRow key={row.name}>
                    <TableCell sx={{ color: "var(--theme-text-secondary)", borderBottom: "1px solid var(--theme-border)" }}>{row.name}</TableCell>
                    {row.values.map((value, index) => (
                      <TableCell key={`${row.name}-${index}`} sx={{ borderBottom: "1px solid var(--theme-border)", fontWeight: value === "—" ? 400 : 600 }}>
                        {value}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1.4fr 0.8fr" }, gap: 3, mb: 6 }}>
            <Box>
              <Typography sx={{ fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.04em", mb: 2 }}>Additional fitting services</Typography>
              <Box sx={{ display: "grid", gap: 1.5 }}>
                {extras.map((item) => (
                  <Paper key={item.name} elevation={0} sx={{ p: 2, borderRadius: 0, border: "1px solid var(--theme-border)", display: "flex", justifyContent: "space-between", gap: 2, alignItems: "center" }}>
                    <Box>
                      <Typography sx={{ fontWeight: 600 }}>{item.name}</Typography>
                      <Typography sx={{ color: "var(--theme-text-muted)", fontSize: "0.8rem" }}>{item.duration}</Typography>
                    </Box>
                    <Typography sx={{ color: "#00d4ff", fontWeight: 800 }}>{item.price}</Typography>
                  </Paper>
                ))}
              </Box>
            </Box>
            <Box>
              <Typography sx={{ fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.04em", mb: 2 }}>Appointment length</Typography>
              {durations.map((item) => (
                <Paper key={item.name} elevation={0} sx={{ p: 2, mb: 1.5, borderRadius: 0, border: "1px solid var(--theme-border)" }}>
                  <Typography sx={{ fontWeight: 600 }}>{item.name}</Typography>
                  <Typography sx={{ color: "#00d4ff" }}>{item.duration}</Typography>
                </Paper>
              ))}
            </Box>
          </Box>

          <Typography sx={{ fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.04em", mb: 2 }}>Terms</Typography>
          <Box component="ul" sx={{ m: 0, mb: 5, pl: 2.5, color: "var(--theme-text-muted)", "& li": { mb: 1.25, lineHeight: 1.7 } }}>
            {terms.map((term) => (
              <li key={term}>{term}</li>
            ))}
          </Box>

          <Box sx={{ textAlign: "center" }}>
            <Button
              variant="contained"
              href="/#contact"
              sx={{
                backgroundColor: "#00d4ff",
                color: "#000",
                fontWeight: 700,
                borderRadius: 0,
                px: 5,
                py: 1.5,
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                "&:hover": { backgroundColor: "#0099cc" },
              }}
            >
              Book a bike fit
            </Button>
          </Box>
        </Container>
      </Box>
      <Footer />
    </>
  )
}
