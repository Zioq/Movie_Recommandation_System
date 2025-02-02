import React from "react";

function MainImage(props) {
  return (
    <div
      style={{
        background: `linear-gradient(to bottom, rgba(0,0,0,0) 100%,rgba(0,0,0,0) 100%,rgba(0,0,0,0) 100%), 
        url('${props.image}'), #1c1c1c`,
        height: "500px",
        backgroundSize: "100%, cover",
        backgroundPosition: "center, center",
        width: "100%",
        position: "relative",
      }}
    >
      <div>
        <div
          style={{
            position: "absolute",
            maxWidth: "400px",
            bottom: "2rem",
            marginLeft: "2rem",
          }}
        >
          <h2 style={{ color: "white" }}> TITLE: {props.title} </h2>
          <p style={{ color: "white", fontSize: "1rem" }}>
            DESCRIPTION: {props.description}{" "}
          </p>
        </div>
      </div>
    </div>
  );
}

export default MainImage;
