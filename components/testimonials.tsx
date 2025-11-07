"use client"

import { Box, Container, Typography, Paper } from "@mui/material"

const testimonials = [
	{
		name: "Harry Coates",
		timeAgo: "5 days ago",
		rating: 5,
		review: "Excellent service. Delivered straight to my door. Very happy and would highly recommend.",
		initials: "HC",
	},
	{
		name: "Filippo Gardini",
		timeAgo: "a week ago",
		rating: 5,
		review:
			"Amazing service, great guy to deal with and quick compared to the rest of others in the market. Definitely recommended.",
		initials: "FG",
	},
	{
		name: "Christian Townsend",
		timeAgo: "a month ago",
		rating: 5,
		review:
			"I can't recommend Bicycles2U highly enough. Sam is an absolute expert—knowledgeable, friendly, and reasonable. He went above and beyond, coming out on a Sunday afternoon of a long weekend with a full kit of professional tools.",
		initials: "CT",
	},
	{
		name: "Gracen Luka",
		timeAgo: "3 months ago",
		rating: 5,
		review:
			"Made purchasing a bike for my first tri very easy. Was great to get the bike properly fitted and to top it off, some speedy pink handle bars.",
		initials: "GL",
	},
	{
		name: "Andrea Vagge",
		timeAgo: "3 months ago",
		rating: 5,
		review:
			"First time at Bicycles2U.. Very happy with the service they did to my MTB.. very friendly and professional, Sam managed to return my bike before the due date. I think I found who I trust to look after and maintain my beloved bike.",
		initials: "AV",
	},
]

export default function Testimonials() {
	return (
		<Box
			id="testimonials"
			component="section"
			sx={{
				py: { xs: 6, md: 10 },
				backgroundColor: "#fafafa",
			}}
		>
			<Container maxWidth="lg">
				<Typography
					variant="h2"
					sx={{
						fontSize: { xs: "2rem", md: "2.5rem" },
						fontWeight: 700,
						color: "#212121",
						mb: 2,
						textAlign: "center",
						letterSpacing: "-1px",
					}}
				>
					Customer Reviews
				</Typography>

				<Typography
					variant="body1"
					sx={{
						fontSize: "1rem",
						color: "#757575",
						mb: 5,
						textAlign: "center",
					}}
				>
					See what our customers have to say
				</Typography>

				<Box
					sx={{
						display: "flex",
						flexWrap: "wrap",
						gap: 3,
						justifyContent: "center",
						maxWidth: "1200px",
						mx: "auto",
					}}
				>
					{testimonials.map((testimonial, index) => (
						<Paper
							key={index}
							elevation={0}
							sx={{
								p: 3,
								borderRadius: "8px",
								backgroundColor: "#ffffff",
								border: "1px solid #e0e0e0",
								transition: "all 0.3s ease",
								flex: { xs: "1 1 100%", sm: "1 1 calc(50% - 12px)", md: "1 1 calc(33.333% - 16px)" },
								maxWidth: { xs: "100%", sm: "calc(50% - 12px)", md: "380px" },
								"&:hover": {
									boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
									borderColor: "#0288d1",
								},
							}}
						>
							<Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2 }}>
								<Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
									<Box
										sx={{
											width: 40,
											height: 40,
											borderRadius: "50%",
											backgroundColor: "#0288d1",
											color: "#ffffff",
											display: "flex",
											alignItems: "center",
											justifyContent: "center",
											fontWeight: 600,
											fontSize: "0.9rem",
										}}
									>
										{testimonial.initials}
									</Box>
									<Box>
										<Typography variant="subtitle2" sx={{ fontWeight: 600, color: "#212121", fontSize: "0.9rem" }}>
											{testimonial.name}
										</Typography>
										<Typography variant="caption" sx={{ color: "#757575", fontSize: "0.75rem" }}>
											{testimonial.timeAgo}
										</Typography>
									</Box>
								</Box>
								<Box sx={{ display: "flex", gap: 0.5 }}>
									{[...Array(testimonial.rating)].map((_, i) => (
										<i key={i} className="fi fi-sr-star" style={{ color: "#0288d1", fontSize: "1rem" }}></i>
									))}
								</Box>
							</Box>

							<Typography
								variant="body2"
								sx={{
									color: "#424242",
									lineHeight: 1.6,
									fontSize: "0.875rem",
								}}
							>
								"{testimonial.review}"
							</Typography>
						</Paper>
					))}
				</Box>
			</Container>
		</Box>
	)
}
