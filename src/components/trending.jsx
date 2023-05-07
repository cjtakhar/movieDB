import { useState, useEffect } from "react";
import axios from "axios";

const Trending = () => {
  const [trending, setTrending] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const api_key = process.env.REACT_APP_API_KEY;

  useEffect(() => {
    const getTrending = async () => {
      const url = `https://api.themoviedb.org/3/trending/movie/week?api_key=${api_key}`;
      const options = {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${api_key}`,
        },
      };
      try {
        const res = await axios.get(url, options);
        if (res.data.results.length === 0) {
          setTrending([]);
          console.log("No movies found.", trending);
        } else {
          setTrending(res.data.results);
        }
      } catch (err) {
        console.log(err);
      }
    };

    getTrending();
  }, []);

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
  };

  return (
    <div>
      <div className="top-movie-container">
        {trending.map((trending) => (
          <div key={trending.id}>
            <img
              src={`https://image.tmdb.org/t/p/w500/${trending.poster_path}`}
              alt={`${trending.title} poster`}
              onClick={() => handleMovieClick(trending)}
            />
          </div>
        ))}
      </div>
      {selectedMovie && (
        <div className="movie-details" onClick={() => setSelectedMovie(null)}>
          <img
            src={`https://image.tmdb.org/t/p/w500/${selectedMovie.poster_path}`}
            alt={`${selectedMovie.title} poster`}
          />
          <div className="movie-details-text">
            <h3 className="movie-details-title">{selectedMovie.title}</h3>
            <p className="movie-details-overview">{selectedMovie.overview}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Trending;

