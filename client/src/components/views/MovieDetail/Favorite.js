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

      // body composition which front-end wnat to post
      let body = {
        userFrom: userFrom,
        movieId: movieId,
        //Add more composition to save DB 
        movieTitle: movieTitle,
        moviePost: moviePost,
        movieRunTime: movieRunTime

    }

 
    // Get the data from MongoDB about how many ppl click the `like` using a Axios
    useEffect(()=> {

        // node server end-point(YOU CAN ASSIGN END-POINT WHAT YOU WANT)
        // request to server and get the response from the Server where connected with MongoDB
        // second parameter is the data composition what we want to send to Server
        axios.post('/api/favorite/favoriteNumber', body)
            .then(response=>{
                // If there are response, console reponse correspond to body
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

    const addListHandler = () => {
      // Validation to check `favoirted` or not
      if(Favorited) {
        axios.post('/api/favorite/removeFromList',body)
          .then(response=> {
            if(response.data.success) {
              setFavoriteNumber(FavoriteNumber -1)
              setFavorited(!Favorited)
            } else {
              alert("Failed to remove from list");
            }
          })
      } else {
        axios.post('/api/favorite/addToFavoriteList',body)
        .then(response=> {
          if(response.data.success) {
              setFavoriteNumber(FavoriteNumber +1) 
              setFavorited(!Favorited)
          } else {
            alert("Failed to add to list");
          }
        })
      }
    }



  return (
    <div>
      <button onClick={addListHandler}> { Favorited ? "Remove from My List": "Add to My List"} {FavoriteNumber}</button>
    </div>
  );
}

export default Favorite;
