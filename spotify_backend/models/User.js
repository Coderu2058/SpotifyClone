const mongoose=require("mongoose");

const User=mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:false
    },
    email:{
        type:String,
        required:true
    },
    likedSongs:{
        type:String,
        default:""
    },
    likedPlaylists:{
        type:String,
        default:""
    },
    subscribedArtists:{
        type:String,
        default:""
    }
});

const UserModal=mongoose.model("User",User);
module.exports=UserModal;
