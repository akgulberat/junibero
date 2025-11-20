import { NextResponse } from "next/server"
import nodemailer from "nodemailer"

export async function POST(req: Request) {
    try {
        const { nameSurname, email, message } = await req.json()

        // Validation
        if (!nameSurname || !email || !message) {
            return NextResponse.json({ success: false, error: "Lütfen zorunlu alanları doldurun." }, { status: 400 })
        }

        // ✉️ Nodemailer transporter (örnek Gmail)
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.SMTP_USER, // .env içine yaz
                pass: process.env.SMTP_PASS,
            },
        })

        const mailOptions = {
            from: process.env.SMTP_USER,
            to: "info@junibero.com", // hedef e-posta
            subject: `${nameSurname}`,
            html: `
        <h3>junibero.com üzereinden yeni mesaj</h3>
        <p><b>Name Surname:</b> ${nameSurname}</p>
        <p><b>E-Mail:</b> ${email}</p>
        <p><b>Message:</b> ${message} </p>
      `,
        }

        await transporter.sendMail(mailOptions)
        return NextResponse.json({ success: true })
    } catch (err) {
        console.error(err)
        return NextResponse.json({ success: false, error: "E-Mail gönderilemedi." }, { status: 500 })
    }
}