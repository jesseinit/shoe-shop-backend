import nodemailer from 'nodemailer';
const { MAIL_USER, MAIL_PASS } = process.env;

class NotificatonManager {
  static mailTransporter() {
    return nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: MAIL_USER,
        pass: MAIL_PASS,
      },
    });
  }

  static sendMail(userEmail, subject, htmlContent) {
    const mailOptions = {
      from: MAIL_USER,
      to: userEmail,
      subject: subject,
      html: htmlContent,
    };

    this.mailTransporter().sendMail(mailOptions, function (err, info) {
      if (err) throw new Error(`Mail was not sent to ${userEmail}`);
      console.log('Mail was sent>>>>', info);
    });
  }
}

export { NotificatonManager };
