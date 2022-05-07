const express = require('express');
const {loginValidation,registerationValidation} = require('../validation')
const userModel = require('../Models/user')
const tokenModel = require('../Models/token');
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const dotenv = require('dotenv')
const JWTService = require('../services/JWT');
let userOtp = 0;

dotenv.config();
const client = require('twilio')(accountSid, authToken);

const router = express.Router();

function randomOtp(){
    let otp =""
    for(var i=0;i<6;i++){
     otp+=Math.floor(Math.random()*9)
    }
    return Number(otp)
  }

router.post('/register',async(req,res)=>{
    const {error} = registerationValidation(req.body)
    console.log(typeof(req.body.number));
    if(error){
        return res.status(400).send(error.details[0].message)
    }

    const phoneNumberExists = await user.find({"number":req.body.number});
    if(phoneNumberExists){
        return res.status(400).send("Phone number already exists")
    }

    const emailExists = await user.find({"email":req.body.email});
    if(emailExists){
        return res.status(400).send("Email already exists in the Database")
    }
    
    try{
        userOtp = randomOtp()
        client.messages
        .create({
            body: `OTP for Swiggy registration is ${userOtp}`,
            from: '+19793887530',
            to: `+91${req.body.number}`
        })
        .then(message => console.log(message.sid));
        res.status(200).send(`OTP sent successfully : OTP is - ${userOtp}`)
    } catch(err){
        res.status(400).send(err)
    }
})

router.post('/register/verify',async(req,res)=>{
    try {
        if(userOtp==Number(req.body.otp)){
            // const user = new user({
            //     username:req.body.username,
            //     email:req.body.email,
            //     password:req.body.password,
            //     number :req.body.number
            // })
            const userDetails = req.body;
            console.log(Number(req.body.otp), userDetails);
                const savedCustomer = await userModel.insertMany([userDetails]);
                //Generate JWT token and send back to frontend
                let JWTtoken = JWTService.generateToken(userDetails);
                //Insert token in DB
                // console.log(savedCustomer[0]._id, JWTtoken);
                let tokenResp = await tokenModel.insertMany([{ userId: savedCustomer[0]._id, token: JWTtoken }]);
                
                console.log(savedCustomer);
                res.json({
                    status: 'success',
                    token: JWTtoken,
                    savedCustomer
                })
        }
        else{
            res.status(400).send("Invalid OTP")
        }
      } catch (error) {
        res.status(400).send("Couldn't complete request");
      } 

})

router.post('/login',async(req,res)=>{
    const {error} = loginValidation(req.body)
    if(error){
        return res.status(400).send(error.details[0].message)
    }

    const phoneNumberExists = await userModel.findOne({ number:req.body.number });
    if(!phoneNumberExists){
        return res.status(400).send("Phone number does not exists..Sign up")
    }

    try{
        userOtp = randomOtp()
        client.messages
        .create({
            body: `OTP for Sweggy registration is ${userOtp}`,
            from: '+19793887530',
            to: `+91${req.body.number}`
        })
        .then(message => console.log(message.sid));
        res.status(200).send(`OTP sent successfully : OTP is - ${userOtp}`)
    } catch(err){
        res.status(400).send(err)
    }
})

router.post('/login/verify',async(req,res)=>{
    
    if(userOtp==Number(req.body.otp)){
        const userDetail = await userModel.findOne({ number :req.body.number});
        let userData = {
            "username": userDetail.username,
            "email": userDetail.email,
            "password": userDetail.password,
            "number": req.body.number
        }
        //Generate JWT token and send back to frontend
        let JWTtoken = JWTService.generateToken(userData);
        //Insert token in DB
        await tokenModel.insertMany([{ userId: userDetail._id, token: JWTtoken }]);
        
        res.status(200).json({
            status: 'success',
            token: JWTtoken,
            userDetail
        })
        // res.status(200).send(userData)
    }
    else{
        res.status(400).send("Invalid OTP")
    }
})

// for logging out the account
async function signOut(req, res, next) {
    //remove token from DB
    const token = req.body.token;
    await tokenModel.deleteOne({ token });
    res.status(200).json({ status: "Success", message: "Token deleted successfully! User logged out!" });
}

router.patch('/order/:cust_id',async(req,res)=>{
    const id = req.params.cust_id

    const orders = {
        restaurant_id : req.body.restaurant_id,
        restaurant_name : req.body.restaurant_name,
        location : {type:"Point",coordinates:req.body.location},
        address_1 : req.body.address_1,
        address_2 : req.body.address_2,
        image_url : req.body.img_url,
        items : req.body.items
    }
    try{

        const customer = await user.findById(id);
        customer.orders.push(orders);
        customer.markModified('orders')
        await customer.save()
    } catch(err){
        console.log(err)
        return res.status(400).send(err)
    }

    res.status(200).send("OK")

})

router.get('/order/:cust_id',async(req,res)=>{
    const id = req.params.cust_id

    try{
        const customer = await user.findById(id)
        if(customer){
            return res.status(200).send(customer)
        }
        res.status(400).send("No Data found")
    } catch(err){
        res.status(400).send(err)
    }
})

module.exports = { 
    router,
    signOut
};