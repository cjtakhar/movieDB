import { useState } from "react";
import axios from "axios";

const api_key = process.env.REACT_APP_API_KEY;

const MovieDatabase = () => {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedMovie, setSelectedMovie] = useState(null);

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = `https://api.themoviedb.org/3/search/movie?query=${search}&include_adult=false&language=en-US&page=1&api_key=${api_key}`;
    const options = {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${api_key}`,
      },
    };
    try {
      const res = await axios.get(url, options);
      if (res.data.results.length === 0) {
        setMovies([]);
        console.log("No movies found for search query:", search);
      } else {
        setMovies(res.data.results);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
  };

  return (
    <div>
      <div className="form-container">
        <h1 className="title">Show Me the Movie</h1>
        <form className="form" onSubmit={handleSubmit}>
          <input
            className="input-search"
            type="text"
            placeholder=""
            value={search}
            onChange={handleChange}
          />
          <button className="btn" type="submit">
            Enter
          </button>
        </form>
      </div>
      <div className="movie-container">
        {movies.map((movie) => (
          <div key={movie.id} className="movie-card">
            {movie.poster_path && (
              <img
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                alt={movie.title + " poster"}
                onClick={() => handleMovieClick(movie)}
              />
            )}
          </div>
        ))}
      </div>
      {selectedMovie && (
        <div className="movie-details">
          <img
            src={`https://image.tmdb.org/t/p/w500/${selectedMovie.poster_path}`}
            alt={selectedMovie.title + " poster"}
          />
          <div className="movie-details-text">
            <h3 className="movie-details-title">{selectedMovie.title}</h3>
            <p className="movie-details-overview">{selectedMovie.overview}</p>
            <button className="btn-details" onClick={() => setSelectedMovie(null)}>x</button>
          </div>
        </div>
      )}
    </div>
  );  
};

export default MovieDatabase;

