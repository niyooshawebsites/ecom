import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

const verificationEmail = (mailOptions) => {
  transporter.sendMail(mailOptions, (err, info) => {
    err ? console.log(err) : console.log(info.response);
  });
};

export { verificationEmail };
