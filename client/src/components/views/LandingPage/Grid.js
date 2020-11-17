import React from 'react';
import {Row, Col} from 'antd';

// Grid section for loading movie img
function Grid(props) {
    return (
        <Col lg={6} md={8} xs={24}>
        <div style={{position: 'relative'}}>
            <a href={`/movie/${props.movieId}`}>
            <img style={{width:'100%', height:'300px'}} src={props.img} alt={props.movieName}/>
            </a>
        </div>
        </Col>
    )

};

export default Grid
