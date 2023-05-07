import { useState, useEffect } from "react";
import axios from "axios";

const Discover = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [movieDetails, setMovieDetails] = useState(null);
  const api_key = process.env.REACT_APP_API_KEY;

  useEffect(() => {
    const getMovies = async () => {
      const url = `https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`;
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
          console.log("No movies found.", movies);
        } else {
          setMovies(res.data.results);
        }
      } catch (err) {
        console.log(err);
      }
    };

    getMovies();
  }, []);

  const handleMovieClick = async (movie) => {
    setSelectedMovie(movie);
    const url = `https://api.themoviedb.org/3/movie/${movie.id}?api_key=${api_key}&language=en-US&append_to_response=credits`;
    try {
      const res = await axios.get(url);
      setMovieDetails(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
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
        <div className="movie-details" onClick={() => setSelectedMovie(null)}>
          <img
            src={`https://image.tmdb.org/t/p/w500/${selectedMovie.poster_path}`}
            alt={selectedMovie.title + " poster"}
          />
          <div className="movie-details-text">
            <h3 className="movie-details-title">{selectedMovie.title}</h3>
            {movieDetails && (
              <div>
                <p>Overview: {movieDetails.overview}</p>
                <p>Director: {movieDetails.credits.crew.find(crewMember => crewMember.job === "Director")?.name}</p>
                <p>Actors: {movieDetails.credits.cast.slice(0, 5).map((actor) => actor.name).join(", ")}</p>
                <p className="movie-details-release">Release Date: {new Date(selectedMovie.release_date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</p>
                <p>Runtime: {movieDetails.runtime} minutes</p>
                <p className="movie-details-rating">Rating: {selectedMovie.vote_average.toFixed(1)}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Discover;



