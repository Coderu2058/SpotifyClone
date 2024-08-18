const express=require('express');
const mongoose=require('mongoose');
const passport=require('passport');
let JwtStrategy = require('passport-jwt').Strategy;
let ExtractJwt = require('passport-jwt').ExtractJwt;
require("dotenv").config();
const User=require('./models/User');
const port=8000;
const app=express();
app.use(express.json());
const authRoutes=require("./routes/auth");
const songRoutes=require("./routes/song")
const playlistRoutes=require("./routes/playlist")

const url="mongodb+srv://"+process.env.MONGO_USER+":"+process.env.MONGO_PASSWORD+"@cluster0.ykeag28.mongodb.net/?retryWrites=true&w=majority";

//connect MONGOOSE
mongoose.connect(
    url,
   {
    useNewUrlParser:true,
    useUnifiedTopology:true
   }
)
.then((x)=>{
    console.log("Connected to MONGO!!");
})
.catch((err)=>{
    console.log("Error in connecting to MONGO!! "+err);
});

//setup Passport-jwt
let opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.SECRET_KEY;

passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    User.findOne({id: jwt_payload.sub}, function(err, user) {
        if (err) {
            return done(err, false);
        }
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
            // or you could create a new account
        }
    });
}));


//API: GET type 
app.get("/",(req,res)=>{
    res.send("Hello World!!")
})

app.use("/auth",authRoutes);
app.use("/song",songRoutes);
app.use("/playlist",playlistRoutes);

app.listen(port,()=>{
    console.log("App is running on port "+port);
});