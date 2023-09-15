import React, { useEffect, useState } from "react";
import { Link, json, useLocation, useParams } from "react-router-dom";
import "../css/MovieDetails.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import ReactPlayer from "react-player";
import useCastCrew from "../utils/useCastCrew";
import CastModal from "./CastModal";

const TvshowDetails = () => {

  const {tvShowId}=useParams();
  const url = `https://api.themoviedb.org/3/tv/${tvShowId}?api_key=4fe592a41ab3d02679639aa510ee521e&append_to_response=videos`;

  const cast_crew=useCastCrew(tvShowId);

  console.log(cast_crew,"cast");

  let crew_division=cast_crew?.crew?.reduce((acc,currentItem)=>{
    acc[currentItem.known_for_department]=acc[currentItem.known_for_department]||[];
    acc[currentItem.known_for_department].push(currentItem)
    return acc ;
  },{});

  console.log(crew_division,"crew_");


  const[singleMovie,setSingleMovie]=useState([]);
  const[trailer,SetTrailer]=useState([]);
  const [modal, setModal] = useState(false);
  const [castModal, setCastModal] = useState(false);

  const modalCLose = () => setModal(false);
  const modalShow = () => setModal(true);

  const castModalCLose = () => setCastModal(false);
  const castModalShow = () => setCastModal(true);

  useEffect(() => {
    videos();
  }, []);

  const videos = async () => {
	try{
   
	 const data = await fetch(url);
    const movies = await data.json();
    console.log(movies,"tvshows object");

    setSingleMovie(movies)

    const filteredTrailers = movies.videos?.results?.filter((item) => {

      if(item.name.includes('Official Trailer'||'Trailer'||'teaser')){

        return item.name

      }else if(item.type==="Trailer" || item.type ==="Clip" ){

        return item.type

      }
      else{
        return "No videos"
      }

    });

    console.log(filteredTrailers,"offical trailer");
    
    if (filteredTrailers && filteredTrailers.length > 0) {
     SetTrailer(filteredTrailers)
     console.log(filteredTrailers[0].key,"trailer")
    } else {
      // Handle the case when no filtered trailers are found
      // For example, you could set a default value or show an error message
      SetTrailer([])
    }
	}
	catch(error){
		setSingleMovie(error);
    SetTrailer(error)
	}	
  };

  const backgroundImageUrl=`https://image.tmdb.org/t/p/original${singleMovie.backdrop_path}`

const backgroundImageUrl2=`https://image.tmdb.org/t/p/original${singleMovie.poster_path}`


  return (
    <>

    {singleMovie.length >0 ? (<h1>loading*****</h1>
): (

  <div className=""   style={{
    backgroundImage: `url(${singleMovie.backdrop_path ?  backgroundImageUrl : backgroundImageUrl2}) `, // Set the background image dynamically
    backgroundSize: "cover",
    height:"95vh",
    maxHeight:"100vh",
    backgroundRepeat: "no-repeat",
  }}>

<div className="row  mx-5" style={{opacity:1,
}} >

<div className="col-8 m-5">

  <div className="d-flex flex-row">

    <div className="col-5 ">
	
    <img
      style={{opacity:1}}
        src={`https://image.tmdb.org/t/p/w200${singleMovie.poster_path}`}
        alt={`${singleMovie.title} Poster`}
      /><br></br>
       <svg xmlns="http://www.w3.org/2000/svg" width="120" height="100" fill="white" className="bi bi-play-circle-fill" viewBox="0 0 16 16" onClick={modalShow}>
  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM6.79 5.093A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814l-3.5-2.5z"/>

</svg>
     
    </div>
    <Modal  show={modal}
     onHide={modalCLose}
     animation={false} fullscreen="lg-down" size="xl">
              <Modal.Header
                style={{ backgroundColor: "white" }}
                closeButton
                onClick={modalCLose}
                className="bi bi-x-circle"
              >
                <Modal.Title>{singleMovie.original_title}</Modal.Title>
              </Modal.Header>
              <Modal.Body
              // size="xl"
              >
                
				{
          trailer.length >0 ? trailer.length > 0 && 
          <ReactPlayer
                    url={`https://www.youtube.com/watch?v=${trailer[0].key}`}
                    controls
                    width="100%"
                    height="600px"
                    playing={true}
                />: 
                <h1 className="text-center text-primary p-5">No videos</h1>
        }
      
              </Modal.Body>
            </Modal>
    

    <div className="px-2 col-7">

    <h1 className="fs-1 fw-bold text-light" >
        {singleMovie.title}
        </h1>

    <p className="fw-normal text-light">
        {singleMovie.overview}
      </p>

      <p className="fw-bold fs-4 text-light">
          {singleMovie &&
            singleMovie?.genres?.map((data) => {
              return <>
              <span className="rounded-pill bg-primary px-3 py-2" key={data.name}>
              {data.name}
              </span>
              |
              </>;
            })}
        </p>

        
        <div className="d-flex  mb-3">

<button className="btn btn-primary mx-1" onClick={castModalShow} >
<span class="btn-label">
<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-people-fill mb-1 me-2" viewBox="0 0 16 16">
  <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7Zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm-5.784 6A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216ZM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z"/>
</svg>
        </span>
        Cast & Crew
</button>
        

       

<p className="fs-4  m-2 text-light">RunTime:{singleMovie.runtime} Mintues</p>
</div>

        <Link>
        {singleMovie.homepage}
        </Link>
    </div>
    <CastModal  title={singleMovie.title}  crew_division={crew_division} data={cast_crew} castModalCLose={castModalCLose} castModalShow={castModalShow} castModal={castModal} />

  </div>
</div>
</div>
</div>
)}    
    </>
  );

}

export default TvshowDetails