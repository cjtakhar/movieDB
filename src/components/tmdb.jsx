import { useState } from "react";
import axios from "axios";

const api_key = process.env.REACT_APP_API_KEY;

const MovieDatabase = () => {
  const [movie, setMovie] = useState([]);
  const [search, setSearch] = useState("");

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
        setMovie([]);
        console.log("No movies found for search query:", search);
      } else {
        setMovie(res.data.results);
      }
    } catch (err) {
      console.log(err);
    }
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
        {movie.map((movie) => (
          <div key={movie.id} className="movie-card">
            <img
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              alt={movie.title + " poster"}
            />
            <h3>{movie.title}</h3>
            <p>{movie.overview}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieDatabase;
