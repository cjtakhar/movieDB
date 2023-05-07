import { useState, useEffect } from "react";
import axios from "axios";

const Discover = () => {
  const [discover, setDiscover] = useState([]);
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

  return (
    <div>
      <div className="top-movie-container">
        {discover.map((discover) => (
          <div key={discover.id}>
            <img
              src={`https://image.tmdb.org/t/p/w500/${discover.poster_path}`}
              alt={`${discover.title} poster`}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Discover;
