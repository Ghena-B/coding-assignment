# Code Review for constants.ts

## General Overview

The `constants.js` file defines several constants related to API endpoints and the API key for accessing the TMDB (The Movie Database) API. This file is crucial for maintaining consistent and correct URLs throughout the application.

## Issues and Suggestions

### 1. Use of ES6 Template Literals

- **Issue**: The current code concatenates strings using the `+` operator, which can be less readable and more error-prone.
- **Suggestion**: Use ES6 template literals for better readability and maintainability.

  **Current Code**:
  ```javascript
  export const API_KEY = '8cac6dec66e09ab439c081b251304443';
  export const ENDPOINT = 'https://api.themoviedb.org/3';
  export const ENDPOINT_DISCOVER = ENDPOINT+'/discover/movie/?api_key='+API_KEY+'&sort_by=vote_count.desc';
  export const ENDPOINT_SEARCH = ENDPOINT+'/search/movie/?api_key='+API_KEY;
  export const ENDPOINT_MOVIE = ENDPOINT+'/movie/507086?api_key='+API_KEY+'&append_to_response=videos';

### 2. URL Formatting Error

- **Issue**: An extra `/` in the initial URL fetch caused a 404 error.

- **Suggestion**: Ensure all URLs are correctly formatted to avoid errors.

- **Resolution**:
  The corrected URLs using template literals (as shown above) ensure that there are no extra slashes and the URLs are properly formatted.

## Updated `constants.js` File

Here is the updated `constants.js` file after applying the suggestions:
```javascript
export const API_KEY = '8cac6dec66e09ab439c081b251304443';
export const ENDPOINT = 'https://api.themoviedb.org/3';
export const ENDPOINT_DISCOVER = `${ENDPOINT}/discover/movie?api_key=${API_KEY}&sort_by=vote_count.desc`;
export const ENDPOINT_SEARCH = `${ENDPOINT}/search/movie?api_key=${API_KEY}`;
export const ENDPOINT_MOVIE = `${ENDPOINT}/movie/507086?api_key=${API_KEY}&append_to_response=videos`;
