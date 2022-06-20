import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import nodemailer from 'nodemailer';

import User from "../models/user.js";

const secret = 'test';

//mail sender details
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'nanditatestexpensetracker@gmail.com',
    pass: 'Password@123'
  },
  tls: {
    rejectUnauthorized: false
  }
});

//signing in the user
export const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email: email });

    //if user doesn't exist
    if (!existingUser) return res.status(404).json({ success: false, error: "User doesn't exist" });

    //if user has completed email verification
    if(!existingUser.isVerified) return res.status(404).json({ success: false, error: "User is not verified. Please check your email." });

    const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
    
    if (!isPasswordCorrect) return res.status(400).json({ success: false, error: "Invalid credentials" });

    //token
    const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, secret, { expiresIn: "1h" });

    res.status(200).json({ result: existingUser, token });
  } catch (err) {
    res.status(500).json({ success: false, error: "Something went wrong" });
  }
};

//signing up new user
export const signup = async (req, res) => {

  const { email, password, confirmPassword, firstName, lastName} = req.body;

  try {
      
    const existingUser = await User.findOne({ email });

    //if user already has an account
    if (existingUser) return res.status(400).json({  success: false, error: "User already exists" });

    if(password != confirmPassword) {
        return res.status(400).json({ success: false, error: "Passwords don't match" });

    }

    const hashedPassword = await bcrypt.hash(password, 12);
    //token
    const emailToken = jwt.sign( { email: email}, secret, { expiresIn: "1h" } );

    

    //send verification email to new user
    var mailOptions = {
      from: '"Verify your email" <nanditatest147@gmail.com>',
      to: email,
      subject: 'Welcome to ExpenseTracker | Verify your email',
      html: `<h2>Hi ${firstName}!</h2>
      <h4>Thank you for registering on our website. Please verify you email by clicking 
      <a href="http://${req.headers.host}/user/verifyemail?token=${emailToken}">here</a>.</h4>
      `
    }

    //send email
    transporter.sendMail(mailOptions, async function(error, info){
      if(error){
          return res.status(400).json({  success: false, error: "Unable to send email to this email address: " + email + ". Please enter correct email address or try another email address which can receive external emails." });
      }
      else {
          const result = await User.create({ email, password: hashedPassword, name: `${firstName} ${lastName}`, emailToken: emailToken, isVerified: false})
          
          return res.status(200).json({ result, emailToken });
      }
    })

  } catch (error) {
    res.status(500).json({ success: false, error: "Something went wrong" });
    
    console.log(error);
  }
};

//verfying the email address provided by the user
export const verifyemail = async (req, res) => {

  try {
    const emailToken = req.query.token;
    const newUser = await User.findOne({ emailToken: emailToken });
    if(newUser){
      //update fields
      newUser.emailToken = null,
      newUser.isVerified = true
      await newUser.save();
      //redirect to login page
      res.redirect(process.env.WEB_APP_AUTH);
    }
    else {
      return res.status(400).json({  success: false, error: "Something went wrong. Email is not verified" });
    }
  }
  catch(error){
    console.log(error);
  }
    

}