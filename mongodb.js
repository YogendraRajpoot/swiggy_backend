const mongoose = require(`mongoose`);
const Mongo_url = process.env.Mongo_url;
class mongo {
  constructor() {
    this.createMongoConnection();
  }
  createMongoConnection() {
    // mongoose.connect(`mongodb://localhost:27017/swiggy`);
    mongoose.connect(Mongo_url);
    mongoose.connection.once(`open`, () => {
      console.log(`MongoDB is connected`);
    });
    mongoose.connection.on(`error`, () => {
      console.log(`Error occured in mongoDB connection`);
    });
  }
}
module.exports = mongo;
