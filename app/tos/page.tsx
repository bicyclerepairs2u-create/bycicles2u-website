import type { Metadata } from "next"
import TermsOfService from "@/components/terms-of-service"

export const metadata: Metadata = {
  title: "Terms of Service | Bicycles2U",
  description: "Terms of Service for Bicycles2U - Premium road bike specialists in Queens Park, Sydney.",
}

export default function TermsOfServicePage() {
  return <TermsOfService />
}
