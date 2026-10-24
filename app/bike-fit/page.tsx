import type { Metadata } from "next"
import BikeFit from "@/components/bike-fit"

export const metadata: Metadata = {
  title: "Bike Fit | Bicycles2U",
  description: "Professional road, race and time-trial bike fitting in Queens Park. A basic fit is free with every bike purchased from Bicycles2U.",
}

export default function BikeFitPage() {
  return <BikeFit />
}
