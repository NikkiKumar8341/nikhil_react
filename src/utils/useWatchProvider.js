import React,{useState,useEffect} from 'react'

const useWatchProvider = (id) => {

    const [strem,setStream]=useState(null);


    const strem_provider=`https://api.themoviedb.org/3/movie/${id}?api_key=4fe592a41ab3d02679639aa510ee521e&append_to_response=watch/providers
    `


    const fetch_watchProvider=async()=>{

        const options = {
            method: 'GET',
            headers: {
              accept: 'application/json',
            }
       };

    const data=await fetch(strem_provider,options)

    const results=await data.json();

    console.log(results,"strem");

    setStream(results);


    }

    useEffect(()=>{
        fetch_watchProvider();
    },[])

  return strem;
}

export default useWatchProvider