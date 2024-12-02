import nodemailer from "nodemailer";

const verificationEmail = (mailOptions) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: process.env.MAIL_PORT,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    transporter.sendMail(mailOptions, (err, info) => {
      err
        ? console.log(`EMAIL ERROR: ${err.message}`)
        : console.log(info.response);
    });
  } catch (err) {
    console.error(err.message);
  }
};

export { verificationEmail };
