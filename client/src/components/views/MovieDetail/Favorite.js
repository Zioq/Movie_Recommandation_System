import React,{useEffect,useState} from "react";
import axios from "axios";


function Favorite(props) {

    const movieId = props.movieId;
    const userFrom = props.userFrom;
    const movieTitle = props.movieInfo.title;
    const moviePost = props.movieInfo.backdrop_path;
    const movieRunTime = props.movieInfo.runtime;


    // Save data how many users clicked favorite
    const [FavoriteNumber, setFavoriteNumber] = useState(0);
    const [Favorited, setFavorited] = useState(false);

    // Get the data from MongoDB about how many ppl click the `like` using a Axios
    useEffect(()=> {


        // body composition which front-end wnat to post
        let body = {
            userFrom,
            movieId
        }

        // node server end-point(YOU CAN ASSIGN END-POINT WHAT YOU WANT)
        // request to server and get the response from the Server where connected with MongoDB
        // second parameter is the data composition what we want to send to Server
        axios.post('/api/favorite/favoriteNumber', body)
            .then(response=>{
                // If there are response, console response correspond to body
                console.log(response.data);
                if(response.data.success) {
                  setFavoriteNumber(response.data.favoriteNumber);
                } else {
                    alert('Failed to get favorite data from DB');
                }
            })


        // Another Axio post to check favorited or not
        axios.post('/api/favorite/favorited', body)
            .then(response=>{
               if(response.data.success) {
                  console.log("favorited", response.data);
                  setFavorited(response.data.favorited);
               } else {
                alert("Failed to get the response from server");
               }

            });


    },[]);


  return (
    <div>
      <button> { Favorited ? "Remove from My List": "Add to My List"} {FavoriteNumber}</button>
    </div>
  );
}

export default Favorite;
