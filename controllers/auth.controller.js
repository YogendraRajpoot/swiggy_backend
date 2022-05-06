const { encrypt, compare } = require('../services/crypto');
const { generateOTP } = require('../services/OTP');
const { sendMail } = require('../services/MAIL');
const user = require('../Models/user');

module.exports.signUpUser = async (req, res) => {
  const { username, number, email, password } = req.body;
  const isExisting = await findUserByEmail(email);
  if (isExisting) {
    return res.send('Already existing');
  }
  // create new user
  const newUser = await createUser(username, number, email, password);
  if (!newUser[0]) {
    return res.status(400).send({
      message: 'Unable to create new user',
    });
  }
  res.send(newUser);
};

module.exports.verifyEmail = async (req, res) => {
  const { email, otp } = req.body;
  const User = await validateUserSignUp(email, otp);
  res.send(User);
};

const findUserByEmail = async (email) => {
  const User = await user.findOne({
    email,
  });
  if (!User) {
    return false;
  }
  return User;
};

const createUser = async (username, number, email, password) => {
  const hashedPassword = await encrypt(password);
  const otpGenerated = generateOTP();
  try {
    await sendMail({
      to: email,
      OTP: otpGenerated,
    });
    const newUser = await user.create({
      username,
      email,
      number,
      password: hashedPassword,
      phoneOtp: otpGenerated,
    });
    if (!newUser) {
      return [false, 'Unable to sign up'];
    }
    return [true, newUser];
  } catch (error) {
    return [false, 'Unable to sign up, Please try again later', error];
  }  
};

const validateUserSignUp = async (email, otp) => {
  const user = await user.findOne({
    email,
  });
  if (!user) {
    return [false, 'User not found'];
  }
  if (user && user.otp !== otp) {
    return [false, 'Invalid OTP'];
  }
  const updatedUser = await user.findByIdAndUpdate(user._id, {
    $set: { active: true },
  });
  return [true, updatedUser];
};
