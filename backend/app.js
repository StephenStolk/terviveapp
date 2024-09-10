const express = require('express');
const app = express();
const mongoose = require("mongoose");

const mongourl = "mongodb+srv://StephenStolk:lgK41NlCR9MDtLfw@cluster0.ymqn7a7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

mongoose.connect(mongourl).then(() => {
    console.log("connected");
})
app.get("/", (req,res) => {

})
require("./userSchema/UserDetails");
const User = mongoose.model("UserInfo")
app.post("/register",async(req,res) => {
    const {name,email,mobile,password} = req.body;

    const oldUser = await User.findOne({email: email});

    if(oldUser) {
        return res.send({data: "User already exixts"});
    }

    try{
        await User.create({
            name: name,
            email: email,
            mobile: mobile,
            password,
        });

        res.send({
            status: "ok",
            data: "User Created"
        })
    } catch(error) {

    }
})
//lgK41NlCR9MDtLfw

app.listen(5001, () => {
    console.log("node js server started")
})
