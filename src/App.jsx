import React, { useCallback, useEffect, useState } from 'react';

import MoviesList from './components/MoviesList';
import AddMovie from './components/AddMovie';
import './App.css';

function App() {
  const [movies , setMovies ] = useState([]);
  const [isLoading , setIsLoading] = useState(true);
  const [error , setError]  = useState(null);


  const storeMovies = async(movie)=>{
    const response = await fetch('https://react-backend-connection-default-rtdb.firebaseio.com/movies.json',{
    
    method : 'POST',
    body : JSON.stringify(movie),
    headers: {
      'Content-Type' : 'application/json',
    }
    
    });

    const data = await response.json();
    console.log(data);

  }

   const fetchMovies = async ()=>{
    setIsLoading(true);
    setError(null);
    //Before fetching both should be  once againg set to their initial values.
        try{
          const response = await fetch('https://react-backend-connection-default-rtdb.firebaseio.com/movies.json');

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
      //There response is a javacript object  , not an array.
      //We can loop through the array using map , but to loop through the object , for in loop is used
      const formattedData = [];
      for(const key in data)
      {
        formattedData.push({
          id:key,
          title : data[key].title,
          releaseDate : data[key].releaseData,
          openingText : data[key].openingSentence

        });

      }
      console.log(data);
      // const formattedData = data.results.map((singleData)=>{
      //   return {

      //     id : singleData.episode_id,
      //     title:singleData.title,
      //     openingText : singleData.opening_crawl,
      //     releaseData : singleData.release_date
      //   };
      // });
      setMovies(formattedData);
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

   //As soon as the page is opened , we would want the list of movies to be loaded and not on some click
   //So ,as soon as the page is rendered , we want fetching to happen as a side effect.
   const memoisedFetchMovies = useCallback(fetchMovies , [])
   useEffect(()=>{
    memoisedFetchMovies();
   },[memoisedFetchMovies])

   //Any function or state variable used inside useEffect should be mentioned in the dependency list , that's a good practice.
   //Beware: We should always take care if the dependency is a non primitive type.
   //Because then , even if its value does not change , its reference will.
   //For a function , better  wrap it inside useCallBack and then mention here.
   //In useCallback , the second argument is the dependency list of variables that affect the function.


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
   else if(!isLoading && !error &&  movies.length===0)
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
          <AddMovie onAddMovie={storeMovies}/>
      </section>
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
