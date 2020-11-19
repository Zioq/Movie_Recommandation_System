const express = require('express');
const router = express.Router();
const {Favorite} = require("../models/Favorite");

//=================================
//             Favorite
//=================================

//use post url address same like axio used in front-end
router.post('/favoriteNumber',(req,res)=> {
    // To get the movieID use req.body what front-end post
    const movieId = req.body.movieId;

    //Get the Favorite number of Movie From MongoDB and use `find`method to access Favorite Schema with movieId
    Favorite.find( {"movieId":movieId} )
    //query
    .exec((err,info)=> {
        if(err) {
            return res.status(400).send(err) // send error to client(front-end)
        } else {
            //After that send response(movie favorite number) to front-end
            console.log(req.body);
            res.status(200).json({ // send info with json format
                success:true,
                // only send length of data 
                favoriteNumber: info.length
            })
        }
    })
})

// Another post response for checking favorited or not
router.post('/favorited', (req,res) =>{
    const movieId = req.body.movieId;
    const userFrom = req.body.userFrom;
    
    // Get the Data which User clicked favorited or not from MongoDB
    Favorite.find( {"movieId": movieId, "userFrom": userFrom} )
     .exec((err,info)=>{
        if(err) {
            return res.status(400).send(err);
        } else {

            // flag to check add to `favorited list` or not. If user didn't click favorited, the result will be empty array(info length will be 0) 
            let result = false; // User didn't add to favorited list yet (defualt)
            if(info.length !== 0) {
                result = true;
            }

            res.status(200).json({
                success: true,
                favorited: result
            })
        }
     })

});

module.exports = router;
