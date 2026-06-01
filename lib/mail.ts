import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER || '',
    pass: process.env.SMTP_PASS || '',
  },
})

export async function sendEmail({ to, subject, html }: { to: string; subject: string; html: string }) {
  // Jika SMTP belum diset, log ke console saja untuk testing
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.log('--- EMAIL MOCK ---')
    console.log(`To: ${to}`)
    console.log(`Subject: ${subject}`)
    console.log(`Body: ${html}`)
    console.log('------------------')
    return true
  }

  try {
    await transporter.sendMail({
      from: `"KeNikahan" <${process.env.SMTP_USER}>`,
      to,
      subject,
      html,
    })
    return true
  } catch (error) {
    console.error('Email send error:', error)
    return false
  }
}
