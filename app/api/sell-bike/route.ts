import { NextRequest, NextResponse } from "next/server"
import nodemailer from "nodemailer"

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
    const price = formData.get("price") as string
    const description = formData.get("description") as string
    const image = formData.get("image") as File | null

    // Validate required fields
    if (
      !sellerName ||
      !email ||
      !phone ||
      !bikeBrand ||
      !bikeModel ||
      !year ||
      !condition ||
      !price ||
      !description
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    // Create nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    })

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
- Asking Price: $${price}

Description:
${description}
    `.trim()

    // Prepare email options
    const mailOptions: any = {
      from: process.env.GMAIL_USER,
      to: process.env.GMAIL_USER,
      replyTo: email,
      subject: emailSubject,
      text: emailBody,
    }

    // Add image attachment if provided
    if (image) {
      const buffer = Buffer.from(await image.arrayBuffer())
      mailOptions.attachments = [
        {
          filename: image.name,
          content: buffer,
        },
      ]
    }

    // Send email
    await transporter.sendMail(mailOptions)

    return NextResponse.json(
      { message: "Email sent successfully" },
      { status: 200 }
    )
  } catch (error) {
    console.error("Error sending email:", error)
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    )
  }
}
