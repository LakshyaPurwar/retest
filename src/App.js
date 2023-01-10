import React, { useState } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
  const [movies , setMovies ] = useState([]);

   const fetchMovies = async ()=>{
      const response = await fetch('https://swapi.py4e.com/api/films/');
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

   }


  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMovies}>Fetch Movies</button>
      </section>
      {movies.length >0 && <section>
        <MoviesList movies={movies} />
      </section>}
      
    </React.Fragment>
  );
}

export default App;
