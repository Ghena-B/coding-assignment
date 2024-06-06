import React, { useEffect, useState, useCallback } from 'react';
import { Routes, Route, useSearchParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import 'reactjs-popup/dist/index.css';
import { fetchMovies } from './data/moviesSlice';
import { ENDPOINT_SEARCH, ENDPOINT_DISCOVER, ENDPOINT, API_KEY } from './utils/constants';
import Header from './components/Header';
import Movies from './components/Movies';
import Starred from './components/Starred';
import WatchLater from './components/WatchLater';
import TrailerModal from "./components/TrailerModal/TrailerModal";
import './app.scss';

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get('search');
  const { movies, fetchStatus } = useSelector(state => state.movies);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [videoKey, setVideoKey] = useState(null);

  const fetchMovieData = useCallback((query = '', page = 1) => {
    const apiUrl = query
        ? `${ENDPOINT_SEARCH}&query=${query}&page=${page}`
        : `${ENDPOINT_DISCOVER}&page=${page}`;
    dispatch(fetchMovies(apiUrl));
  }, [dispatch]);

  useEffect(() => {
    fetchMovieData(searchQuery);
  }, [searchQuery, fetchMovieData]);

  const searchMovies = (query) => {
    navigate('/');
    setSearchParams(query ? { search: query } : {});
  };

  const viewTrailer = async (movie) => {
    setSelectedMovie(movie);

    try {
      const response = await fetch(`${ENDPOINT}/movie/${movie.id}?api_key=${API_KEY}&append_to_response=videos`);
      const data = await response.json();
      const trailer = data.videos.results.find(vid => vid.type === 'Trailer') || data.videos.results[0];
      setVideoKey(trailer?.key);
      setShowModal(true);
    } catch (error) {
      console.error('Error fetching movie details:', error);
    }
  };

  return (
      <div className="App" id="app">
        <Header searchMovies={searchMovies} searchParams={searchParams} setSearchParams={setSearchParams} />

        <div className="container">
          <TrailerModal
              movieTitle={selectedMovie?.title}
              videoKey={videoKey}
              isOpen={showModal}
              onClose={() => setShowModal(false)}
          />
          <Routes>
            <Route path="/" element={<Movies movies={movies} viewTrailer={viewTrailer} fetchStatus={fetchStatus} />} />
            <Route path="/starred" element={<Starred viewTrailer={viewTrailer} />} />
            <Route path="/watch-later" element={<WatchLater viewTrailer={viewTrailer} />} />
            <Route path="*" element={<h1 className="not-found">Page Not Found</h1>} />
          </Routes>
        </div>
      </div>
  );
}

export default App;
