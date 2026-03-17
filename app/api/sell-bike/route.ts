import { NextRequest, NextResponse } from "next/server"
import { after } from "next/server"
import nodemailer from "nodemailer"

const VALID_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/heic",
  "image/heif",
]

const MAX_FILE_SIZE = 4.5 * 1024 * 1024 // 4.5MB (Vercel serverless limit)

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()

    // Extract form fields
    const sellerName = formData.get("sellerName") as string
    const email = formData.get("email") as string
    const phone = formData.get("phone") as string
    const bikeBrand = formData.get("bikeBrand") as string
    const bikeModel = formData.get("bikeModel") as string
    const year = formData.get("year") as string
    const condition = formData.get("condition") as string
    const description = formData.get("description") as string

    // Extract all images
    const images: File[] = []
    let imageIndex = 0
    while (formData.has(`image_${imageIndex}`)) {
      const image = formData.get(`image_${imageIndex}`) as File
      if (image) {
        images.push(image)
      }
      imageIndex++
    }

    // Validate required fields
    if (
      !sellerName ||
      !email ||
      !phone ||
      !bikeBrand ||
      !bikeModel ||
      !year ||
      !condition ||
      !description
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    // Validate image files if provided
    for (const image of images) {
      if (image.size > MAX_FILE_SIZE) {
        return NextResponse.json(
          { error: "Image is too large. Maximum size is 4.5MB." },
          { status: 413 }
        )
      }

      if (!VALID_IMAGE_TYPES.includes(image.type)) {
        return NextResponse.json(
          { error: "Invalid image format. Please upload a JPG, PNG, WebP, or HEIC file." },
          { status: 400 }
        )
      }
    }

    // Pre-read image buffers before responding (can't read FormData after response)
    const imageAttachments = await Promise.all(
      images.map(async (image, index) => ({
        filename: `bike_photo_${index + 1}_${image.name}`,
        content: Buffer.from(await image.arrayBuffer()),
      }))
    )

    // Prepare email content
    const emailSubject = `Bike Sale Submission: ${bikeBrand} ${bikeModel}`
    const emailBody = `
New Bike Sale Submission

Seller Information:
- Name: ${sellerName}
- Email: ${email}
- Phone: ${phone}

Bike Details:
- Brand: ${bikeBrand}
- Model: ${bikeModel}
- Year: ${year}
- Condition: ${condition}

Description:
${description}
    `.trim()

    // Send email in the background after responding to client
    after(async () => {
      try {
        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: process.env.GMAIL_USER,
            pass: process.env.GMAIL_APP_PASSWORD,
          },
        })

        const mailOptions: nodemailer.SendMailOptions = {
          from: process.env.GMAIL_USER,
          to: process.env.GMAIL_USER,
          replyTo: email,
          subject: emailSubject,
          text: emailBody,
        }

        if (imageAttachments.length > 0) {
          mailOptions.attachments = imageAttachments
        }

        await transporter.sendMail(mailOptions)
      } catch (error) {
        console.error("Error sending sell-bike email:", error)
      }
    })

    return NextResponse.json(
      { message: "Submission received successfully" },
      { status: 200 }
    )
  } catch (error) {
    console.error("Error processing sell-bike submission:", error)
    return NextResponse.json(
      { error: "Failed to process your submission. Please try again." },
      { status: 500 }
    )
  }
}
