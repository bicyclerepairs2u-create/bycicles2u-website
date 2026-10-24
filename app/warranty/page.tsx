import type { Metadata } from "next"
import Warranty from "@/components/warranty"

export const metadata: Metadata = {
  title: "Warranty | Bicycles2U",
  description: "Carbon and mechanical warranty for second-hand road bicycles sold by Bicycles2U in Queens Park, Sydney.",
}

export default function WarrantyPage() {
  return <Warranty />
}
