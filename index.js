const { PORT } = require('./config/config');
// const { SERVER_DB_URI } = require('./constants/constants');

const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const cors = require('cors')
const restaurantRouter = require('./routes/restaurant')
const authRouter = require('./routes/auth')
const paymentRouter = require('./routes/payment');

dotenv.config();

const app = express()

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to Swiggy-Clone Backend Server! :D");
}
);


app.use("/api/customer",authRouter)
app.use("/api/restaurant",restaurantRouter)
app.use('/api/razor',paymentRouter)


mongoose.connect(process.env.ATLAS_URI,{useNewUrlParser:true,useCreateIndex:true,useUnifiedTopology:true},()=>{
    console.log("The database is connected!")
})

app.listen(PORT,()=>{
    console.log(`Swiggy Backend running at PORT : ${PORT}`);
});

