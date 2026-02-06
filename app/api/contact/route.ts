import { NextRequest, NextResponse } from "next/server"
import nodemailer from "nodemailer"

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

    // Create nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    })

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

    // Prepare email options
    const mailOptions: any = {
      from: process.env.GMAIL_USER,
      to: process.env.GMAIL_USER,
      replyTo: email,
      subject: emailSubject,
      text: emailBody,
    }

    // Add image attachments if provided
    if (images.length > 0) {
      mailOptions.attachments = await Promise.all(
        images.map(async (image, index) => ({
          filename: `photo_${index + 1}_${image.name}`,
          content: Buffer.from(await image.arrayBuffer()),
        }))
      )
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
