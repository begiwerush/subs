require("dotenv").config({path: ".env"});
const express = require("express");
const path = require("path");
const mongoose = require('mongoose');
const cors = require("cors");

// init express app
const app = express();


// middlewares
app.set("trust proxy", true);
app.use(express.json());

app.use(cors({
    origin: ["http://localhost:3000", "http://localhost:3001", "*"],
    credentials: true
}));



// connect to database
mongoose.connect(process.env.MONGO_URI, { useUnifiedTopology: true, useNewUrlParser: true },(err) => {
    if(err) throw err;
    console.log("db connected!")
})


// routes
app.use("/subscribtion", require(path.join(__dirname, "routes","subscribtion")));




// run server
const PORT = process.env.PORT || 5000;




app.listen(PORT, () => console.log('Example app is listening on port ' + PORT));
