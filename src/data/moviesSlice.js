import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

export const fetchMovies = createAsyncThunk('fetch-movies', async ({ apiUrl, page }) => {
    const response = await fetch(`${apiUrl}&page=${page}`);
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
                if (action.meta.arg.page === 1) {
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
