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
				py: { xs: 10, md: 14 },
				backgroundColor: "var(--theme-bg-secondary)",
				position: "relative",
				overflow: "hidden",
			}}
		>
			{/* Subtle Background Gradient */}
			<Box
				sx={{
					position: "absolute",
					top: 0,
					left: 0,
					width: "100%",
					height: "100%",
					background: "radial-gradient(ellipse at bottom left, var(--theme-accent-glow) 0%, transparent 50%)",
					zIndex: 0,
				}}
			/>

			<Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
				{/* Section Header */}
				<Box sx={{ textAlign: "center", mb: 6 }}>
					<Typography
						sx={{
							fontSize: "0.625rem",
							fontWeight: 600,
							letterSpacing: "0.2em",
							textTransform: "uppercase",
							color: "#00d4ff",
							mb: 2,
						}}
					>
						Testimonials
					</Typography>

					<Typography
						variant="h2"
						sx={{
							fontSize: { xs: "2rem", md: "3rem" },
							fontWeight: 900,
							color: "var(--theme-text-primary)",
							mb: 2,
							letterSpacing: "-0.04em",
							textTransform: "uppercase",
						}}
					>
						Customer Reviews
					</Typography>

					<Typography
						variant="body1"
						sx={{
							fontSize: "1rem",
							color: "var(--theme-text-muted)",
							maxWidth: "500px",
							mx: "auto",
						}}
					>
						Trusted by serious cyclists across Sydney
					</Typography>
				</Box>

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
								p: 0,
								borderRadius: 0,
								backgroundColor: "var(--theme-bg-primary)",
								border: "1px solid var(--theme-border)",
								transition: "all 0.3s ease",
								flex: { xs: "1 1 100%", sm: "1 1 calc(50% - 12px)", md: "1 1 calc(33.333% - 16px)" },
								maxWidth: { xs: "100%", sm: "calc(50% - 12px)", md: "380px" },
								position: "relative",
								overflow: "hidden",
								clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0 100%)",
								animation: `fadeInUp 0.5s ease-out ${index * 0.1}s forwards`,
								opacity: 0,
								"@keyframes fadeInUp": {
									"0%": { opacity: 0, transform: "translateY(20px)" },
									"100%": { opacity: 1, transform: "translateY(0)" },
								},
								"&:hover": {
									boxShadow: "0 0 30px var(--theme-accent-glow)",
									borderColor: "#00d4ff",
									transform: "translateY(-4px)",
								},
							}}
						>
							{/* Top accent line */}
							<Box
								sx={{
									position: "absolute",
									top: 0,
									left: 0,
									width: "100%",
									height: "2px",
									background: "linear-gradient(90deg, #00d4ff 0%, transparent 60%)",
								}}
							/>

							<Box sx={{ p: 3 }}>
								<Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 3 }}>
									<Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
										<Box
											sx={{
												width: 44,
												height: 44,
												backgroundColor: "#00d4ff",
												color: "#000000",
												display: "flex",
												alignItems: "center",
												justifyContent: "center",
												fontWeight: 700,
												fontSize: "0.875rem",
												clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%)",
											}}
										>
											{testimonial.initials}
										</Box>
										<Box>
											<Typography
												variant="subtitle2"
												sx={{
													fontWeight: 700,
													color: "var(--theme-text-primary)",
													fontSize: "0.875rem",
													textTransform: "uppercase",
													letterSpacing: "0.02em",
												}}
											>
												{testimonial.name}
											</Typography>
											<Typography variant="caption" sx={{ color: "var(--theme-text-muted)", fontSize: "0.75rem" }}>
												{testimonial.timeAgo}
											</Typography>
										</Box>
									</Box>
									<Box sx={{ display: "flex", gap: 0.25 }}>
										{[...Array(testimonial.rating)].map((_, i) => (
											<i key={i} className="fi fi-sr-star" style={{ color: "#00d4ff", fontSize: "0.875rem" }}></i>
										))}
									</Box>
								</Box>

								<Typography
									variant="body2"
									sx={{
										color: "var(--theme-text-secondary)",
										lineHeight: 1.7,
										fontSize: "0.875rem",
										fontStyle: "italic",
									}}
								>
									"{testimonial.review}"
								</Typography>
							</Box>
						</Paper>
					))}
				</Box>

				{/* Bottom accent */}
				<Box
					sx={{
						display: "flex",
						justifyContent: "center",
						mt: 6,
					}}
				>
					<Box
						sx={{
							display: "flex",
							alignItems: "center",
							gap: 2,
						}}
					>
						<Box sx={{ width: "40px", height: "1px", backgroundColor: "#00d4ff", opacity: 0.5 }} />
						<Typography
							sx={{
								fontSize: "0.625rem",
								fontWeight: 600,
								letterSpacing: "0.2em",
								textTransform: "uppercase",
								color: "var(--theme-text-muted)",
							}}
						>
							5 Star Rated
						</Typography>
						<Box sx={{ width: "40px", height: "1px", backgroundColor: "#00d4ff", opacity: 0.5 }} />
					</Box>
				</Box>
			</Container>
		</Box>
	)
}
