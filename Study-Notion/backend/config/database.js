const mongoose = require("mongoose");
require("dotenv").config();

exports.connect = () => {
    const mongoUrl = process.env.MONGODB_URL || process.env.MONGODB_URI || "mongodb://localhost:27017/studynotion";
    
    mongoose.connect(mongoUrl, {
        useNewUrlParser: true,
        useUnifiedTopology:true,
    })
    .then(() => console.log("DB Connected Successfully"))
    .catch( (error) => {
        console.log("DB Connection Failed - Server will continue without database");
        console.error(error);
        // Don't exit the process, let the server run without DB for now
    } )
};