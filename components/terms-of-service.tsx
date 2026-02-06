"use client"

import { Box, Container, Typography, Paper, Divider } from "@mui/material"
import { useRouter } from "next/navigation"

export default function TermsOfService() {
  const router = useRouter()

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#fafafa",
        pt: { xs: 4, md: 6 },
        pb: { xs: 6, md: 8 },
      }}
    >
      <Container maxWidth="md">
        {/* Back Button */}
        <Box sx={{ mb: 3 }}>
          <Typography
            component="button"
            onClick={() => router.push("/")}
            sx={{
              color: "#0288d1",
              textDecoration: "none",
              fontSize: "0.95rem",
              fontWeight: 500,
              cursor: "pointer",
              border: "none",
              background: "none",
              padding: 0,
              display: "flex",
              alignItems: "center",
              gap: 1,
              "&:hover": {
                textDecoration: "underline",
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
            backgroundColor: "#ffffff",
            borderRadius: 2,
          }}
        >
          {/* Header */}
          <Typography
            variant="h3"
            component="h1"
            sx={{
              fontWeight: 700,
              letterSpacing: "-1px",
              color: "#212121",
              mb: 1,
              fontSize: { xs: "2rem", md: "2.5rem" },
            }}
          >
            Terms of Service
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: "#757575",
              mb: 4,
            }}
          >
            Last updated: January 30, 2026
          </Typography>

          <Divider sx={{ mb: 4 }} />

          {/* 1. Agreement to Terms */}
          <Box sx={{ mb: 4 }}>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 600,
                color: "#212121",
                mb: 2,
              }}
            >
              1. Agreement to Terms
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: "#424242",
                lineHeight: 1.8,
                mb: 2,
              }}
            >
              By accessing or using the services provided by Bicycles2U ("we", "us", or "our"), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
            </Typography>
          </Box>

          {/* 2. Services */}
          <Box sx={{ mb: 4 }}>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 600,
                color: "#212121",
                mb: 2,
              }}
            >
              2. Services Provided
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: "#424242",
                lineHeight: 1.8,
                mb: 2,
              }}
            >
              Bicycles2U specializes exclusively in road bikes and triathlon bikes. We provide:
            </Typography>
            <Box component="ul" sx={{ pl: 3, mb: 2 }}>
              <Typography component="li" sx={{ color: "#424242", lineHeight: 1.8, mb: 1 }}>
                Bike repairs and servicing (Basic, Standard, Deluxe, and Ultimate service packages)
              </Typography>
              <Typography component="li" sx={{ color: "#424242", lineHeight: 1.8, mb: 1 }}>
                Custom bike builds and modifications
              </Typography>
              <Typography component="li" sx={{ color: "#424242", lineHeight: 1.8, mb: 1 }}>
                Sale of second-hand road bikes
              </Typography>
              <Typography component="li" sx={{ color: "#424242", lineHeight: 1.8, mb: 1 }}>
                Bike sizing consultations
              </Typography>
            </Box>
            <Typography
              variant="body1"
              sx={{
                color: "#424242",
                lineHeight: 1.8,
                fontWeight: 500,
              }}
            >
              Please note: We do NOT service or sell e-bikes. We specialize exclusively in lightweight road and triathlon bikes.
            </Typography>
          </Box>

          {/* 3. Appointments */}
          <Box sx={{ mb: 4 }}>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 600,
                color: "#212121",
                mb: 2,
              }}
            >
              3. Appointments and Service
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: "#424242",
                lineHeight: 1.8,
                mb: 2,
              }}
            >
              All services are provided by appointment or arrangement only. We are not a walk-in shop. Please contact us via phone (0402 880 242) or email (bicyclerepairs2u@gmail.com) to schedule your appointment.
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: "#424242",
                lineHeight: 1.8,
              }}
            >
              Cancellations or rescheduling must be made at least 24 hours in advance. Failure to show up for a scheduled appointment without notice may result in a cancellation fee.
            </Typography>
          </Box>

          {/* 4. Service Packages and Pricing */}
          <Box sx={{ mb: 4 }}>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 600,
                color: "#212121",
                mb: 2,
              }}
            >
              4. Service Packages and Pricing
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: "#424242",
                lineHeight: 1.8,
                mb: 2,
              }}
            >
              Our service packages include:
            </Typography>
            <Box component="ul" sx={{ pl: 3, mb: 2 }}>
              <Typography component="li" sx={{ color: "#424242", lineHeight: 1.8, mb: 1 }}>
                <strong>Basic Service ($59):</strong> Clean bike, lube chain, gears and brakes check
              </Typography>
              <Typography component="li" sx={{ color: "#424242", lineHeight: 1.8, mb: 1 }}>
                <strong>Standard Service ($119):</strong> Basic + full bike clean, wheel truing, brake pads check
              </Typography>
              <Typography component="li" sx={{ color: "#424242", lineHeight: 1.8, mb: 1 }}>
                <strong>Deluxe Service ($159):</strong> Standard + drivetrain deep clean, cable replacement, bearing check
              </Typography>
              <Typography component="li" sx={{ color: "#424242", lineHeight: 1.8, mb: 1 }}>
                <strong>Ultimate Service ($299):</strong> Deluxe + full strip down, bearing service, frame polish
              </Typography>
            </Box>
            <Typography
              variant="body1"
              sx={{
                color: "#424242",
                lineHeight: 1.8,
              }}
            >
              Additional parts and labor required beyond the scope of the selected service package will be quoted separately and require approval before proceeding.
            </Typography>
          </Box>

          {/* 5. Bike Sales */}
          <Box sx={{ mb: 4 }}>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 600,
                color: "#212121",
                mb: 2,
              }}
            >
              5. Bike Sales and Consignment
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: "#424242",
                lineHeight: 1.8,
                mb: 2,
              }}
            >
              Second-hand bikes are sold through our Facebook Marketplace page. All bikes are sold as-is unless otherwise specified. We provide honest assessments of bike condition, but buyers are responsible for inspecting bikes before purchase.
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: "#424242",
                lineHeight: 1.8,
              }}
            >
              For consignment sales (selling your bike through us), we accept road bikes valued at $1,000 or more. Consignment terms and commission rates will be discussed on a case-by-case basis.
            </Typography>
          </Box>

          {/* 6. Warranties */}
          <Box
            sx={{
              mb: 4,
              p: 3,
              backgroundColor: "#f8f9fa",
              borderLeft: "4px solid #0288d1",
              borderRadius: 1,
            }}
          >
            <Typography
              variant="h5"
              sx={{
                fontWeight: 600,
                color: "#212121",
                mb: 2,
              }}
            >
              6. Warranties
            </Typography>

            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                color: "#424242",
                mb: 1.5,
                fontSize: "1.1rem",
              }}
            >
              Workmanship Warranty
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: "#424242",
                lineHeight: 1.8,
                mb: 2,
              }}
            >
              We stand behind the quality of our work. All labor and workmanship performed by Bicycles2U is guaranteed for <strong>30 days</strong> from the service completion date. If an issue arises that is directly related to our service within this warranty period, we will correct it at no charge.
            </Typography>

            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                color: "#424242",
                mb: 1.5,
                fontSize: "1.1rem",
              }}
            >
              Parts Warranty
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: "#424242",
                lineHeight: 1.8,
                mb: 2,
              }}
            >
              Parts supplied and installed by us carry the original manufacturer's warranty. Warranty periods vary by manufacturer and component type (typically 6 months to 2 years). We will assist with warranty claims for defective parts, but we are not responsible for:
            </Typography>
            <Box component="ul" sx={{ pl: 3, mb: 2 }}>
              <Typography component="li" sx={{ color: "#424242", lineHeight: 1.8, mb: 1 }}>
                Normal wear and tear of consumable parts (brake pads, chains, tires, cables, etc.)
              </Typography>
              <Typography component="li" sx={{ color: "#424242", lineHeight: 1.8, mb: 1 }}>
                Damage caused by improper use, accidents, or neglect
              </Typography>
              <Typography component="li" sx={{ color: "#424242", lineHeight: 1.8, mb: 1 }}>
                Parts installed incorrectly by other mechanics or the customer
              </Typography>
              <Typography component="li" sx={{ color: "#424242", lineHeight: 1.8, mb: 1 }}>
                Parts brought in by the customer (customer-supplied parts)
              </Typography>
            </Box>

            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                color: "#424242",
                mb: 1.5,
                fontSize: "1.1rem",
              }}
            >
              Second-Hand Bikes
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: "#424242",
                lineHeight: 1.8,
                mb: 2,
              }}
            >
              Used bikes are sold <strong>as-is</strong> unless otherwise specified in writing. While we provide honest assessments of bike condition and perform safety checks, we do not offer warranties on second-hand bikes beyond what is explicitly stated in the sale agreement. Buyers are encouraged to inspect bikes thoroughly and ask questions before purchase.
            </Typography>

            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                color: "#424242",
                mb: 1.5,
                fontSize: "1.1rem",
              }}
            >
              Warranty Exclusions
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: "#424242",
                lineHeight: 1.8,
                mb: 1,
              }}
            >
              Our warranties do not cover:
            </Typography>
            <Box component="ul" sx={{ pl: 3, mb: 2 }}>
              <Typography component="li" sx={{ color: "#424242", lineHeight: 1.8, mb: 1 }}>
                Subsequent damage caused by continued riding after a mechanical issue develops
              </Typography>
              <Typography component="li" sx={{ color: "#424242", lineHeight: 1.8, mb: 1 }}>
                Damage from crashes, accidents, or misuse
              </Typography>
              <Typography component="li" sx={{ color: "#424242", lineHeight: 1.8, mb: 1 }}>
                Modifications made by other mechanics after our service
              </Typography>
              <Typography component="li" sx={{ color: "#424242", lineHeight: 1.8, mb: 1 }}>
                Frame or structural damage not caused by our workmanship
              </Typography>
              <Typography component="li" sx={{ color: "#424242", lineHeight: 1.8, mb: 1 }}>
                Issues arising from failure to follow recommended maintenance schedules
              </Typography>
            </Box>

            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                color: "#424242",
                mb: 1.5,
                fontSize: "1.1rem",
              }}
            >
              Warranty Claims
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: "#424242",
                lineHeight: 1.8,
              }}
            >
              To make a warranty claim, please contact us within the warranty period with your service receipt or invoice. We will assess the issue and determine whether it is covered under warranty. Warranty service may require you to bring the bike back to our location for inspection and repair.
            </Typography>
          </Box>

          {/* 7. Liability */}
          <Box sx={{ mb: 4 }}>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 600,
                color: "#212121",
                mb: 2,
              }}
            >
              7. Limitation of Liability
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: "#424242",
                lineHeight: 1.8,
                mb: 2,
              }}
            >
              While we take reasonable care with all bikes in our possession, Bicycles2U is not liable for:
            </Typography>
            <Box component="ul" sx={{ pl: 3, mb: 2 }}>
              <Typography component="li" sx={{ color: "#424242", lineHeight: 1.8, mb: 1 }}>
                Theft or damage to bikes beyond our reasonable control
              </Typography>
              <Typography component="li" sx={{ color: "#424242", lineHeight: 1.8, mb: 1 }}>
                Pre-existing damage not identified or reported at time of drop-off
              </Typography>
              <Typography component="li" sx={{ color: "#424242", lineHeight: 1.8, mb: 1 }}>
                Personal items left in bags, bottles, or attached to bikes
              </Typography>
              <Typography component="li" sx={{ color: "#424242", lineHeight: 1.8, mb: 1 }}>
                Consequential damages arising from bike failure or service delays
              </Typography>
            </Box>
            <Typography
              variant="body1"
              sx={{
                color: "#424242",
                lineHeight: 1.8,
                mb: 2,
              }}
            >
              Our maximum liability for any claim is limited to the amount paid for the service or bike in question.
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: "#424242",
                lineHeight: 1.8,
                fontWeight: 500,
                fontStyle: "italic",
              }}
            >
              We strongly recommend that customers maintain their own comprehensive insurance for valuable bikes.
            </Typography>
          </Box>

          {/* 8. Customer Responsibilities */}
          <Box sx={{ mb: 4 }}>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 600,
                color: "#212121",
                mb: 2,
              }}
            >
              8. Customer Responsibilities
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: "#424242",
                lineHeight: 1.8,
                mb: 2,
              }}
            >
              Customers are responsible for:
            </Typography>
            <Box component="ul" sx={{ pl: 3, mb: 2 }}>
              <Typography component="li" sx={{ color: "#424242", lineHeight: 1.8, mb: 1 }}>
                Providing accurate information about bike history and issues
              </Typography>
              <Typography component="li" sx={{ color: "#424242", lineHeight: 1.8, mb: 1 }}>
                Collecting bikes within 14 days of service completion notification
              </Typography>
              <Typography component="li" sx={{ color: "#424242", lineHeight: 1.8, mb: 1 }}>
                Payment in full at time of collection
              </Typography>
              <Typography component="li" sx={{ color: "#424242", lineHeight: 1.8, mb: 1 }}>
                Removing all personal items from bikes before drop-off
              </Typography>
            </Box>
            <Typography
              variant="body1"
              sx={{
                color: "#424242",
                lineHeight: 1.8,
              }}
            >
              Bikes not collected within 30 days may be subject to storage fees of $10 per day.
            </Typography>
          </Box>

          {/* 9. Payment Terms */}
          <Box sx={{ mb: 4 }}>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 600,
                color: "#212121",
                mb: 2,
              }}
            >
              9. Payment Terms
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: "#424242",
                lineHeight: 1.8,
              }}
            >
              Payment is due in full upon collection of your bike. We accept cash, bank transfer, and most major credit cards. Bikes will not be released until payment is received in full.
            </Typography>
          </Box>

          {/* 10. Intellectual Property */}
          <Box sx={{ mb: 4 }}>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 600,
                color: "#212121",
                mb: 2,
              }}
            >
              10. Intellectual Property
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: "#424242",
                lineHeight: 1.8,
              }}
            >
              All content on this website, including text, graphics, logos, and images, is the property of Bicycles2U and is protected by copyright and trademark laws. Unauthorized use is prohibited.
            </Typography>
          </Box>

          {/* 11. Privacy */}
          <Box sx={{ mb: 4 }}>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 600,
                color: "#212121",
                mb: 2,
              }}
            >
              11. Privacy
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: "#424242",
                lineHeight: 1.8,
              }}
            >
              We respect your privacy. Any personal information collected (name, email, phone number) is used solely for providing our services and communicating with you. We will never sell or share your information with third parties without your consent.
            </Typography>
          </Box>

          {/* 12. Dispute Resolution */}
          <Box sx={{ mb: 4 }}>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 600,
                color: "#212121",
                mb: 2,
              }}
            >
              12. Dispute Resolution
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: "#424242",
                lineHeight: 1.8,
              }}
            >
              Any disputes arising from these terms will be resolved through good faith negotiation. If a resolution cannot be reached, disputes will be handled under the laws of New South Wales, Australia.
            </Typography>
          </Box>

          {/* 13. Changes to Terms */}
          <Box sx={{ mb: 4 }}>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 600,
                color: "#212121",
                mb: 2,
              }}
            >
              13. Changes to Terms
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: "#424242",
                lineHeight: 1.8,
              }}
            >
              We reserve the right to update these Terms of Service at any time. Changes will be effective immediately upon posting to this website. Continued use of our services after changes constitutes acceptance of the updated terms.
            </Typography>
          </Box>

          <Divider sx={{ my: 4 }} />

          {/* Contact Section */}
          <Box
            sx={{
              backgroundColor: "#f5f5f5",
              p: 3,
              borderRadius: 2,
              mt: 4,
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                color: "#212121",
                mb: 2,
              }}
            >
              Questions?
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: "#424242",
                lineHeight: 1.8,
                mb: 2,
              }}
            >
              If you have any questions about these Terms of Service, please contact us:
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <Typography
                variant="body2"
                sx={{
                  color: "#424242",
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <i className="fi fi-rr-envelope" style={{ color: "#0288d1" }}></i>
                bicyclerepairs2u@gmail.com
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: "#424242",
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <i className="fi fi-rr-phone-call" style={{ color: "#0288d1" }}></i>
                0402 880 242
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: "#424242",
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <i className="fi fi-rr-marker" style={{ color: "#0288d1" }}></i>
                167/171 Bronte Rd, Queens Park NSW 2022
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  )
}
