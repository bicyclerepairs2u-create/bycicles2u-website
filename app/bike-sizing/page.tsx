import type { Metadata } from "next"
import BikeSizingForm from "@/components/bike-sizing-form"

export const metadata: Metadata = {
  title: "Find Your Bike Size | Bicycles2U",
  description: "Use our bike sizing calculator to find the perfect frame size for your road or triathlon bike based on your measurements.",
}

export default function BikeSizingPage() {
  return <BikeSizingForm />
}
