const mongoose = require(`mongoose`);

const user = new mongoose.Schema({
  "username": { type: String, required: true },
  "email": { type:String ,required: true},
  "number": { type: Number, required: true },
  "password": { type: String, required: true },
  "lastActive": {type: Date, required: false},
  "active": {type: Boolean, required: false},
  "phoneOtp": {type: String},
});

module.exports = mongoose.model("user", user);
