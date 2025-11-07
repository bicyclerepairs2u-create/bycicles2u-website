"use client"

import { Box, Container, Typography, Card, CardContent, Avatar, Rating } from "@mui/material"

const testimonials = [
	{
		name: "Alex T.",
		service: "Custom Build",
		rating: 5,
		review: "Sam completely rebuilt my tri bike for Ironman. The attention to detail was incredible. Highly recommend!",
		initials: "AT",
	},
	{
		name: "Michelle R.",
		service: "Bike Purchase",
		rating: 5,
		review:
			"Bought a second-hand Tarmac from Bicycles2U. Bike was in pristine condition and priced fairly. Great experience!",
		initials: "MR",
	},
	{
		name: "David K.",
		service: "Full Service",
		rating: 5,
		review: "Best bike mechanic I've found. Knows road bikes inside and out. My bike has never performed better.",
		initials: "DK",
	},
	{
		name: "Emma L.",
		service: "Custom Build",
		rating: 5,
		review: "Sam helped me build my dream custom road bike. Every component was chosen perfectly for my riding style.",
		initials: "EL",
	},
	{
		name: "Tom W.",
		service: "Bike Repair",
		rating: 5,
		review: "Professional, knowledgeable, and fair pricing. Won't take my bike anywhere else for servicing.",
		initials: "TW",
	},
	{
		name: "Jessica P.",
		service: "Bike Purchase",
		rating: 5,
		review: "Purchased a tri bike and had Sam do a full tune-up. Incredible service and expertise!",
		initials: "JP",
	},
]

export default function Testimonials() {
	return (
		<Box
			id="testimonials"
			component="section"
			sx={{
				py: { xs: 8, md: 12 },
				backgroundColor: "#fafafa",
			}}
		>
			<Container maxWidth="lg">
				<Typography
					variant="h2"
					sx={{
						fontSize: { xs: "2rem", md: "3rem" },
						fontWeight: 700,
						color: "#212121",
						mb: 8,
						textAlign: "center",
						letterSpacing: "-1px",
					}}
				>
					What Our Customers Say
				</Typography>

				<Box sx={{ display: "grid", gap: 4, gridTemplateColumns: { xs: "1fr", md: "repeat(2, 1fr)" } }}>
					{testimonials.map((testimonial, index) => (
						<Box key={index}>
							<Card
								elevation={0}
								sx={{
									height: "100%",
									minHeight: "280px",
									borderRadius: "12px",
									backgroundColor: "#ffffff",
									p: 3,
									display: "flex",
									flexDirection: "column",
									boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
								}}
							>
								<Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
									<Avatar
										sx={{
											width: 56,
											height: 56,
											backgroundColor: "#0288d1",
											fontWeight: 600,
											fontSize: "1.2rem",
											mr: 2,
										}}
									>
										{testimonial.initials}
									</Avatar>
									<Box>
										<Typography
											variant="h6"
											sx={{
												fontWeight: 600,
												color: "#212121",
												fontSize: "1rem",
											}}
										>
											{testimonial.name}
										</Typography>
										<Typography
											variant="body2"
											sx={{
												color: "#757575",
												fontSize: "0.85rem",
											}}
										>
											{testimonial.service}
										</Typography>
									</Box>
								</Box>

								<Rating
									value={testimonial.rating}
									readOnly
									sx={{
										mb: 2,
										"& .MuiRating-iconFilled": {
											color: "#0288d1",
										},
									}}
								/>

								<CardContent sx={{ p: 0, flexGrow: 1 }}>
									<Typography
										variant="body1"
										sx={{
											color: "#424242",
											lineHeight: 1.7,
											fontSize: "0.95rem",
											fontStyle: "italic",
										}}
									>
										"{testimonial.review}"
									</Typography>
								</CardContent>
							</Card>
						</Box>
					))}
				</Box>
			</Container>
		</Box>
	)
}
