const { user } = require("../models/userSchema");
const { signupJoi } = require("../validators/joiValidation");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.APP_PASSWORD,
  },
});

const generateToken = () => {
  return crypto.randomBytes(16).toString("hex");
};

const signUp = async (req, res) => {
  const { error, value } = signupJoi(req.body);
  if (error) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: error.message }),
    };
  }

  try {
    const userExist = await user.findOne({ email: value.email });

    if (userExist) {
      return {
        statusCode: 409,
        body: JSON.stringify({ message: "User already exists" }),
      };
    }

    const token = generateToken();

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hashPassword(value.password, salt);

    const newUser = new users({
      email: value.email,
      password: hashedPassword,
      confirmPassword: value.confirmPassword,
      confirmationToken: token,
    });

    await newUser.save();

    const confirmationLink = `http://16.171.26.115:3000/confirm-email?token=${token}`;

    const mailOptions = {
      from: process.env.EMAIL,
      to: value.email,
      subject: "Email Confirmation",
      text: `Click the following link to confirm your email: "${confirmationLink}">${confirmationLink}`,
    };

    await transporter.sendMail(mailOptions);

    return {
      statusCode: 201,
      body: JSON.stringify({
        message: "New User Created. Confirmation email sent.",
      }),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Internal Server Error" }),
    };
  }
};

module.exports = signUp;
