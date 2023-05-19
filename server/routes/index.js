const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();
const fs = require('fs');
require('dotenv').config();


router.get('/', (req, res) => {
  res.send('Hello from server!');
});

router.post('/contact', (req, res) => {
  const { type, services, company, details, inquiry, feedback, firstName, lastName, email, phone } = req.body;
  console.log(process.env.EMAIL_USER, process.env.EMAIL_PASS);

  const transporter = nodemailer.createTransport({
    service: 'gmail',  // replace with your email provider
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  // Organize email content based on the type of inquiry
  let text = `Name: ${firstName} ${lastName}\nEmail: ${email}\nPhone: ${phone}\n`;

  if (type === 'services') {
    text += `Inquiry Type: Services\n`;
    if(services) {
      text += `Interested Services: ${services.join(", ")}\n`;
    }
    text += `Company: ${company}\nDetails: ${details}`;
  } else if (type === 'general') {
    text += `Inquiry Type: General Inquiry\nCompany: ${company}\nInquiry: ${inquiry}`;
  } else if (type === 'feedback') {
    text += `Inquiry Type: Feedback\nFeedback: ${feedback}`;
  }
  

  const mailOptions = {
    from: email,
    to: 'rustyvolts@gmail.com',  // replace with your email
    subject: 'New contact form submission',
    text
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).json({ message: 'Error sending email' });
    } else {
      console.log('Email sent: ' + info.response);
      res.status(200).json({ message: 'Email sent successfully' });
    }
  });
});


router.get('/teams', (req, res) => {
  fs.readFile('teams.json', 'utf8', (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error reading team data');
    } else {
      res.send(JSON.parse(data));
    }
  });
});

router.get('/faq', (req, res) => {
  fs.readFile('faq.json', 'utf8', (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error reading FAQ data');
    } else {
      res.send(JSON.parse(data));
    }
  });
});

router.get('/services', (req, res) => {
  fs.readFile('services.json', 'utf8', (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error reading services data');
    } else {
      res.send(JSON.parse(data));
    }
  });
});

router.get('/reviews', (req, res) => {
  fs.readFile('reviews.json', 'utf8', (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error reading reviews data');
    } else {
      res.send(JSON.parse(data));
    }
  });
});



module.exports = router;
