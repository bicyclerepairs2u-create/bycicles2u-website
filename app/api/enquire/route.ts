import { NextRequest, NextResponse } from "next/server"
import nodemailer from "nodemailer"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const { name, email, phone, message, bikeTitle, bikePrice, bikeUrl } = body

    if (!name || !email || !phone) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    })

    // Email to the business
    const businessSubject = `Bike Enquiry — ${bikeTitle}`
    const businessHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #111; padding: 24px; text-align: center;">
          <h1 style="color: #00d4ff; margin: 0; font-size: 22px; letter-spacing: 2px; text-transform: uppercase;">
            New Bike Enquiry
          </h1>
        </div>
        <div style="background: #1a1a1a; padding: 24px; border-left: 3px solid #00d4ff;">
          <h2 style="color: #fff; margin: 0 0 4px 0; font-size: 18px;">${bikeTitle}</h2>
          <p style="color: #00d4ff; margin: 0 0 16px 0; font-size: 20px; font-weight: bold;">${bikePrice}</p>
          ${bikeUrl ? `<a href="${bikeUrl}" style="color: #00d4ff; font-size: 13px;">View listing</a>` : ""}
        </div>
        <div style="background: #f9f9f9; padding: 24px;">
          <h3 style="margin: 0 0 12px 0; color: #333; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">
            Customer Details
          </h3>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; color: #666; width: 80px; vertical-align: top;">Name</td>
              <td style="padding: 8px 0; color: #111; font-weight: 600;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #666; vertical-align: top;">Email</td>
              <td style="padding: 8px 0; color: #111;"><a href="mailto:${email}" style="color: #0288d1;">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #666; vertical-align: top;">Phone</td>
              <td style="padding: 8px 0; color: #111;"><a href="tel:${phone}" style="color: #0288d1;">${phone}</a></td>
            </tr>
            ${message ? `
            <tr>
              <td style="padding: 8px 0; color: #666; vertical-align: top;">Message</td>
              <td style="padding: 8px 0; color: #111;">${message}</td>
            </tr>
            ` : ""}
          </table>
        </div>
      </div>
    `

    // Confirmation email to the customer
    const customerSubject = `Your enquiry for ${bikeTitle} — Bicycles2U`
    const customerHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #111; padding: 24px; text-align: center;">
          <h1 style="color: #00d4ff; margin: 0; font-size: 22px; letter-spacing: 2px; text-transform: uppercase;">
            Bicycles2U
          </h1>
        </div>
        <div style="background: #fff; padding: 24px;">
          <p style="color: #333; font-size: 16px; line-height: 1.6; margin: 0 0 16px 0;">
            Hi ${name},
          </p>
          <p style="color: #333; font-size: 16px; line-height: 1.6; margin: 0 0 24px 0;">
            Thanks for your enquiry about the <strong>${bikeTitle}</strong>. We've received your message and will be in touch shortly to arrange a viewing or answer any questions.
          </p>
          <div style="background: #f5f5f5; padding: 16px; border-left: 3px solid #00d4ff; margin: 0 0 24px 0;">
            <p style="margin: 0 0 4px 0; color: #111; font-weight: 600; font-size: 16px;">${bikeTitle}</p>
            <p style="margin: 0; color: #00d4ff; font-weight: bold; font-size: 18px;">${bikePrice}</p>
          </div>
          <p style="color: #333; font-size: 16px; line-height: 1.6; margin: 0 0 8px 0;">
            All viewings and purchases are in-person at our location:
          </p>
          <p style="color: #333; font-size: 15px; line-height: 1.6; margin: 0 0 24px 0;">
            <strong>Bicycles2U</strong><br>
            Queens Park / Bondi Junction<br>
            Phone: <a href="tel:0402880242" style="color: #0288d1;">0402 880 242</a>
          </p>
          <p style="color: #666; font-size: 14px; line-height: 1.6; margin: 0;">
            We look forward to helping you find the perfect ride!
          </p>
        </div>
        <div style="background: #111; padding: 16px; text-align: center;">
          <p style="color: #666; font-size: 12px; margin: 0;">
            Bicycles2U — Premium Road, Race & TT Bicycles
          </p>
        </div>
      </div>
    `

    // Send both emails
    await Promise.all([
      transporter.sendMail({
        from: process.env.GMAIL_USER,
        to: process.env.GMAIL_USER,
        replyTo: email,
        subject: businessSubject,
        html: businessHtml,
      }),
      transporter.sendMail({
        from: process.env.GMAIL_USER,
        to: email,
        subject: customerSubject,
        html: customerHtml,
      }),
    ])

    return NextResponse.json(
      { message: "Enquiry sent successfully" },
      { status: 200 }
    )
  } catch (error) {
    console.error("Error sending enquiry:", error)
    return NextResponse.json(
      { error: "Failed to send enquiry" },
      { status: 500 }
    )
  }
}
