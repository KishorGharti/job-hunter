import transporter from "../config/mailer.js";

export const sendOtpEmail = async (email, otp) => {

  await transporter.sendMail({

    from: process.env.EMAIL_USER,

    to: email,

    subject: "Email Verification OTP",

    html: `
      <h2>Your OTP Code</h2>

      <h1>${otp}</h1>

      <p>
        This OTP will expire in 5 minutes.
      </p>
    `

  });

};