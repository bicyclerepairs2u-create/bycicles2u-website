"use client"

import Navigation from "@/components/navigation"
import HeroSection from "@/components/hero-section"
import FeaturedBikes from "@/components/featured-bikes"
import Testimonials from "@/components/testimonials"
import BrandsSection from "@/components/brands-section"
import ServicesSection from "@/components/services-section"
import ContactSection from "@/components/contact-section"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <main>
      <Navigation />
      <HeroSection />
      <FeaturedBikes />
      <Testimonials />
      <BrandsSection />
      <ServicesSection />
      <ContactSection />
      <Footer />
    </main>
  )
}
