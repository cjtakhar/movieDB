import { useState, useEffect } from "react";
import axios from "axios";

const Discover = () => {
  const [discover, setDiscover] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const api_key = process.env.REACT_APP_API_KEY;

  useEffect(() => {
    const getDiscover = async () => {
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
          setDiscover([]);
          console.log("No movies found.", discover);
        } else {
          setDiscover(res.data.results);
        }
      } catch (err) {
        console.log(err);
      }
    };

    getDiscover();
  }, []);

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
  };

  return (
    <div>
      <div className="top-movie-container">
        {discover.map((discover) => (
          <div key={discover.id}>
            <img
              src={`https://image.tmdb.org/t/p/w500/${discover.poster_path}`}
              alt={`${discover.title} poster`}
              onClick={() => handleMovieClick(discover)}
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
            <p className="movie-details-overview">{selectedMovie.overview}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Discover;

