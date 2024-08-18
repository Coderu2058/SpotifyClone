const mongoose=require("mongoose");

const Song=mongoose.Schema({
    
    name:{
        type:String,
        required:true
    },
    thumbnail:{
        type:String,
        required:true
    },
    track:{
        type:String,
        required:true
    },
    artist:{
        type:mongoose.Types.ObjectId,
        ref:"User"
    }
});

const SongModal=mongoose.model("Song",Song);
module.exports=SongModal;
