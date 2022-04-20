const nodemailer = require('nodemailer')

const sendEmail = async (options) => {
  // 1) CREATE A TRANSPORTER
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD
    }
  })

  // 2) DEFINE EMAIL OPTIONS
  const mailOptions = {
    from: 'CrackerJaps <thecrackerjaps@gmail.com>',
    to: options.email,
    subject: options.subject,
    html: options.message
    // html:
  }

  // 3) SEND THE EMAIL
  await transporter.sendMail(mailOptions)
}

module.exports = sendEmail

// service: 'Gmail ',
// auth: {
//   user: process.env.EMAIL_USERNAME,
//   password: process.env.EMAIL_PASSWORD,
//   },
// Activate in gmail "less secure app" option
