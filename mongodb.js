const mongoose = require(`mongoose`);
require('dotenv').config()
class mongo {
  constructor() {
    this.createMongoConnection();
  }
  createMongoConnection() {
    // mongoose.connect(`mongodb://localhost:27017/swiggy`);


    mongoose.connect(process.env.Mongo_url);
    mongoose.connection.once(`open`, () => {
      console.log(`MongoDB is connected`);
    });
    mongoose.connection.on(`error`, () => {
      console.log(`Error occured in mongoDB connection`);
    });
  }
}
module.exports = mongo;
