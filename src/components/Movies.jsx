import { useEffect, useRef, useState } from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import Movie from './Movie';
import '../styles/movies.scss';
import { ENDPOINT_DISCOVER } from "../utils/constants";

const Movies = ({ viewTrailer, closeCard, movies }) => {
    const [localMovies, setLocalMovies] = useState([]);
    const [isError, setIsError] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    const pageRef = useRef(1);

    const fetchMovies = async ({ page, isFetchingFirstTime = false }) => {
        try {
            setIsError(false);
            const res = await fetch(`${ENDPOINT_DISCOVER}&page=${page}`);
            const data = await res.json();

            if (data.results) {
                setLocalMovies((prev) => {
                    const newData = isFetchingFirstTime ? data.results : [...prev, ...data.results];

                    if (newData.length < data.total_results) {
                        setHasMore(true);
                    } else {
                        setHasMore(false);
                    }

                    return newData;
                });
            } else {
                setHasMore(false);
            }
        } catch (err) {
            setHasMore(false);
            setIsError(true);
        }
    };

    // Initial fetch or reset when movies prop changes
    useEffect(() => {
        pageRef.current = 1;
        setLocalMovies(movies);
        if (movies.length === 0) {
            fetchMovies({ page: pageRef.current, isFetchingFirstTime: true });
        }
    }, [movies]);

    // Infinite scrolling
    const [targetRef, isIntersecting] = useIntersectionObserver({ threshold: 1 });

    useEffect(() => {
        if (hasMore && isIntersecting) {
            pageRef.current += 1;
            fetchMovies({ page: pageRef.current });
        }
    }, [isIntersecting, hasMore]);

    return (
        <div data-testid="movies" className="movies-grid">
            {isError ? (
                <div>Failed to fetch movies. Please try again later.</div>
            ) : localMovies.length === 0 ? (
                <div>Loading Movies...</div>
            ) : (
                <>
                    {localMovies.map((movie) => (
                        <Movie
                            movie={movie}
                            key={movie.id}
                            viewTrailer={viewTrailer}
                            closeCard={closeCard}
                        />
                    ))}
                </>
            )}

            {hasMore && (
                <div ref={targetRef}>
                    <div>Loading more movies...</div>
                </div>
            )}
        </div>
    );
};

export default Movies;
