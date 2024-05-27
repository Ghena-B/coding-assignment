import {Link, NavLink, useNavigate} from "react-router-dom"
import { useSelector } from 'react-redux'
import '../styles/header.scss'
import {useEffect, useState} from "react";

const Header = ({ searchMovies }) => {
    const { starredMovies } = useSelector((state) => state.starred);
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const handleSearch = (event) => {
        const value = event.target.value;
        setSearchTerm(value);
        searchMovies(value);
    };

    const handleClearSearch = () => {
        setSearchTerm('');
        searchMovies('');
    };
    useEffect(() => {
        setSearchTerm('');
    }, [navigate]);

    return (
        <header>
            <Link
                to="/"
                data-testid="home"
                onClick={() => {
                searchMovies('');
                handleClearSearch();
            }}>
                <i className="bi bi-film" />
            </Link>
            <nav>
                <NavLink
                    to="/starred"
                    data-testid="nav-starred"
                    className="nav-starred">
                    {starredMovies.length > 0 ? (
                        <>
                            <i className="bi bi-star-fill bi-star-fill-white"/>
                            <sup className="star-number">{starredMovies.length}</sup>
                        </>
                    ) : (
                        <i className="bi bi-star"/>
                    )}
                </NavLink>
                <NavLink
                    to="/watch-later"
                    className="nav-fav">
                    watch later
                </NavLink>
            </nav>
            <div className="input-group rounded">
                <input
                    type="search"
                    data-testid="search-movies"
                    value={searchTerm}
                    onChange={handleSearch}
                    className="form-control rounded"
                    placeholder="Search movies..."
                    aria-label="Search movies"
                    aria-describedby="search-addon"
                />
            </div>
        </header>
    )
}

export default Header
