import { useState, useEffect } from 'react'
import React from 'react'
import "./App.css"
import MovieCard from './MovieCard';


function App() {

  const API_URL = "https://api.themoviedb.org/3/movie/popular?api_key=381cf5ca96fa76d872343963435afad7";
  const API_SEARCH = "https://api.themoviedb.org/3/search/movie?api_key=381cf5ca96fa76d872343963435afad7&query=";
  
  const [movies, setMovies] = useState([]);
  const [term, setTerm] = useState([]);
  const [initialMovies, setInitialMovies] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    fetch(API_URL)
    .then(res => res.json())
    .then(data => setMovies(data.results))
  }, [])

  console.log(movies);

  const handleSearch = (e) => {
    e.preventDefault();
    fetch(API_SEARCH + term)
      .then(res => res.json())
      .then(data => {
        setInitialMovies(movies); // Almacenar los resultados originales
        setMovies(data.results);
        setHasSearched(true);
      });
  }

  const handleBackToInitial = () => {
    setMovies(initialMovies);
    setHasSearched(false);
  }
  return (
    <div className='App'>
      <div className='title'>
        <h1>ALEXLIX</h1>
      </div>
      <div className='search_nav'>
        <div className='search_box'>
          <form onSubmit={handleSearch}>
            <input onChange={(e) => setTerm(e.target.value)} />
            <button>Search</button>
          </form>
        </div>
        {hasSearched && (
          <div className='back_button'>
            <button onClick={handleBackToInitial}>Go Back</button>
          </div>
        )}
      </div>
      <div className='movies'>
        {movies.map((movie) => (
          <MovieCard key={movie.id} {...movie} />
        ))}
      </div>
    </div>
  )
}

export default App