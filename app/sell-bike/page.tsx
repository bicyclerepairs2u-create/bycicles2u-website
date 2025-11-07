import type { Metadata } from "next"
import SellBikeForm from "@/components/sell-bike-form"

export const metadata: Metadata = {
  title: "Sell Your Bike - Bicycles2U",
  description: "List your premium road or triathlon bike for sale with Bicycles2U",
}

export default function SellBikePage() {
  return <SellBikeForm />
}
