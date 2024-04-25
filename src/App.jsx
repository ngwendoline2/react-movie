import { useState, useEffect } from 'react'
import './App.css'
import MovieDisplay from './components/MovieDisplay'
import Form from './components/Form'

function App() {
  // create a variable to hold my api key
  // normally, i would put this in to my .env and then bring it in as a variable
  const apiKey = "4b905297";

  // create state to hold the movie data
  const [movie, setMovie] = useState(null);

  const getMovie = async (searchTerm) => {
        // get the movie
        const baseUrl = 'https://www.omdbapi.com/';
        const url = baseUrl + '?' + 'apikey=' + apiKey + '&' + 't=' + searchTerm;
        console.log(url);

        try {
          // fetch with the url and it gets the same thing as when I put that url in the address bar
          const response = await fetch(url);
          console.log(response)
          const data = await response.json();
          console.log(data);
          setMovie(data);
        } catch (e) {
          console.error(e);
        }

  }

  // going to use useEffect to get a movie the very first time that I render
  // I can decide which state updates cause useEffect to run
  // because I have an empty dependency array, this will only run the first time this renders
  useEffect(() => {
    const firstMovie = "Batman";
    getMovie(firstMovie);
  }, []);
  
  // this is how you would display the movie title if movie could be null
  // { movie 
  //   ? <h1>{movie.Title}</h1>
  //   : <h1>nothing yet</h1>
  //   }

  return (
    <>
  <h1>This is the main App</h1>
  <Form moviesearch={getMovie} />
  <MovieDisplay movie={movie}/>
    </>
  )
}

export default App