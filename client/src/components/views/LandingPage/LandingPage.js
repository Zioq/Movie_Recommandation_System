import React, { useEffect, setState, useState } from "react";
import { FaCode } from "react-icons/fa";
import { API_URL, API_KEY, IMAGE_BASE_URL } from "../../Config";
import MainImage from "./MainImage";
import Grid from "./Grid";
import { Row } from "antd";

function LandingPage() {
  // Save the data
  const [Movies, SetMovies] = useState([]);
  // Save main Movie Image
  const [MainMovieimg, setMainMovieimg] = useState(null);
  // Save the page
  const [CurrentPage,setCurrentPage] = useState(0);


  //Get the Movie-Data from API
  useEffect(() => {

    const movieurl = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;

    fecthMovies(movieurl);

  }, []);

  // Function for Fetch Moives
  const fecthMovies = (movieurl) => {
    //fecth the movie api
    fetch(movieurl)
      .then((response) => response.json())
      .then((movieData) => {
        console.log(movieData);
        SetMovies([...Movies,...movieData.results]);
        setMainMovieimg(movieData.results[0]);
        setCurrentPage(movieData.page);
      });
  }

  // Function to get the seconde page of movies list
  const loadMoreHandler = (e) => {
    e.preventDefault();
    const movieurl = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${CurrentPage + 1}`;
    fecthMovies(movieurl);
  };

  return (
    <div style={{ width: "100%", margin: "0" }}>
      {/**To Avoid get the error result from rendering MainImage first*/}
      {MainMovieimg && (
        <MainImage
          image={`${IMAGE_BASE_URL}/w1280${MainMovieimg.backdrop_path}`}
          title={MainMovieimg.original_title}
          description={MainMovieimg.overview}
        />
      )}

      <div style={{ width: "85%", margin: "1rem auto" }}>
        <h2>CHECK WHAT YOU WANT TO SEE :) </h2>
        <hr />
        
        <Row gutter={[10,10]}>
            {Movies && Movies.map((movie,index)=> (
                <React.Fragment>
                    <Grid 
                        img={movie.poster_path? `${IMAGE_BASE_URL}/w400${movie.poster_path}`: null}
                        movieId={movie.id}
                        movieName={movie.original_title}
                    />
                </React.Fragment>
            ))}
        </Row>


      </div>

      <div style={{ display: "flex", justifyContent: "center" }}>
        <button onClick={loadMoreHandler}> SHOW MORE</button>
      </div>
    </div>
  );
}

export default LandingPage;
