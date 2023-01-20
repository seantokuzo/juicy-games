import nodemailer from 'nodemailer'
import pug from 'pug'
import { convert } from 'html-to-text'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

export class Email {
  constructor(user, url) {
    this.to = user.newEmail || user.email
    this.username = user.username
    this.url = url
    this.from = `Juicy Games <${process.env.EMAIL_FROM}>`
  }

  newTransport() {
    if (process.env.NODE_ENV === 'production') {
      // SendGrid
      return nodemailer.createTransport({
        service: 'SendGrid',
        auth: {
          user: process.env.SENDGRID_USERNAME,
          pass: process.env.SENDGRID_PASSWORD
        }
      })
    }

    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD
      }
    })
  }
  // Send the actual email
  async send(template, subject) {
    const __dirname = dirname(fileURLToPath(import.meta.url))
    // 1) RENDER HTML BASED ON A PUG TEMPLATE
    const html = pug.renderFile(`${__dirname}/../email/${template}.pug`, {
      username: this.username,
      url: this.url,
      subject
    })
    // 2) DEFINE EMAIL OPTIONS
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html,
      text: convert(html, {
        wordwrap: 130
      })
    }

    // 3) CREATE A TRANSPORT AND SEND EMAIL

    await this.newTransport().sendMail(mailOptions)
  }

  async sendEmailConfirm() {
    await this.send(
      'confirmEmail',
      'Juicy Games | Please confirm your email address'
    )
  }

  async sendUpdateEmailConfirm() {
    await this.send(
      'updateEmailConfirm',
      'Juicy Games | Please confirm your email address'
    )
  }

  async sendWelcome() {
    await this.send('welcome', 'Juicy Games | Welcome to your worst nightmare!')
  }

  async sendPasswordReset() {
    await this.send(
      'passwordResetEmail',
      'Juicy Games | Password Reset (You got 10 minutes, tick tock...)'
    )
  }
}
