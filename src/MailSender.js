const nodemailer = require('nodemailer');

class MailSender {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });
  }

  sendEmail(targetEmail, content) {
    const message = {
      from: 'OpenMusicAPIv3',
      to: targetEmail,
      subject: 'Export Playlist',
      text: 'Terlampir hasil dari export playlist',
      attachments: {
        filename: 'playlist.json',
        content,
      },
    };
    return this.transporter.sendMail(message);
  }
}

module.exports = MailSender;
