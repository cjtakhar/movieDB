import { useState, useEffect } from "react";
import axios from "axios";

const TopRated = () => {
  const [topRated, setTopRated] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [movieDetails, setMovieDetails] = useState(null);
  const api_key = process.env.REACT_APP_API_KEY;

  const getTopRated = async () => {
    const url = `https://api.themoviedb.org/3/movie/top_rated?api_key=${api_key}&language=en-US`;
    const options = {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${api_key}`,
      },
    };
    try {
      const res = await axios.get(url, options);
      if (res.data.results.length === 0) {
        setTopRated([]);
        console.log("No movies found.", topRated);
      } else {
        setTopRated(res.data.results);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getTopRated();
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
      <div className="top-movie-container">
        {topRated.map((topRated) => (
          <div key={topRated.id}>
            <img
              src={`https://image.tmdb.org/t/p/w500/${topRated.poster_path}`}
              alt={`${topRated.title} poster`}
              onClick={() => handleMovieClick(topRated)}
            />
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
                <p>{movieDetails.overview}</p>
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

export default TopRated;

