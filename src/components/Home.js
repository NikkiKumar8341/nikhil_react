import React, { useState,useEffect } from 'react'
import MovieHome from './MovieHome';
import Filtered from './Filtered';

const Home = () => {

  const url =`https://api.themoviedb.org/3/movie/popular?api_key=4fe592a41ab3d02679639aa510ee521e&language=en-US&page=1`
const [popular, setPopular] = useState([]);
const [filtered, setFiltered] = useState([]);
const [activeGenre, setActiveGenre] = useState(0);
const[searchText,setSearchText]=useState('');
console.log(searchText,"text");
useEffect(() => {
    fetchPopular();
  }, []);
const fetchPopular = async () => {
    const data = await fetch(url);
    const movies = await data.json();
     console.log(movies);
    setPopular(movies.results);
    setFiltered(movies.results)
  };

  const filterBySearch = (event) => {
    // Access input value
    const query = event.target.value;
    // Create copy of item list
    var updatedList = [...filtered];
    // Include all elements which includes the search query
    updatedList = updatedList.filter((item) => {
      return item.toLowerCase().indexOf(query.toLowerCase()) !== -1;
    });
    // Trigger render with updated values
   setSearchText(updatedList)
  };
return (
    <div className="App">
      <h1>Movies</h1>
      <div className='container'>
      <div className="input-wrapper">
          {/* <input  type='text'
           placeholder='Search for Movie'
           value={searchText}
           onChange={filterBySearch}
          /> */}
        </div>

      </div>
      
      <Filtered popular={popular} setFiltered={setFiltered} activeGenre={activeGenre} setActiveGenre={setActiveGenre} />
      <div className="popular-movies">
        {filtered.map((movie) => {
          return <MovieHome movie={movie} key={movie.id}/>
        })}
      </div>
    </div>
  );
}

export default Home