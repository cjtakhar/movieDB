import { useState, useEffect } from "react";
import axios from "axios";

const TopRated = () => {
  const [topRated, setTopRated] = useState([]);
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

  return (
    <div>
      <div className="top-movie-container">
      {topRated.map((topRated) => (
        <div key={topRated.id}>
          <img
            src={`https://image.tmdb.org/t/p/w500/${topRated.poster_path}`}
            alt={`${topRated.title} poster`}
          />
        </div>
      ))}
      </div>
     
    </div>
  );
};

export default TopRated;

