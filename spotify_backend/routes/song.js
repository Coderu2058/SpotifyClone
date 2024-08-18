const express=require("express");
const router=express.Router();
const passport=require("passport");
const Song=require("../models/Song")
const User=require("../models/User")

router.post("/create",passport.authenticate("jwt",{session:false}),async (req,res)=>{

    //req.user gets user from passport

     const {name,thumbnail,track}=req.body;

     if(!name || !thumbnail || !track){
        return res
                  .status(301)
                  .json({err:"Insufficient details to create song!!"})
     }

     const artist=req.user._id;

     const songData={name,thumbnail,track,artist};
     const createdSong=await Song.create(songData);
     return res.status(200).json(createdSong);
});

router.get("/get/mysongs",passport.authenticate("jwt",{session:false}),async (req,res)=>{

     //get songs when artist_id == currentUser_id
     const songs=await Song.find({artist:req.user._id});
     return res.status(200).json(songs);
});

router.get("/get/artist/:artistId",passport.authenticate("jwt",{session:false}),async (req,res)=>{
     const artistId=req.params;

     const artist =User.find({_id:artistId});
     if(!artist){
          return res.status(301).json({err:"Artist does not exist!!"});
     }
     const songs=await Song.find({artist:artistId});
     return res.status(200).json({data:songs});
});

router.get("/get/songname/:songName",passport.authenticate("jwt",{session:false}),async (req,res)=>{
     const {songName}=req.params;

     //case sensitive currently- pattern matching can be done
     const songs=await Song.find({name:songName});
     return res.status(200).json({data:songs});
});
module.exports=router;
