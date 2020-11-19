import React, { useEffect, useState } from "react";
import { API_URL, API_KEY, IMAGE_BASE_URL } from "../../Config";
import { json } from "body-parser";
import MainImage from "../LandingPage/MainImage";
import MovieInfo from "./MovieInfo";
import Grid from "../LandingPage/Grid";
import { Row } from "antd";
import Favorite from "./Favorite";

function MoveiDetail(props) {
  // Get the :id parameter thorugh props.match.params
  let movieId = props.match.params.movieId;

  // Save the data
  const [Movie, setMovie] = useState([]);
  const [Actors, setActors] = useState([]);
  const [Toggle, setToggle] = useState(false);

  // Do when component rendered
  useEffect(() => {
    //Check props of match
    console.log(props.match);
    //console.log(movieId);

    //API end-point for Actors
    let endPointActor = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`;

    //API end-point for SingleMovieInfo
    let endPointInfo = `${API_URL}movie/${movieId}?api_key=${API_KEY}`;

    fetch(endPointInfo)
      .then((response) => response.json())
      .then((singleMovieData) => {
        //console.log(singleMovieData);
        setMovie(singleMovieData);
      });

    //fecth movie actor API
    fetch(endPointActor)
      .then((response) => response.json())
      .then((movieActorData) => {
        console.log(movieActorData);
        setActors(movieActorData.cast);
      });
  }, []);


  const changeToggle = () => {
    setToggle(!Toggle);
  } 

  return (
    <div>
      {/* Header */}
      <MainImage
        image={`${IMAGE_BASE_URL}/w1280${Movie.backdrop_path}`}
        title={Movie.original_title}
        description={Movie.overview}
      />

      {/* Body */}
      <div style={{ width: "85%", margin: "1rem auto" }}>

        <div style={{display:'flex', justifyContent:'flex-end'}}>
            <Favorite movieInfo={Movie} movieId ={movieId} userFrom={localStorage.getItem("userId")}/>
        </div>


        {/* Movie Info */}
        <MovieInfo movie={Movie} />

        <br />

        <div
          style={{ display: "flex", justifyContent: "center", margin: "2rem" }}
        >
          <button onClick={changeToggle}> VIEW ALL ACTORS</button>
        </div>


        {/* Actros Grid */}
        {Toggle &&  
                    <Row gutter={[10, 10]}>
                        {Actors &&
                        Actors.map((actor, index) => (
                            <React.Fragment>
                            <Grid
                                img={
                                actor.profile_path
                                    ? `${IMAGE_BASE_URL}/w400${actor.profile_path}`
                                    : null
                                }
                                actorName={actor.name}
                            />
                            </React.Fragment>
                        ))}
                    </Row>
        }
                    

        
      </div>
    </div>
  );
}

export default MoveiDetail;
