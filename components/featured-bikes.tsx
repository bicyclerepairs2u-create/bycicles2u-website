"use client"

import { useEffect, useState } from "react"
import { Box, Container, Typography, Button, Skeleton } from "@mui/material"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Zap, Weight, Target } from "lucide-react"

interface FeaturedProduct {
  id: string
  handle: string
  title: string
  vendor: string
  productType: string
  tags: string[]
  availableForSale: boolean
  featuredImage: {
    url: string
    altText: string | null
  } | null
  priceRange: {
    minVariantPrice: {
      amount: string
      currencyCode: string
    }
  }
}

function formatPrice(price: { amount: string; currencyCode: string }): string {
  return new Intl.NumberFormat('en-AU', {
    style: 'currency',
    currency: price.currencyCode,
  }).format(parseFloat(price.amount))
}

function getRecommendedFor(product: FeaturedProduct): string {
  const tags = product.tags.map(t => t.toLowerCase())
  const productType = product.productType.toLowerCase()

  if (tags.includes('triathlon') || productType.includes('triathlon') || productType.includes('tt')) {
    return 'Triathlon / Time Trial'
  }
  if (tags.includes('race') || tags.includes('racing') || tags.includes('competition')) {
    return 'Racing / Competition'
  }
  if (tags.includes('endurance') || tags.includes('gran fondo')) {
    return 'Endurance / Gran Fondo'
  }
  if (tags.includes('gravel') || productType.includes('gravel')) {
    return 'Gravel / Adventure'
  }
  if (tags.includes('aero') || productType.includes('aero')) {
    return 'Aero Road Racing'
  }
  return 'Road Cycling'
}

function FeaturedBikeCard({ product, index }: { product: FeaturedProduct; index: number }) {
  const recommendedFor = getRecommendedFor(product)

  return (
    <Link href={`/shop/${product.handle}`}>
      <Box
        sx={{
          position: "relative",
          backgroundColor: "var(--theme-bg-secondary)",
          overflow: "hidden",
          transition: "all 0.3s ease",
          clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 25px), calc(100% - 25px) 100%, 0 100%)",
          "&:hover": {
            boxShadow: "0 0 40px var(--theme-accent-glow)",
            transform: "translateY(-4px)",
          },
        }}
      >
        {/* Corner Accent */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            right: 0,
            width: "60px",
            height: "3px",
            backgroundColor: "#ff1744",
            zIndex: 20,
          }}
        />
        <Box
          sx={{
            position: "absolute",
            top: 0,
            right: 0,
            width: "3px",
            height: "40px",
            backgroundColor: "#ff1744",
            zIndex: 20,
          }}
        />

        {/* Featured Badge */}
        {index === 0 && (
          <Box
            sx={{
              position: "absolute",
              top: 12,
              left: 0,
              backgroundColor: "#ff1744",
              color: "#000",
              px: 2,
              py: 0.5,
              fontSize: "0.625rem",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              zIndex: 20,
            }}
          >
            Featured
          </Box>
        )}

        {/* Image */}
        <Box
          sx={{
            position: "relative",
            aspectRatio: "4/3",
            backgroundColor: "var(--theme-bg-tertiary)",
            overflow: "hidden",
          }}
        >
          {product.featuredImage ? (
            <Image
              src={product.featuredImage.url}
              alt={product.featuredImage.altText || product.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          ) : (
            <Box
              sx={{
                display: "flex",
                height: "100%",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography sx={{ color: "var(--theme-text-muted)", fontSize: "0.875rem" }}>
                No image
              </Typography>
            </Box>
          )}

          {/* Gradient Overlay */}
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(to top, var(--theme-bg-secondary) 0%, transparent 50%)",
              zIndex: 10,
            }}
          />

          {/* Sold Out Overlay */}
          {!product.availableForSale && (
            <Box
              sx={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "rgba(0,0,0,0.7)",
                zIndex: 30,
              }}
            >
              <Typography
                sx={{
                  backgroundColor: "#fff",
                  color: "#000",
                  px: 3,
                  py: 1,
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                }}
              >
                Sold Out
              </Typography>
            </Box>
          )}
        </Box>

        {/* Content */}
        <Box sx={{ p: 3 }}>
          <Typography
            sx={{
              fontSize: "0.625rem",
              fontWeight: 600,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#ff1744",
              mb: 1,
            }}
          >
            {product.vendor || "Bicycles2U"}
          </Typography>

          <Typography
            variant="h6"
            sx={{
              fontSize: "1.1rem",
              fontWeight: 700,
              color: "var(--theme-text-primary)",
              mb: 2,
              lineHeight: 1.3,
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {product.title}
          </Typography>

          {/* Specs Row */}
          <Box sx={{ display: "flex", gap: 2, mb: 3, flexWrap: "wrap" }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <Target size={14} color="#ff1744" />
              <Typography sx={{ fontSize: "0.7rem", color: "var(--theme-text-muted)" }}>
                {recommendedFor}
              </Typography>
            </Box>
          </Box>

          {/* Price */}
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <Typography
              sx={{
                fontSize: "1.25rem",
                fontWeight: 700,
                color: "#ff1744",
              }}
            >
              {formatPrice(product.priceRange.minVariantPrice)}
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 0.5,
                color: "var(--theme-text-muted)",
                fontSize: "0.75rem",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                transition: "color 0.2s ease",
                "&:hover": {
                  color: "#ff1744",
                },
              }}
            >
              View <ArrowRight size={14} />
            </Box>
          </Box>
        </Box>
      </Box>
    </Link>
  )
}

function LoadingSkeleton() {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "1fr",
          sm: "repeat(2, 1fr)",
          lg: "repeat(3, 1fr)",
        },
        gap: 4,
      }}
    >
      {[1, 2, 3].map((i) => (
        <Box
          key={i}
          sx={{
            backgroundColor: "var(--theme-bg-secondary)",
            clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 25px), calc(100% - 25px) 100%, 0 100%)",
          }}
        >
          <Skeleton
            variant="rectangular"
            sx={{
              aspectRatio: "4/3",
              backgroundColor: "var(--theme-bg-tertiary)",
            }}
          />
          <Box sx={{ p: 3 }}>
            <Skeleton width="30%" height={12} sx={{ mb: 1 }} />
            <Skeleton width="80%" height={24} sx={{ mb: 2 }} />
            <Skeleton width="50%" height={16} sx={{ mb: 3 }} />
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Skeleton width="40%" height={28} />
              <Skeleton width="20%" height={20} />
            </Box>
          </Box>
        </Box>
      ))}
    </Box>
  )
}

export default function FeaturedBikes() {
  const [products, setProducts] = useState<FeaturedProduct[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    async function fetchFeaturedProducts() {
      try {
        const response = await fetch('/api/products/featured')
        if (!response.ok) throw new Error('Failed to fetch')
        const data = await response.json()
        setProducts(data.products || [])
      } catch {
        setError(true)
      } finally {
        setLoading(false)
      }
    }
    fetchFeaturedProducts()
  }, [])

  return (
    <Box
      id="bikes"
      component="section"
      sx={{
        py: { xs: 12, md: 16 },
        backgroundColor: "var(--theme-bg-primary)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background Diagonal Pattern */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundImage: `repeating-linear-gradient(
            -45deg,
            #ff1744,
            #ff1744 1px,
            transparent 1px,
            transparent 60px
          )`,
          opacity: 0.03,
          zIndex: 0,
        }}
      />

      {/* Radial Glow */}
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "800px",
          height: "800px",
          background: "radial-gradient(circle, var(--theme-accent-glow) 0%, transparent 70%)",
          zIndex: 0,
        }}
      />

      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        {/* Section Header */}
        <Box sx={{ mb: 8, textAlign: "center" }}>
          <Typography
            sx={{
              fontSize: "0.625rem",
              fontWeight: 600,
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "#ff1744",
              mb: 2,
            }}
          >
            Premium Selection
          </Typography>
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: "2.5rem", md: "3.5rem" },
              fontWeight: 900,
              color: "var(--theme-text-primary)",
              letterSpacing: "-0.04em",
              textTransform: "uppercase",
              mb: 2,
            }}
          >
            Featured Bikes
          </Typography>
          <Typography
            sx={{
              fontSize: "1rem",
              color: "var(--theme-text-muted)",
              maxWidth: "500px",
              mx: "auto",
            }}
          >
            Hand-picked premium road and triathlon machines built for serious cyclists.
          </Typography>
        </Box>

        {/* Content */}
        {loading ? (
          <LoadingSkeleton />
        ) : error || products.length === 0 ? (
          <Box
            sx={{
              textAlign: "center",
              maxWidth: "600px",
              mx: "auto",
              backgroundColor: "var(--theme-bg-secondary)",
              p: { xs: 4, md: 6 },
              clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 30px), calc(100% - 30px) 100%, 0 100%)",
            }}
          >
            <Box
              sx={{
                fontSize: "3rem",
                mb: 2,
                color: "#ff1744",
              }}
            >
              <i className="fi fi-rr-bicycle"></i>
            </Box>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 700,
                color: "var(--theme-text-primary)",
                mb: 2,
                textTransform: "uppercase",
              }}
            >
              Browse Our Collection
            </Typography>
            <Typography
              sx={{
                color: "var(--theme-text-muted)",
                mb: 4,
              }}
            >
              Visit our shop to explore our full range of premium road and triathlon bikes.
            </Typography>
            <Button
              component={Link}
              href="/shop"
              variant="contained"
              size="large"
              sx={{
                backgroundColor: "#ff1744",
                color: "#000",
                fontWeight: 700,
                fontSize: "0.875rem",
                px: 4,
                py: 1.5,
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                borderRadius: 0,
                boxShadow: "0 4px 20px rgba(255, 23, 68, 0.3)",
                "&:hover": {
                  backgroundColor: "#d50032",
                  boxShadow: "0 6px 30px rgba(255, 23, 68, 0.4)",
                },
              }}
            >
              View All Bikes
            </Button>
          </Box>
        ) : (
          <>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "1fr",
                  sm: "repeat(2, 1fr)",
                  lg: "repeat(3, 1fr)",
                },
                gap: 4,
                mb: 6,
              }}
            >
              {products.slice(0, 3).map((product, index) => (
                <FeaturedBikeCard key={product.id} product={product} index={index} />
              ))}
            </Box>

            {/* View All Button */}
            <Box sx={{ textAlign: "center" }}>
              <Button
                component={Link}
                href="/shop"
                variant="outlined"
                size="large"
                sx={{
                  borderColor: "#ff1744",
                  color: "#ff1744",
                  fontWeight: 700,
                  fontSize: "0.875rem",
                  px: 5,
                  py: 1.5,
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  borderRadius: 0,
                  borderWidth: "2px",
                  "&:hover": {
                    borderColor: "#ff1744",
                    backgroundColor: "#ff1744",
                    color: "#000",
                    borderWidth: "2px",
                  },
                }}
              >
                View All Bikes
                <ArrowRight size={18} style={{ marginLeft: 8 }} />
              </Button>
            </Box>
          </>
        )}
      </Container>
    </Box>
  )
}
