import type React from "react"
import type { Metadata } from "next"
import { Roboto } from "next/font/google"
import "./globals.css"
import { Analytics } from "@vercel/analytics/next"

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
})

export const metadata: Metadata = {
  title: "Sydney's Original Pre-Owned Bicycle Store",
  description:
    "Expert repairs, custom builds, and quality second-hand bikes for serious cyclists. Specializing in lightweight, fast road bikes and triathlon bikes.",
  icons: {
    icon: '/icon.svg',
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={roboto.className}>
      <head>
        <link rel="stylesheet" href="https://cdn-uicons.flaticon.com/2.6.0/uicons-regular-rounded/css/uicons-regular-rounded.css" />
      </head>
      <body>{children}</body>
      <Analytics/>
    </html>
  )
}
