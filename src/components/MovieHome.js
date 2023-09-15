import React from "react";
import { Link } from "react-router-dom";

const MovieHome = ({ movie }) => {
  return (
    <div className="popular-movies" style={{marginTop:'50px',marginLeft:'20px'}}>
        <Link  to={`/details/${movie.release_date ? 'movie' : (movie.first_air_date ? 'tv':'') ? 'movie':''}/${movie.id}`}  state={{movie}}> 
      <div classNameName="poster-wrapper">
        {movie.poster_path ? (
          <img
            src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
            alt={`${movie.title} Poster`}
          />
        ) : (
          <div classNameName="filler-poster" />
        )}
      </div>
      </Link>

      <div classNameName="info">
        <div classNameName="header">
          <h3 classNameName="title">{movie.title}</h3>
          <h4 classNameName="release-date">
            {movie.release_date ? movie.release_date : "coming soon"}
          </h4>
            <h3><i className="fas fa-star"></i><span> {movie.vote_average } /10</span></h3>
        </div>
      </div>
    </div>
   

    
  );
};

export default MovieHome;
