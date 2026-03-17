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
    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const phone = formData.get("phone") as string
    const inquiryType = formData.get("inquiryType") as string
    const serviceLevel = formData.get("serviceLevel") as string
    const bikeType = formData.get("bikeType") as string
    const bikeDetails = formData.get("bikeDetails") as string
    const pickupNeeded = formData.get("pickupNeeded") as string
    const message = formData.get("message") as string

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
    if (!name || !email || !phone || !inquiryType || !message) {
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
        filename: `photo_${index + 1}_${image.name}`,
        content: Buffer.from(await image.arrayBuffer()),
      }))
    )

    // Prepare email content
    const emailSubject = `${inquiryType} Inquiry - ${name}`
    const emailBody = `
New Contact Form Submission

Inquiry Type: ${inquiryType}
${serviceLevel ? `Service Level: ${serviceLevel}` : ""}
${bikeType ? `Bike Type: ${bikeType}` : ""}
${bikeDetails ? `Bike Details: ${bikeDetails}` : ""}
${pickupNeeded ? `Pickup/Delivery: ${pickupNeeded}` : ""}

Contact Information:
Name: ${name}
Email: ${email}
Phone: ${phone}

Message:
${message}
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
        console.error("Error sending contact email:", error)
      }
    })

    return NextResponse.json(
      { message: "Inquiry received successfully" },
      { status: 200 }
    )
  } catch (error) {
    console.error("Error processing contact submission:", error)
    return NextResponse.json(
      { error: "Failed to process your inquiry. Please try again." },
      { status: 500 }
    )
  }
}
