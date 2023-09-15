import React, { useEffect } from 'react'
import { useState } from 'react'
import ResultCard from './ResultCard';

const Add = () => {

  const [query,setQuery]=useState('');
  const [results,setResults]=useState([]);
  const [tvShow,setTvShow]=useState([])


  
  useEffect(()=>{
    const moviedebouncing=setTimeout(()=>{
      searchMovies();
    },1000)
  },[query])

  const searchMovies = async (e) => {

    const url = `https://api.themoviedb.org/3/search/movie?api_key=4fe592a41ab3d02679639aa510ee521e&language=en-US&query=${query}&page=1&include_adult=false`;

    const url1=`https://api.themoviedb.org/3/search/tv?api_key=4fe592a41ab3d02679639aa510ee521e&query=${query}&page=1&language=en-US`

    try {
    
        const movies = await fetch(url);
        const movieResponse  = await movies.json();

        const tvShow=await fetch(url1);
        const tvShowResponse=await tvShow.json();

        if(!movieResponse.error && !tvShowResponse.error){
          console.log(movieResponse.results);
          console.log(tvShowResponse.results);
          setResults([...movieResponse.results, ...tvShowResponse.results]);;
          
        }
        else{
          setResults([])
        }
       

    }catch(err){
        console.error(err);
    }
}
  return (
    <div className="add-page">
    <div className="container">
      <div className="add-content">
        <div className="input-wrapper">
          <input  type='text' placeholder='Search for Movies and TvShows'
          value={query}
          onChange={(e)=>{setQuery(e.target.value)}}
          />
        </div>
        {results.length >0 &&(
          <ul className='results'>
            {results.map((movie)=>(
              <div>
                <li key={movie.id}>
                <ResultCard key={movie.id}  movie={movie} /> 
              </li>
              </div>   
            ))}
          </ul>
        )}
        
      </div>
    </div>
  </div>
  )
}

export default Add
