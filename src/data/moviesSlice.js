import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchMovies = createAsyncThunk('fetch-movies', async (apiUrl) => {
    const response = await fetch(apiUrl);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
});

const moviesSlice = createSlice({
    name: 'movies',
    initialState: {
        movies: [],
        fetchStatus: '',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchMovies.fulfilled, (state, action) => {
                const url = new URL(action.meta.arg);
                const page = url.searchParams.get('page');
                if (page === '1') {
                    state.movies = action.payload.results;
                } else {
                    state.movies = [...state.movies, ...action.payload.results];
                }
                state.fetchStatus = 'success';
            })
            .addCase(fetchMovies.pending, (state) => {
                state.fetchStatus = 'loading';
            })
            .addCase(fetchMovies.rejected, (state) => {
                state.fetchStatus = 'error';
            });
    }
});

export default moviesSlice;
