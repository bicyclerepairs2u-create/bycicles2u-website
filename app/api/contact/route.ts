import { NextRequest, NextResponse } from "next/server"
import nodemailer from "nodemailer"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      name,
      email,
      phone,
      inquiryType,
      serviceLevel,
      bikeType,
      bikeDetails,
      pickupNeeded,
      message,
    } = body

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

    // Send email
    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: process.env.GMAIL_USER,
      replyTo: email,
      subject: emailSubject,
      text: emailBody,
    })

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
