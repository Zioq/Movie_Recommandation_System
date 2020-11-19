const express = require('express');
const router = express.Router();
const {Favorite} = require("../models/Favorite");

//=================================
//             Favorite
//=================================

//use post url address same like axio used in front-end
router.post('/favoriteNumber',(req,res)=> {
    // To get the movieID use req.body what front-end post
    //const movieId = req.body.movieId;

    //Get the Favorite number of Movie From MongoDB and use `find`method to access Favorite Schema with movieId
    Favorite.find( {"movieId":req.body.movieId} )
    //query
    .exec((err,info)=> {
        if(err) {
            return res.status(400).send(err) // send error to client(front-end)
        } else {
            //After that send response(movie favorite number) to front-end
            res.status(200).json({ // send info with json format
                success:true,
                // only send length of data 
                favoriteNumber: info.length
            })
        }
    })


    
})


module.exports = router;
