import React,{useEffect} from 'react'

const Filtered = ({popular, setFiltered, activeGenre, setActiveGenre}) => {

    useEffect(() => {
        if (activeGenre === 0) {
          setFiltered(popular); //Checks- don't do anything, just return all
          return;
        }
        const filtered = popular.filter((movie) =>
          movie.genre_ids.includes(activeGenre),
        );
        setFiltered(filtered);
      }, [activeGenre]);
  return (
    <header style={{backgroundColor:'white'}}>
    <div className="container">
    <div className="inner-content">
      <button  className="btn btn-primary" onClick={() => setActiveGenre(0)}>All</button>
      <button  className="btn  btn-primary"onClick={() => setActiveGenre(35)}>Comedy</button>
      <button className="btn  btn-primary" onClick={() => setActiveGenre(28)}>Action</button>
      </div>
    </div>
    </header>
  )
}

export default Filtered