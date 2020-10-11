require('dotenv').config()
// importing packages
const express = require("express");
const bodyParser = require("body-parser");
const mongodb = require("mongodb")
const cors = require("cors")

// defining variables
const app = express();
const PORT = process.env.PORT || 3000;
const mongoClient = mongodb.MongoClient;
const url = process.env.MongoUrl;

app.use(bodyParser.json())
app.use(cors({
    origin:"*"
}))

app.get("/",function(req,res){
    res.write("<h1>You are at Root of API <br> Endpoints are -----> POST /user <h1>")
    res.end()
})

app.post("/user",async function(req,res){
    let client;
    try{
        client = await mongoClient.connect(url)
        let db = client.db("userdetails")
        let {name,email,country,state,city,address1,address2,gender,maritalstatus,favfood,favcolour} = req.body
        let insertedUser = await db.collection("users").insertOne({
            name,email,country,state,city,address1,address2,gender,maritalstatus,favfood,favcolour
        })
        client.close()
        res.json({
            message:"User Created"
        })
        res.end()
    }catch(error){
        client.close()
        console.log(error)
    }
})




app.listen(PORT,()=>{
    console.log("Server is running")
})