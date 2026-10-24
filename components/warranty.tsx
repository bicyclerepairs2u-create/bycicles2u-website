"use client"

import { Box, Container, Typography, Paper, Link } from "@mui/material"
import { useRouter } from "next/navigation"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"

function BulletList({ items }: { items: string[] }) {
  return (
    <Box component="ul" sx={{ m: 0, mb: 2, pl: 2.5, color: "var(--theme-text-secondary)", "& li": { mb: 1, lineHeight: 1.7 } }}>
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </Box>
  )
}

function SectionHeading({ children }: { children: string }) {
  return (
    <Typography variant="h5" sx={{ fontWeight: 700, color: "var(--theme-text-primary)", mb: 2, fontSize: { xs: "1.25rem", md: "1.5rem" } }}>
      {children}
    </Typography>
  )
}

export default function Warranty() {
  const router = useRouter()

  return (
    <>
      <Navigation />
      <Box
        sx={{
          minHeight: "100vh",
          backgroundColor: "var(--theme-bg-primary)",
          pt: { xs: 10, md: 12 },
          pb: { xs: 6, md: 8 },
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Container maxWidth="md" sx={{ position: "relative", zIndex: 1 }}>
          <Typography
            component="button"
            onClick={() => router.push("/")}
            sx={{
              color: "#00d4ff",
              fontSize: "0.875rem",
              fontWeight: 600,
              cursor: "pointer",
              border: "none",
              background: "none",
              padding: 0,
              mb: 3,
              display: "flex",
              alignItems: "center",
              gap: 1,
              textTransform: "uppercase",
              letterSpacing: "0.05em",
            }}
          >
            <i className="fi fi-rr-arrow-left"></i>
            Back to Home
          </Typography>

          <Paper
            elevation={0}
            sx={{
              p: { xs: 3, md: 5 },
              backgroundColor: "var(--theme-bg-secondary)",
              borderRadius: 0,
              border: "1px solid var(--theme-border)",
            }}
          >
            <Typography sx={{ fontSize: "0.625rem", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "#00d4ff", mb: 2 }}>
              Bicycles2U
            </Typography>
            <Typography variant="h2" sx={{ fontSize: { xs: "2rem", md: "2.75rem" }, fontWeight: 900, letterSpacing: "-0.04em", textTransform: "uppercase", mb: 2 }}>
              Warranty
            </Typography>
            <Typography sx={{ color: "var(--theme-text-secondary)", lineHeight: 1.8, mb: 2 }}>
              At Bicycles2U, every bicycle is inspected, serviced and safety-checked before sale.
            </Typography>
            <Typography sx={{ color: "var(--theme-text-secondary)", lineHeight: 1.8, mb: 4 }}>
              As specialists in second-hand road bicycles, we recognise that pre-owned bikes may show reasonable signs of age, previous use and cosmetic wear. Our warranty covers genuine faults while recognising that normal wear, maintenance and accidental damage are part of owning a used bicycle.
            </Typography>

            <SectionHeading>1. Carbon warranty</SectionHeading>
            <Typography sx={{ color: "var(--theme-text-secondary)", lineHeight: 1.8, mb: 2 }}>
              Bicycles2U covers the carbon frame and fork against genuine structural faults that were present at the time of sale and were not disclosed to the purchaser. This may include:
            </Typography>
            <BulletList
              items={[
                "Previously unidentified carbon cracking",
                "Structural delamination",
                "Structural failure attributable to an existing defect",
                "Previously unidentified structural damage that was not reasonably apparent during our pre-sale inspection",
              ]}
            />
            <Typography sx={{ color: "var(--theme-text-secondary)", lineHeight: 1.8, mb: 2 }}>
              Where necessary, Bicycles2U may have the frame or fork assessed by a carbon repair specialist before determining whether a claim is covered.
            </Typography>
            <Typography sx={{ fontWeight: 700, mb: 1 }}>What we don&apos;t cover</Typography>
            <BulletList
              items={[
                "Crash, fall or impact damage",
                "Pothole or road-impact damage",
                "Transport or storage damage occurring after purchase",
                "Damage caused by over-tightening components",
                "Incorrect assembly or installation",
                "Misuse, neglect or abuse",
                "Modifications to the frame or fork",
                "Damage caused by third-party work",
                "Use outside the manufacturer's intended purpose",
                "Cosmetic marks, scratches, chips or clear-coat damage",
                "Damage or repairs that were disclosed before purchase",
                "Subsequent damage to an area with a previously disclosed carbon repair",
              ]}
            />
            <Typography sx={{ color: "var(--theme-text-secondary)", lineHeight: 1.8, mb: 4 }}>
              A disclosed professional carbon repair is not considered a defect simply because the frame has previously been repaired.
            </Typography>

            <SectionHeading>2. Bike warranty</SectionHeading>
            <Typography sx={{ color: "var(--theme-text-secondary)", lineHeight: 1.8, mb: 2 }}>
              Every bicycle is serviced and checked by Bicycles2U before sale. The bike warranty applies to the bicycle&apos;s major mechanical components, including the drivetrain and wheels. Depending on the bicycle and fault, this may include:
            </Typography>
            <BulletList
              items={[
                "Front and rear derailleur function",
                "Gear shifting",
                "Shifter operation",
                "Mechanical and electronic drivetrain operation",
                "Crankset and chainring function",
                "Bottom bracket operation",
                "Wheel hubs and freehub function",
                "Significant bearing faults",
                "Structural wheel or rim defects",
                "Other mechanical faults that were present at the time of sale and were not disclosed",
              ]}
            />

            <Typography sx={{ fontWeight: 700, mb: 1 }}>2-week adjustment period</Typography>
            <Typography sx={{ color: "var(--theme-text-secondary)", lineHeight: 1.8, mb: 2 }}>
              For the first 2 weeks after purchase, Bicycles2U will also cover reasonable adjustments arising from the bike settling after its pre-sale service. This includes cable stretch, gear indexing, derailleur adjustment, minor brake adjustment, and other reasonable out-of-adjustment issues associated with normal settling. This does not include damage, component wear or faults caused by an accident, misuse or third-party adjustment.
            </Typography>

            <Typography sx={{ fontWeight: 700, mb: 1 }}>Normal wear and consumables</Typography>
            <Typography sx={{ color: "var(--theme-text-secondary)", lineHeight: 1.8, mb: 1 }}>
              The bike warranty does not ordinarily cover normal wear to chains, cassettes, chainrings, jockey wheels, brake pads, tyres and tubes, bar tape, cables once outside the initial adjustment period, bearings worn through continued use, or other routine consumable components.
            </Typography>
            <Typography sx={{ color: "var(--theme-text-secondary)", lineHeight: 1.8, mb: 2 }}>
              Normal wear consistent with the bicycle&apos;s age, condition, previous use and kilometres travelled is not a warranty fault.
            </Typography>

            <Typography sx={{ fontWeight: 700, mb: 1 }}>Damage and misuse</Typography>
            <BulletList
              items={[
                "Crashes, falls or impacts",
                "Potholes, kerbs or road debris",
                "Shifting under excessive load",
                "Chain drops caused by use or adjustment after sale",
                "Bent derailleur hangers resulting from impact",
                "Incorrect tyre pressure",
                "Incorrect cleaning or lubrication",
                "Corrosion or excessive water exposure",
                "Neglect",
                "Modifications",
                "Incorrect servicing",
                "Repairs or adjustments performed incorrectly by another person or workshop",
              ]}
            />

            <SectionHeading>Servicing requirements</SectionHeading>
            <Typography sx={{ color: "var(--theme-text-secondary)", lineHeight: 1.8, mb: 2 }}>
              We recommend that bicycles purchased from Bicycles2U receive a general service by approximately 6 months or 4,000 km after purchase, whichever occurs first. After that, regular servicing should continue at intervals appropriate to the bicycle&apos;s use.
            </Typography>
            <Typography sx={{ color: "var(--theme-text-secondary)", lineHeight: 1.8, mb: 2 }}>
              Failure to maintain or service the bicycle may affect warranty coverage where the lack of maintenance has caused or contributed to the claimed fault. For example, failure to replace a worn chain may lead to premature wear of the cassette, chainrings, jockey wheels and drivetrain components, and that consequential wear may not be covered. Continued use of worn bearings, poorly adjusted components or other known maintenance issues may also affect coverage for resulting damage.
            </Typography>
            <Typography sx={{ color: "var(--theme-text-secondary)", lineHeight: 1.8, mb: 4 }}>
              Missing a scheduled service does not automatically remove all warranty coverage. Claims are considered based on whether servicing or maintenance reasonably contributed to the fault.
            </Typography>

            <SectionHeading>How we cover warranty claims</SectionHeading>
            <Box component="ol" sx={{ m: 0, mb: 2, pl: 2.5, color: "var(--theme-text-secondary)", "& li": { mb: 1, lineHeight: 1.7 } }}>
              <li>Contact Bicycles2U as soon as reasonably possible.</li>
              <li>Provide proof of purchase and details of the issue.</li>
              <li>Photos or videos may be requested before the bicycle is returned.</li>
              <li>Stop riding the bicycle where continued use could worsen the problem or create a safety risk.</li>
              <li>Allow Bicycles2U a reasonable opportunity to inspect the bicycle before having repairs performed elsewhere.</li>
            </Box>
            <Typography sx={{ color: "var(--theme-text-secondary)", lineHeight: 1.8, mb: 2 }}>
              Please contact us before authorising another workshop to carry out a warranty repair. Bicycles2U will not automatically reimburse third-party repairs or replacement parts arranged without prior approval, except where required by law.
            </Typography>
            <Typography sx={{ color: "var(--theme-text-secondary)", lineHeight: 1.8, mb: 2 }}>
              If a claim is accepted, Bicycles2U will determine the appropriate remedy having regard to the fault, the bicycle&apos;s age, condition, purchase price and second-hand nature. A remedy may include adjustment, servicing, repair, replacement of the affected component, replacement with a suitable comparable second-hand component, professional carbon repair, or another appropriate remedy.
            </Typography>
            <Typography sx={{ color: "var(--theme-text-secondary)", lineHeight: 1.8, mb: 4 }}>
              Replacement parts do not need to be identical in brand, model, year or cosmetic condition, provided they are reasonably comparable in function and value.
            </Typography>

            <SectionHeading>Australian Consumer Law</SectionHeading>
            <Typography sx={{ color: "var(--theme-text-secondary)", lineHeight: 1.8, mb: 3 }}>
              This warranty is provided in addition to your rights under the Australian Consumer Law. Nothing in this warranty excludes, restricts or modifies any consumer guarantee or other right that cannot lawfully be excluded.
            </Typography>
            <Typography sx={{ color: "var(--theme-text-secondary)", lineHeight: 1.8 }}>
              To start a claim, contact Sam on{" "}
              <Link href="tel:+61402880242" sx={{ color: "#00d4ff" }}>0402 880 242</Link>
              {" "}or{" "}
              <Link href="mailto:bicyclerepairs2u@gmail.com" sx={{ color: "#00d4ff" }}>bicyclerepairs2u@gmail.com</Link>.
            </Typography>
          </Paper>
        </Container>
      </Box>
      <Footer />
    </>
  )
}
