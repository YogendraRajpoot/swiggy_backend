const mongoose = require(`mongoose`);
class mongo {
  constructor() {
    this.createMongoConnection();
  }
  createMongoConnection() {
    // mongoose.connect(`mongodb://localhost:27017/swiggy`);
    mongoose.connect(`mongodb+srv://swiggy:HaljxyagASK0rcCy@cluster0.xszpp.mongodb.net/swiggy?retryWrites=true&w=majority`);
    mongoose.connection.once(`open`, () => {
      console.log(`MongoDB is connected`);
    });
    mongoose.connection.on(`error`, () => {
      console.log(`Error occured in mongoDB connection`);
    });
  }
}
module.exports = mongo;
