import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Upcoming = () => {
    const [upcoming, setUpcoming] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const api_key = process.env.REACT_APP_API_KEY;

    useEffect(() => {
        const fetchUpcoming = async () => {
            const url = `https://api.themoviedb.org/3/movie/upcoming?api_key=${api_key}&language=en-US`;
            const options = {
                headers: {
                    accept: 'application/json',
                    Authorization: `Bearer ${api_key}`
                }
            };
            try {
                const res = await axios.get(url, options);
                if (res.data.results.length === 0) {
                    setUpcoming([]);
                    console.log('No movies found.', upcoming);
                } else {
                    setUpcoming(res.data.results);
                }
            } catch (err) {
                console.log(err);
            }
        };
        fetchUpcoming();
    }, []);

    const handleMovieClick = (movie) => {
        setSelectedMovie(movie);
    };

    return (
        <div>
            <div className="top-movie-container">
                {upcoming.map((upcoming) => (
                    <div key={upcoming.id}>
                        <img
                            src={`https://image.tmdb.org/t/p/w500/${upcoming.poster_path}`}
                            alt={`${upcoming.title} poster`}
                            onClick={() => handleMovieClick(upcoming)}
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

export default Upcoming;

