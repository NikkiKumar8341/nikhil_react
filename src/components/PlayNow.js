import React from 'react'
import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';

const PlayNow = () => {

    const [play,setPlay]=useState([]);

    

    const options = {
        method: 'GET',
        url: 'https://api.themoviedb.org/3/movie/now_playing',
        params: {language: 'en-US', page: '1'},
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0ZmU1OTJhNDFhYjNkMDI2Nzk2MzlhYTUxMGVlNTIxZSIsInN1YiI6IjYyMGY5MzcyMWYwMjc1MDA0Mjc0MzU3MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.FnPZVbrySmmb3kZsevQ6s1LyLOPavHtdxsoIx6cSEa8'
        }
      };


      const fetchMovie=()=>{
        axios
        .request(options)
        .then(function (response) {
          console.log(response.data);
          setPlay(response.data);
        })
        .catch(function (error) {
          console.error(error);
          setPlay(error);
        });
      }

      useEffect=(()=>{
        fetchMovie();
      })
      
      

  return (
    <h1>
        {play}
    </h1>
  )
}

export default PlayNow