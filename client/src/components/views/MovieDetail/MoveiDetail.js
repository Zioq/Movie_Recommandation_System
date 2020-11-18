import React,{useEffect,useState} from 'react';
import { API_URL, API_KEY, IMAGE_BASE_URL } from "../../Config";
import { json } from 'body-parser';
import MainImage from "../LandingPage/MainImage";
import MovieInfo from "./MovieInfo";


function MoveiDetail(props) {

    // Get the :id parameter thorugh props.match.params
    let movieId = props.match.params.movieId;

    // Save the data
    const [Movie, setMovie] = useState([]);


    // Do when component rendered
    useEffect(()=> {

        //Check props of match 
        console.log(props.match);
        //console.log(movieId);

        //API end-point for Actors
        let endPointActor = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`;

        //API end-point for SingleMovieInfo
        let endPointInfo = `${API_URL}movie/${movieId}?api_key=${API_KEY}`;
        
        fetch(endPointInfo)
            .then(response =>response.json())
            .then(singleMovieData=> {
                console.log(singleMovieData);
                setMovie(singleMovieData);
            })
    })


    return (
        <div>
            {/* Header */}
            <MainImage 
                 image={`${IMAGE_BASE_URL}/w1280${Movie.backdrop_path}`}
                 title={Movie.original_title}
                 description={Movie.overview}
            />

            {/* Body */}
            <div style={{width: '85%', margin: '1rem auto'}}>

                {/* Movie Info */}
                <MovieInfo movie={Movie}/>

                <br />
                {/* Actros Grid */}

                <div style={{display:'flex', justifyContent:'center', margin: '2rem'}}>
                    <button> SHOW MORE</button>

                </div>
            </div>
            
        </div>
    )
}

export default MoveiDetail
