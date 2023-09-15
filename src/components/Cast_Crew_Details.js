import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { unavailable } from '../utils/constant';
import {unavailable_poster} from '../utils/image/image-150x225.jpg';

const Cast_Crew_Details = () => {

    const cast_id=useParams();

    const [cast_data,setCast_Data]=useState([]);

    const [castKnown,setCastKnown]=useState([]);

    const[crew_division,setCrew_Division]=useState()
    
    const {id}=cast_id;


    const url=`https://api.themoviedb.org/3/person/${id}?api_key=4fe592a41ab3d02679639aa510ee521e`;


    const cast_crew_knownFor=`https://api.themoviedb.org/3/person/${id}/combined_credits?api_key=4fe592a41ab3d02679639aa510ee521e`

    const fetch_castDetails=async()=>{

        const data=await fetch(url);

        const result=await data.json();

        console.log(result,"cast_details");

        setCast_Data(result)

       


    }


    const fetch_castKnownFor=async()=>{
        const data=await fetch(cast_crew_knownFor);
        const result=await data.json();

        console.log(result.department,"crew");
        setCastKnown(result);

         let crew_division=result?.crew?.reduce((acc,currentItem)=>{
            acc[currentItem.department]=acc[currentItem.department]||[];
            acc[currentItem.department].push(currentItem)
            return acc ;
          },{});

          setCrew_Division(crew_division);
         

          console.log(crew_division,"crew");
       
    }

    useEffect(()=>{
        fetch_castDetails()
        fetch_castKnownFor()
    },[])
    
   
  return (
   <>

   <div className='container'>
    <div className='row mt-2 '>

        <div className='col-4'>
            <img  src={cast_data.profile_path ? `https://image.tmdb.org/t/p/w300${cast_data.profile_path}` : `${unavailable}`}/>
        </div>

        <div className='col-8'>
            <h1>{cast_data.name}</h1>

            <h4>Biography</h4>

            <p>{cast_data.biography}</p>
            <h4>Known For</h4>
            <div className='d-flex w-100'  style={{overflowX:'auto'}}>

                {
                  castKnown?.cast?.length >0 &&  castKnown?.cast?.map((item)=>(
                        <div className=" m-2 w-100">
                            <Link   to={`/details/${item.release_date ? 'movie' : (item.first_air_date ? 'tv':"")}/${item.id}`}>
                           
                            <img className={`m-1 card-img-top rounded`} 
                            src={item.poster_path ? `https://www.themoviedb.org/t/p/w150_and_h225_bestv2${item.poster_path}` : `${unavailable}`}/>
                            </Link>
                            <div className="card-body text-center" 
                            >
                                <h5 className="card-title">{item.title}</h5>
                            </div>
                        </div>
                                          
                    ))
                }


            </div>
        </div>

    </div>

    <div className='row mt-2'>


    </div>
    
    {crew_division &&
        Object.entries(crew_division).map(([department, data]) => (
            <>
            <div>
                <h1>{department}</h1>
                <hr/>
            </div>
            {
                data.map((item)=>(
                    <>
                    <div  style={{
                                backgroundImage: `url(https://www.themoviedb.org/t/p/original${item.backdrop_path}) `, // Set the background image dynamically
                                 backgroundSize: "cover",
                                 height:"50vh",
                                 opacity:1,
                                maxHeight:"100vh",
                                 backgroundRepeat: "no-repeat"
                    }} className=' row border rounded-3 bg-light shadow-sm p-2 m-2'>
                        <div className='col-4'>
                        <Link  to={`/details/${(!item.release_date && !item.first_air_date) ? "movie" : (item.release_date ? "movie" : (item.first_air_date ? "tv" : ""))}/${item.id}`}>
                        {/* const itemType = (!item.release_date && !item.first_air_date) ? "movie" : (item.release_date ? "movie" : (item.first_air_date ? "tv" : "unknown")); */}
                        {/* (item.release_date ? ('movie') : (item.first_air_date ? 'tv':'movie')) */}
                            
                            <img className={`m-1 card-img-top rounded`} 
                            src={item.poster_path ? `https://www.themoviedb.org/t/p/w150_and_h225_bestv2${item.poster_path}` : `${unavailable}`}/>
                        </Link>
                        </div>
                        <div className='col-7' style={{opacity: 2}}
                        
                   
                        >
                            <h1 className='fw-bolder'>{item.title}</h1>
                            <p>{item.overview}</p>
                            <h4 className='text-dark'>Job {item.job}</h4>
                        </div>
                        
                    </div>
                    </>
                ))
            }

            </>
        )
        
        )
}
   </div>
   
   </>
  )
}

export default Cast_Crew_Details

{/* <img 
                        onMouseEnter={() => handleMouseEnter(item)}
                        className={`m-1`}        
                       src={item.poster_path ? `https://www.themoviedb.org/t/p/w150_and_h225_bestv2${item.poster_path}` : `${unavailable}`}/> */}
                        {/* {isHovering && item === hoveredItemData && ( // Display additional data only if hovering over the same item
                    <div className="hover_tooltip ">  
                      {item.title}
                    </div>
                  )} */}