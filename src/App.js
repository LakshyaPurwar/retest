import React, { useState } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
  const [movies , setMovies ] = useState([]);
  const [isLoading , setIsLoading] = useState(true);
  const [error , setError]  = useState(null);

   const fetchMovies = async ()=>{
    setIsLoading(true);
    setError(null);
    //Before fetching both should be  once againg set to their initial values.
        try{
          const response = await fetch('https://swapi.py4e.com/api/films/');

          //The fetch api does not throw an error for a not "ok" response
          //It only throws an error when somthing goes wrong is making the fetch request
          //So , using the response object , we must explicitly see if the status code is 200 or not // or status.ok is true or false
          //Then on that basis , our error message should be displayed

          if(!response.ok)
          {
             //Then we should throw our own error
             throw new Error("Something went wrong ! ");
          }

      const data = await response.json();
      const formattedData = data.results.map((singleData)=>{
        return {

          id : singleData.episode_id,
          title:singleData.title,
          openingText : singleData.opening_crawl,
          releaseData : singleData.release_date
        };
      });
      setMovies(formattedData );
      //Once we have fed data into the component we want to display
      //Then we setLoading as false
      setIsLoading(false);


        }
        catch(error)
        {
          //We are here , because an error occured while we tried to obtain the data
          //That is  , a result has be obtained , so isLoading must be set false here as well
          setError(error.message);
          setIsLoading(false);
        }
      
   }


   //Now , when we are fetching data , fetching is ok.
   //But , what's more important is managing all the exceptional cases
   //1. We need to manage the loading state
   //2. We need to manage the error state
   //3. We need to manage the state where there is no content

   //Instead of conditionally rendering everything inside the return of the functional component
   //We better create a congt called content , the value of which will be obtained conditionally

   let content = <p></p>

   if(isLoading)
   {
    content = <p>Loading ...</p>
   }
   else if(!isLoading && movies.length>0)
   {
    content = <MoviesList movies={movies} />
   }
   else if(!isLoading && !error &&  movies.length==0)
   {
    content = <p>No movies to show</p>
   }
   else if(error)
   {
    content = <p>{error}</p>
   }



  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMovies}>Fetch Movies</button>
      </section>
       <section>
       {content}
      </section>
      
    </React.Fragment>
  );
}

export default App;
