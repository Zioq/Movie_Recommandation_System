import React,{useEffect} from "react";
import axios from "axios";


function Favorite(props) {

    const movieId = props.movieId;
    const userFrom = props.userFrom;
    const movieTitle = props.movieInfo.title;
    const moviePost = props.movieInfo.backdrop_path;
    const movieRunTime = props.movieInfo.runtime;


    // Get the data from MongoDB about how many ppl click the `like` using a Axios
    useEffect(()=> {


        // body composition which front-end wnat to get 
        let body = {
            userFrom : userFrom,
            movieId: movieId
        }


        // node server end-point(YOU CAN ASSIGN END-POINT WHAT YOU WANT)
        // request to server and get the response from the DB
        // second parameter is the data composition what we want to get from DB
        axios.post('/api/favorite/favoriteNumber', body)
            .then(response=>{
                console.log(response.data);
                if(response.data.success) {
                } else {
                    alert('Failed to get favorite data from DB');
                }
            })


    },[]);


  return (
    <div>
      <button>Add to my favorite</button>
    </div>
  );
}

export default Favorite;
