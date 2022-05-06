require('dotenv').config();
module.exports = {
  allowedOrigins: ['http://localhost:1912/'],
  SERVER_PORT: 1912,
  SERVER_DB_URI: `mongodb+srv://admin:admin-swiggy@maincluster.a7yza.mongodb.net/SwiggyDb?retryWrites=true&w=majority`,
  JWT_SECRET: 'thisIsASimpleTest',
  OTP_LENGTH: 6,
  OTP_CONFIG: {
    upperCaseAlphabets: false,
    specialChars: false,
    lowerCaseAlphabets: false,
  },
  MAIL_SETTINGS: {
      host: "smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "34a56e69b392a2",
        pass: "56090a6ae534d4"
      }
  },
};
