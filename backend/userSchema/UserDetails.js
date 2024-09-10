const mongoose = require('mongoose');
const UserDetails = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true
    },
    mobile: {
        type: String,
    },
    password: {
        type: String,
        required: true
    },
}, {
    collection: "UserInfo"
});

mongoose.model("UserInfo", UserDetails)