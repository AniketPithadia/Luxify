// emailService.js

const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  //   host: "smtp.gmail.com",
  //   port: 587,
  auth: {
    user: "your-email@gmail.com", // Replace with your email
    pass: "your-email-password", // Replace with your email password or app-specific password
  },
});

const sendEmail = async (data) => {
  const { currentUserEmail, landlordEmail, subject, text } = data;

  try {
    const mailOptions = {
      from: currentUserEmail,
      to: landlordEmail,
      subject: subject,
      text: text,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);
    return { success: true, message: "Email sent successfully" };
  } catch (error) {
    console.error("Error sending email:", error);
    return { success: false, message: "Failed to send email" };
  }
};

module.exports = { sendEmail };
