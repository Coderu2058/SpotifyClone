const express=require("express");
const router=express.Router();
const passport=require("passport");
const Playlist=require("../models/Playlist")
const User=require("../models/User")

router.post("/create",passport.authenticate("jwt",{session:false}),async (req,res)=>{
    //req.user gets user from passport
    const currentUser=req.user;
    const {name,thumbnail,songs}=req.body;

     if(!name || !thumbnail || !songs){
        return res
                  .status(301)
                  .json({err:"Insufficient details to create playlist!!"})
     }

     const playlistData={
        name,
        thumbnail,
        songs,
        owner:currentUser._id,
        collaborators:[]
    };
     const playlist=await Playlist.create(playlistData);
     return res.status(200).json(playlist);
});

router.get("/get/:playlistId",passport.authenticate("jwt",{session:false}),async (req,res)=>{
    //get playlist based on id
     const playlistId=req.params.playlistId;

     const playlist=await Playlist.findOne({_id:playlistId});
     if(!playlist)
     {
        return res.status(301).json({err:"Invalid PlaylistID"});
     }
     
     return res.status(200).json(playlist);
})

router.get("/get/artist:artistId",passport.authenticate("jwt",{session:false}),async (req,res)=>{
    const artistId=req.params.playlistId;

    const artist=User.findOne({_id:artistId})
    if(!artist)
    {
      return res.status(304).json({err:"invalid artistId"});
    }

    const playlists=await Playlist.find({owner:artistId});
    return res.status(200).json({data:playlists});
})


router.post("/add/song",passport.authenticate("jwt",{session:false}),async (req,res)=>{
   const currentUser=req.user;
   const {playlistId,songId}=req.body;

   const playlist=await Playlist.findOne({_id:playlistId});
   if(!playlist){
      return res.status(304).json({err:"Playlist does not exist!!"});
   }

   if(playlist.owner!=currentUser._id || 
      !playlist.collaborators.includes(currentUser._id))
   {
      return res.status(400).json({err:"Npt allowed!!"})
   }
 
    const song=Song.findOne({_id:songId});
    if(!song){
      return res.status(304).json({err:"Song does not exist!!"});
   }

   playlist.songs.push(song);
   await playlist.save();
   return res.status(200).json(playlist);
})

module.exports=router;
