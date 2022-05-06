const nodemailer = require('nodemailer');
const { MAIL_SETTINGS } = require('../constants/constants');
const transporter = nodemailer.createTransport(MAIL_SETTINGS);

module.exports.sendMail = async (params) => {
  try {
    let info = await transporter.sendMail({
      from: MAIL_SETTINGS.auth.user,
      to: "shivansh.srivastava1912@gmail.com", // list of receivers
      subject: 'Swiggy-Clone App - Verify OTP', // Subject line
      html: `
      <div
        class="container"
        style="max-width: 90%; margin: auto; padding-top: 20px"
      >
        <h2>swiggy Clone App</h2>
        <h4>Thanks for joining our family &hearts;</h4>
        <p style="margin-bottom: 30px;">Pleas enter the sign up OTP to get started</p>
        <h1 style="font-size: 40px; letter-spacing: 2px; text-align:center; color: #fc8019;">${params.OTP}</h1>
        <p style="margin-top:50px;">If you do not request for verification please do not respond to the mail.</p>
      </div>
    `,
    });
    return info;
  } catch (error) {
    console.log(error);
    return false;
  }
};
