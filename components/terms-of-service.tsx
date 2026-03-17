"use client"

import { Box, Container, Typography, Paper, Divider, Link } from "@mui/material"
import { useRouter } from "next/navigation"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"

export default function TermsOfService() {
  const router = useRouter()

  const sectionStyle = {
    mb: 4,
  }

  const headingStyle = {
    fontWeight: 700,
    color: "var(--theme-text-primary)",
    mb: 2,
    fontSize: { xs: "1.25rem", md: "1.5rem" },
  }

  const bodyStyle = {
    color: "var(--theme-text-secondary)",
    lineHeight: 1.8,
    mb: 2,
  }

  const listItemStyle = {
    color: "var(--theme-text-secondary)",
    lineHeight: 1.8,
    mb: 1,
    display: "flex",
    alignItems: "flex-start",
    gap: 1.5,
  }

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
        {/* Background Pattern */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "20%",
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

        <Container maxWidth="md" sx={{ position: "relative", zIndex: 1 }}>
          {/* Back Button */}
          <Box sx={{ mb: 3 }}>
            <Typography
              component="button"
              onClick={() => router.push("/")}
              sx={{
                color: "#00d4ff",
                textDecoration: "none",
                fontSize: "0.875rem",
                fontWeight: 600,
                cursor: "pointer",
                border: "none",
                background: "none",
                padding: 0,
                display: "flex",
                alignItems: "center",
                gap: 1,
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                "&:hover": {
                  opacity: 0.8,
                },
              }}
            >
              <i className="fi fi-rr-arrow-left"></i>
              Back to Home
            </Typography>
          </Box>

          <Paper
            elevation={0}
            sx={{
              p: { xs: 3, md: 5 },
              backgroundColor: "var(--theme-bg-secondary)",
              borderRadius: 0,
              border: "1px solid var(--theme-border)",
              position: "relative",
            }}
          >
            {/* Corner accent */}
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "80px",
                height: "2px",
                backgroundColor: "#00d4ff",
              }}
            />
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "2px",
                height: "60px",
                backgroundColor: "#00d4ff",
              }}
            />

            {/* Header */}
            <Typography
              variant="h3"
              component="h1"
              sx={{
                fontWeight: 900,
                letterSpacing: "-0.04em",
                color: "var(--theme-text-primary)",
                mb: 1,
                fontSize: { xs: "2rem", md: "2.5rem" },
                textTransform: "uppercase",
              }}
            >
              Terms of Service
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: "var(--theme-text-muted)",
                mb: 4,
              }}
            >
              Last updated: January 30, 2026
            </Typography>

            <Divider sx={{ mb: 4, borderColor: "var(--theme-border)" }} />

            {/* 1. Agreement to Terms */}
            <Box sx={sectionStyle}>
              <Typography variant="h5" sx={headingStyle}>
                1. Agreement to Terms
              </Typography>
              <Typography variant="body1" sx={bodyStyle}>
                By accessing or using the services provided by Bicycles2U ("we", "us", or "our"), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
              </Typography>
            </Box>

            {/* 2. Services */}
            <Box sx={sectionStyle}>
              <Typography variant="h5" sx={headingStyle}>
                2. Services Provided
              </Typography>
              <Typography variant="body1" sx={bodyStyle}>
                Bicycles2U specializes exclusively in road bikes and triathlon bikes. We provide:
              </Typography>
              <Box sx={{ pl: 2, mb: 2 }}>
                {[
                  "Bike repairs and servicing (Basic, Standard, Deluxe, and Ultimate service packages)",
                  "Custom bike builds and modifications",
                  "Sale of second-hand road bikes",
                  "Bike sizing consultations",
                ].map((item, idx) => (
                  <Box key={idx} sx={listItemStyle}>
                    <Box sx={{ width: "4px", height: "4px", backgroundColor: "#00d4ff", mt: 1.2, flexShrink: 0 }} />
                    <Typography variant="body1" sx={{ color: "var(--theme-text-secondary)", lineHeight: 1.8 }}>
                      {item}
                    </Typography>
                  </Box>
                ))}
              </Box>
              <Paper
                elevation={0}
                sx={{
                  p: 2,
                  backgroundColor: "rgba(255, 152, 0, 0.1)",
                  border: "1px solid rgba(255, 152, 0, 0.3)",
                  borderRadius: 0,
                }}
              >
                <Typography variant="body1" sx={{ color: "var(--theme-text-primary)", fontWeight: 500 }}>
                  <i className="fi fi-rr-exclamation" style={{ marginRight: "8px", color: "#ff9800" }}></i>
                  We do NOT service or sell e-bikes. We specialize exclusively in lightweight road and triathlon bikes.
                </Typography>
              </Paper>
            </Box>

            {/* 3. Appointments */}
            <Box sx={sectionStyle}>
              <Typography variant="h5" sx={headingStyle}>
                3. Appointments and Service
              </Typography>
              <Typography variant="body1" sx={bodyStyle}>
                All services are provided by appointment or arrangement only. We are not a walk-in shop. Please contact us via phone (0402 880 242) or email (bicyclerepairs2u@gmail.com) to schedule your appointment.
              </Typography>
              <Typography variant="body1" sx={bodyStyle}>
                Cancellations or rescheduling must be made at least 24 hours in advance. Failure to show up for a scheduled appointment without notice may result in a cancellation fee.
              </Typography>
            </Box>

            {/* 4. Service Packages and Pricing */}
            <Box sx={sectionStyle}>
              <Typography variant="h5" sx={headingStyle}>
                4. Service Packages and Pricing
              </Typography>
              <Typography variant="body1" sx={bodyStyle}>
                Our service packages include:
              </Typography>
              <Box sx={{ pl: 2, mb: 2 }}>
                {[
                  { label: "Basic Service ($59)", desc: "Clean bike, lube chain, gears and brakes check" },
                  { label: "Standard Service ($119)", desc: "Basic + full bike clean, wheel truing, brake pads check" },
                  { label: "Deluxe Service ($159)", desc: "Standard + drivetrain deep clean, cable replacement, bearing check" },
                  { label: "Ultimate Service ($299)", desc: "Deluxe + full strip down, bearing service, frame polish" },
                ].map((item, idx) => (
                  <Box key={idx} sx={listItemStyle}>
                    <Box sx={{ width: "4px", height: "4px", backgroundColor: "#00d4ff", mt: 1.2, flexShrink: 0 }} />
                    <Typography variant="body1" sx={{ color: "var(--theme-text-secondary)", lineHeight: 1.8 }}>
                      <strong style={{ color: "var(--theme-text-primary)" }}>{item.label}:</strong> {item.desc}
                    </Typography>
                  </Box>
                ))}
              </Box>
              <Typography variant="body1" sx={bodyStyle}>
                Additional parts and labor required beyond the scope of the selected service package will be quoted separately and require approval before proceeding.
              </Typography>
            </Box>

            {/* 5. Bike Sales */}
            <Box sx={sectionStyle}>
              <Typography variant="h5" sx={headingStyle}>
                5. Bike Sales and Consignment
              </Typography>
              <Typography variant="body1" sx={bodyStyle}>
                Second-hand bikes are sold through our Facebook Marketplace page. We provide honest assessments of bike condition and all second-hand bikes are backed by our warranty policy (see Section 6). Buyers are encouraged to inspect bikes before purchase.
              </Typography>
              <Typography variant="body1" sx={bodyStyle}>
                For consignment sales (selling your bike through us), we accept road bikes valued at $1,000 or more. Consignment terms and commission rates will be discussed on a case-by-case basis.
              </Typography>
            </Box>

            {/* 6. Warranties */}
            <Box
              sx={{
                mb: 4,
                p: 3,
                backgroundColor: "rgba(0, 212, 255, 0.08)",
                borderLeft: "3px solid #00d4ff",
                borderRadius: 0,
              }}
            >
              <Typography variant="h5" sx={{ ...headingStyle, mb: 3 }}>
                6. Warranties
              </Typography>

              <Typography
                variant="h6"
                sx={{
                  fontWeight: 600,
                  color: "var(--theme-text-primary)",
                  mb: 1.5,
                  fontSize: "1rem",
                }}
              >
                Workmanship Warranty
              </Typography>
              <Typography variant="body1" sx={bodyStyle}>
                We stand behind the quality of our work. All labor and workmanship performed by Bicycles2U is guaranteed for <strong>30 days</strong> from the service completion date. If an issue arises that is directly related to our service within this warranty period, we will correct it at no charge.
              </Typography>

              <Typography
                variant="h6"
                sx={{
                  fontWeight: 600,
                  color: "var(--theme-text-primary)",
                  mb: 1.5,
                  fontSize: "1rem",
                }}
              >
                Parts Warranty
              </Typography>
              <Typography variant="body1" sx={bodyStyle}>
                Parts supplied and installed by us carry the original manufacturer's warranty. Warranty periods vary by manufacturer and component type (typically 6 months to 2 years). We will assist with warranty claims for defective parts, but we are not responsible for:
              </Typography>
              <Box sx={{ pl: 2, mb: 2 }}>
                {[
                  "Normal wear and tear of consumable parts (brake pads, chains, tires, cables, etc.)",
                  "Damage caused by improper use, accidents, or neglect",
                  "Parts installed incorrectly by other mechanics or the customer",
                  "Parts brought in by the customer (customer-supplied parts)",
                ].map((item, idx) => (
                  <Box key={idx} sx={listItemStyle}>
                    <Box sx={{ width: "4px", height: "4px", backgroundColor: "#00d4ff", mt: 1.2, flexShrink: 0 }} />
                    <Typography variant="body1" sx={{ color: "var(--theme-text-secondary)", lineHeight: 1.8 }}>
                      {item}
                    </Typography>
                  </Box>
                ))}
              </Box>

              <Typography
                variant="h6"
                sx={{
                  fontWeight: 600,
                  color: "var(--theme-text-primary)",
                  mb: 1.5,
                  fontSize: "1rem",
                }}
              >
                Second-Hand Bikes
              </Typography>
              <Typography variant="body1" sx={bodyStyle}>
                Bicycles2U offers warranties on second-hand bikes purchased through us, subject to the terms outlined below.
              </Typography>

              <Typography variant="body1" sx={{ ...bodyStyle, fontWeight: 600, color: "var(--theme-text-primary)" }}>
                Carbon Fibre Frame Warranty
              </Typography>
              <Typography variant="body1" sx={bodyStyle}>
                For your peace of mind, any cracks discovered in a carbon fibre frame after purchase will be covered under our warranty. We will provide either a replacement bike or a full refund at our discretion. This warranty does <strong>not</strong> cover cracks resulting from neglect, misuse, or any incident involving a collision or crash.
              </Typography>

              <Typography variant="body1" sx={{ ...bodyStyle, fontWeight: 600, color: "var(--theme-text-primary)" }}>
                Mechanical Parts Warranty
              </Typography>
              <Typography variant="body1" sx={bodyStyle}>
                All mechanical components on second-hand road bikes are covered by a <strong>6-month</strong> warranty from the date of purchase. This warranty will be voided if damage results from neglect or improper use, including but not limited to:
              </Typography>
              <Box sx={{ pl: 2, mb: 2 }}>
                {[
                  "Shifting under load, resulting in bent or broken derailleurs and hangers",
                  "Fitting of third-party components without installation by a professional mechanic",
                  "Improper fitment of wheels or general mishandling of the bike",
                ].map((item, idx) => (
                  <Box key={idx} sx={listItemStyle}>
                    <Box sx={{ width: "4px", height: "4px", backgroundColor: "#ff6b6b", mt: 1.2, flexShrink: 0 }} />
                    <Typography variant="body1" sx={{ color: "var(--theme-text-secondary)", lineHeight: 1.8 }}>
                      {item}
                    </Typography>
                  </Box>
                ))}
              </Box>

              <Typography
                variant="h6"
                sx={{
                  fontWeight: 600,
                  color: "var(--theme-text-primary)",
                  mb: 1.5,
                  fontSize: "1rem",
                }}
              >
                Warranty Exclusions
              </Typography>
              <Typography variant="body1" sx={{ ...bodyStyle, mb: 1 }}>
                Our warranties do not cover:
              </Typography>
              <Box sx={{ pl: 2, mb: 2 }}>
                {[
                  "Subsequent damage caused by continued riding after a mechanical issue develops",
                  "Damage from crashes, accidents, or misuse",
                  "Modifications made by other mechanics after our service",
                  "Frame or structural damage not caused by our workmanship",
                  "Issues arising from failure to follow recommended maintenance schedules",
                ].map((item, idx) => (
                  <Box key={idx} sx={listItemStyle}>
                    <Box sx={{ width: "4px", height: "4px", backgroundColor: "#ff6b6b", mt: 1.2, flexShrink: 0 }} />
                    <Typography variant="body1" sx={{ color: "var(--theme-text-secondary)", lineHeight: 1.8 }}>
                      {item}
                    </Typography>
                  </Box>
                ))}
              </Box>

              <Typography
                variant="h6"
                sx={{
                  fontWeight: 600,
                  color: "var(--theme-text-primary)",
                  mb: 1.5,
                  fontSize: "1rem",
                }}
              >
                Warranty Claims
              </Typography>
              <Typography variant="body1" sx={{ color: "var(--theme-text-secondary)", lineHeight: 1.8 }}>
                To make a warranty claim, please contact us within the warranty period with your service receipt or invoice. We will assess the issue and determine whether it is covered under warranty. Warranty service may require you to bring the bike back to our location for inspection and repair.
              </Typography>
            </Box>

            {/* 7. Liability */}
            <Box sx={sectionStyle}>
              <Typography variant="h5" sx={headingStyle}>
                7. Limitation of Liability
              </Typography>
              <Typography variant="body1" sx={bodyStyle}>
                While we take reasonable care with all bikes in our possession, Bicycles2U is not liable for:
              </Typography>
              <Box sx={{ pl: 2, mb: 2 }}>
                {[
                  "Theft or damage to bikes beyond our reasonable control",
                  "Pre-existing damage not identified or reported at time of drop-off",
                  "Personal items left in bags, bottles, or attached to bikes",
                  "Consequential damages arising from bike failure or service delays",
                ].map((item, idx) => (
                  <Box key={idx} sx={listItemStyle}>
                    <Box sx={{ width: "4px", height: "4px", backgroundColor: "#00d4ff", mt: 1.2, flexShrink: 0 }} />
                    <Typography variant="body1" sx={{ color: "var(--theme-text-secondary)", lineHeight: 1.8 }}>
                      {item}
                    </Typography>
                  </Box>
                ))}
              </Box>
              <Typography variant="body1" sx={bodyStyle}>
                Our maximum liability for any claim is limited to the amount paid for the service or bike in question.
              </Typography>
              <Typography variant="body1" sx={{ ...bodyStyle, fontStyle: "italic", color: "var(--theme-text-muted)" }}>
                We strongly recommend that customers maintain their own comprehensive insurance for valuable bikes.
              </Typography>
            </Box>

            {/* 8. Customer Responsibilities */}
            <Box sx={sectionStyle}>
              <Typography variant="h5" sx={headingStyle}>
                8. Customer Responsibilities
              </Typography>
              <Typography variant="body1" sx={bodyStyle}>
                Customers are responsible for:
              </Typography>
              <Box sx={{ pl: 2, mb: 2 }}>
                {[
                  "Providing accurate information about bike history and issues",
                  "Collecting bikes within 14 days of service completion notification",
                  "Payment in full at time of collection",
                  "Removing all personal items from bikes before drop-off",
                ].map((item, idx) => (
                  <Box key={idx} sx={listItemStyle}>
                    <Box sx={{ width: "4px", height: "4px", backgroundColor: "#00d4ff", mt: 1.2, flexShrink: 0 }} />
                    <Typography variant="body1" sx={{ color: "var(--theme-text-secondary)", lineHeight: 1.8 }}>
                      {item}
                    </Typography>
                  </Box>
                ))}
              </Box>
              <Typography variant="body1" sx={bodyStyle}>
                Bikes not collected within 30 days may be subject to storage fees of $10 per day.
              </Typography>
            </Box>

            {/* 9. Payment Terms */}
            <Box sx={sectionStyle}>
              <Typography variant="h5" sx={headingStyle}>
                9. Payment Terms
              </Typography>
              <Typography variant="body1" sx={bodyStyle}>
                Payment is due in full upon collection of your bike. We accept cash, bank transfer, and most major credit cards. Bikes will not be released until payment is received in full.
              </Typography>
            </Box>

            {/* 10. Intellectual Property */}
            <Box sx={sectionStyle}>
              <Typography variant="h5" sx={headingStyle}>
                10. Intellectual Property
              </Typography>
              <Typography variant="body1" sx={bodyStyle}>
                All content on this website, including text, graphics, logos, and images, is the property of Bicycles2U and is protected by copyright and trademark laws. Unauthorized use is prohibited.
              </Typography>
            </Box>

            {/* 11. Privacy */}
            <Box sx={sectionStyle}>
              <Typography variant="h5" sx={headingStyle}>
                11. Privacy
              </Typography>
              <Typography variant="body1" sx={bodyStyle}>
                We respect your privacy. Any personal information collected (name, email, phone number) is used solely for providing our services and communicating with you. We will never sell or share your information with third parties without your consent.
              </Typography>
            </Box>

            {/* 12. Dispute Resolution */}
            <Box sx={sectionStyle}>
              <Typography variant="h5" sx={headingStyle}>
                12. Dispute Resolution
              </Typography>
              <Typography variant="body1" sx={bodyStyle}>
                Any disputes arising from these terms will be resolved through good faith negotiation. If a resolution cannot be reached, disputes will be handled under the laws of New South Wales, Australia.
              </Typography>
            </Box>

            {/* 13. Changes to Terms */}
            <Box sx={sectionStyle}>
              <Typography variant="h5" sx={headingStyle}>
                13. Changes to Terms
              </Typography>
              <Typography variant="body1" sx={bodyStyle}>
                We reserve the right to update these Terms of Service at any time. Changes will be effective immediately upon posting to this website. Continued use of our services after changes constitutes acceptance of the updated terms.
              </Typography>
            </Box>

            <Divider sx={{ my: 4, borderColor: "var(--theme-border)" }} />

            {/* Contact Section */}
            <Box
              sx={{
                backgroundColor: "var(--theme-bg-primary)",
                p: 3,
                borderRadius: 0,
                border: "1px solid var(--theme-border)",
                mt: 4,
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  color: "var(--theme-text-primary)",
                  mb: 2,
                  textTransform: "uppercase",
                  fontSize: "0.875rem",
                  letterSpacing: "0.05em",
                }}
              >
                Questions?
              </Typography>
              <Typography variant="body1" sx={{ color: "var(--theme-text-secondary)", lineHeight: 1.8, mb: 2 }}>
                If you have any questions about these Terms of Service, please contact us:
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
                <Link
                  href="mailto:bicyclerepairs2u@gmail.com"
                  sx={{
                    color: "var(--theme-text-secondary)",
                    textDecoration: "none",
                    display: "flex",
                    alignItems: "center",
                    gap: 1.5,
                    fontSize: "0.9rem",
                    "&:hover": { color: "#00d4ff" },
                  }}
                >
                  <i className="fi fi-rr-envelope" style={{ color: "#00d4ff" }}></i>
                  bicyclerepairs2u@gmail.com
                </Link>
                <Link
                  href="tel:+61402880242"
                  sx={{
                    color: "var(--theme-text-secondary)",
                    textDecoration: "none",
                    display: "flex",
                    alignItems: "center",
                    gap: 1.5,
                    fontSize: "0.9rem",
                    "&:hover": { color: "#00d4ff" },
                  }}
                >
                  <i className="fi fi-rr-phone-call" style={{ color: "#00d4ff" }}></i>
                  0402 880 242
                </Link>
                <Typography
                  sx={{
                    color: "var(--theme-text-muted)",
                    display: "flex",
                    alignItems: "center",
                    gap: 1.5,
                    fontSize: "0.9rem",
                  }}
                >
                  <i className="fi fi-rr-marker" style={{ color: "#00d4ff" }}></i>
                  167/171 Bronte Rd, Queens Park NSW 2022
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Container>
      </Box>
      <Footer />
    </>
  )
}
