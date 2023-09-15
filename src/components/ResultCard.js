import React, { useContext, useState } from "react";
import Moment from "react-moment";
import { GlobalContext } from "../context/GlobalState";
import { Link, useNavigate } from 'react-router-dom';


export const ResultCard = ({ movie }) => {
  const {
    addMovieToWatchlist,
    addMovieToWatched,
    watchlist,
    watched,
  } = useContext(GlobalContext);

  let storedMovie = watchlist.find((o) => o.id === movie.id);
  let storedMovieWatched = watched.find((o) => o.id === movie.id);

  const watchlistDisabled = storedMovie
    ? true
    : storedMovieWatched
    ? true
    : false;

  const watchedDisabled = storedMovieWatched ? true : false;

  return (
    <div className="result-card">
       <Link  to={`/details/${movie.release_date ? 'movie' : (movie.first_air_date ? 'tv':'')}/${movie.id}`} >
      <div className="poster-wrapper">
        {movie.poster_path ? (
          <img
            src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
            alt={`${movie.title} Poster`}
          />
        ) : (
          <div className="filler-poster" />
        )}
      </div>
      </Link>

      <div className="info">
        <div className="header">
          <h3 className="title">{movie.title ? movie.title :movie.name}</h3>
          <h4 className="release-date">
            {movie.release_date ? (movie.release_date) : (movie.first_air_date ? movie.first_air_date:"coming Soon")}
          </h4>
        </div>

        <div className="controls">
          <button
            className="btn btn-info"
            disabled={watchlistDisabled}
            onClick={() => addMovieToWatchlist(movie)}
          >
            Add to Watchlist
          </button>

          <button
            className="btn btn-primary"
            disabled={watchedDisabled}
            onClick={() => addMovieToWatched(movie)}
          >
            Add to Watched
          </button>
        </div>
      </div>
    </div>
  );
};


export default ResultCard;