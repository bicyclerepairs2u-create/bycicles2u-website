import type { Metadata } from "next"
import FirstBikeGuide from "@/components/first-bike-guide"

export const metadata: Metadata = {
  title: "Buying Your First Road Bike - Complete Guide | Bicycles2U",
  description: "Expert guide to buying your first road or triathlon bike. Learn about sizing, what to look for, budget considerations, and essential tips from experienced mechanics.",
}

export default function FirstBikePage() {
  return <FirstBikeGuide />
}
