import React,{useEffect,useState} from 'react';
import "./favoriteListPage.css";
import axios from "axios";
import {Popover} from "antd";
import {IMAGE_BASE_URL} from "../../Config";

function FavoriteListPage() {


    const [FavoriteMovieList, setFavoriteMovieList] = useState([]);

    // get the Favorite list Data from MongoDB
    useEffect(() => {
        fetchFavoriteMovieList();
    }, []);


    const fetchFavoriteMovieList = () => {
        axios.post('/api/favorite/getFavoriteList', {userFrom: localStorage.getItem("userId")})
        .then(response=>{
            if(response.data.success) {
                console.log(response.data);
                setFavoriteMovieList(response.data.info);

            }else {
                alert("Failed to get the response data ");
            }
        });
    }

    // This time we need parameter which need to connect DB (userFrom, moiveId)
    const removeHandler = (movieId, userFrom) => {

        const body = {
            movieId: movieId,
            userFrom : userFrom,
        }

        axios.post('/api/favorite/removeFromList',body)
            .then(response=> {
                if(response.data.success) {
                    console.log(response.data);
                    fetchFavoriteMovieList();
                }else {
                    alert("Failed to get the response");
                }
            });
    };

    const renderTableBody = FavoriteMovieList.map((favorite,index)=> {

        const content = (

            <div>
                { favorite.moviePost ? 
                    <img src={`${IMAGE_BASE_URL}/w500${favorite.moviePost}`} />
                : "no poster"}
                
            </div>

        )


        return (
            <tr key={index}>
            
            <Popover content={content} title={favorite.movieTitle}>
            <td>{favorite.movieTitle}</td>
            </Popover>
            

            <td>{favorite.movieRunTime} mins</td>
            <td><button onClick={()=>removeHandler(favorite.movieId,favorite.userFrom)}>Remove</button></td>

      
        </tr>
        )
       
    })



    return (
        <div style={{width:"85%", margin: '3rem auto'}}>
            <h2>Your Favorite Movie List</h2>
            
            <hr />

            <table>
                <thead>
                    <tr>
                        <th>Movie Title</th>
                        <th>Movie Runtime</th>
                        <th>Romove from you list</th>
                    </tr>
                </thead>
                <tbody>
                    {renderTableBody}

                </tbody>

            </table>



        </div>
    )
}

export default FavoriteListPage
