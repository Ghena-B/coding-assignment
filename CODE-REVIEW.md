# Code Review
# App.jsx Component

## General Improvements

### Code Formatting and Consistency:

- Improved code formatting with consistent use of semicolons.
- Improved import statements with more explicit paths, enhancing clarity and maintainability.

### React Functional Component with ES6 Syntax:

- Transitioned to using React functional components with ES6 syntax (`function App()`), promoting a modern and concise coding style.

## Specific Improvements

### State Management and Hooks:

- **Old:** State management was somewhat cluttered, with state variables and hooks spread out, hindering readability.
- **New:** Streamlined use of state and hooks (`const { movies, fetchStatus } = useSelector(state => state.movies);`), enhancing code organization and maintainability.

### Modal Handling:

- **Old:** The modal handling was a bit scattered across multiple functions, reducing code cohesion.
- **New:** Centralized modal handling using a dedicated `TrailerModal` component, promoting a modular and focused approach.

### Movie Fetching Logic:

- **Old:** Movie fetching logic was somewhat repetitive, leading to potential code duplication.
- **New:** Consolidated movie fetching logic into a single function (`fetchMovieData`), facilitating better code reuse and maintainability.

### Improved Trailer Handling:

- **Old:** Trailer handling was done within the main component, potentially mixing concerns.
- **New:** Moved trailer handling to an async function (`viewTrailer`), allowing for better error handling and separation of concerns.

### Code Examples (Illustrative):

```javascript
// Old Movie Fetching
const getMovies = () => { /* ... */ };

// New Movie Fetching (Consolidated)
useEffect(() => {
  const fetchMovieData = async (query = '', page = 1) => { /* ... */ };
  fetchMovieData(searchQuery);
}, [searchQuery, dispatch]);

// New Trailer Handling (Async)
const viewTrailer = async (movie) => {
  setSelectedMovie(movie);
  try { /* ... */ }
  catch (error) { /* ... */ }
};
```

# Movies.jsx Component

## General Improvements

### Code Readability and Structure:

- The updated `Movies` component demonstrates improved structure and readability. The code is well-organized with a clear separation of concerns, making it easier to understand and maintain.
- The addition of new features like infinite scrolling and error handling enhances the component's functionality and user experience.

### Enhanced Functionality:

- The component now supports **infinite scrolling**, allowing users to seamlessly load more movies as they reach the end of the list.
- **Error handling** has been implemented to gracefully manage situations where movie fetching fails, providing feedback to the user.

## Specific Improvements

### State Management:

- **Old:** State management was basic, relying directly on the `movies` prop, potentially limiting flexibility.
- **New:** The state management is more robust, utilizing local state (`localMovies`) to manage the list of movies independently. Additional state variables like `isError` and `hasMore` help manage error states and pagination.

### Infinite Scrolling:

- **Old:** The previous version lacked infinite scrolling functionality.
- **New:** Infinite scrolling is now implemented using the `useIntersectionObserver` hook. This hook triggers the fetching of more movies when the user scrolls near the end of the list, providing a smooth and continuous browsing experience.

### Error Handling:

- **Old:** Error handling was absent, leading to potential crashes or unexpected behavior in case of network issues or API failures.
- **New:** Error handling is now included, using a `try...catch` block within the `fetchMovies` function. When an error occurs, the `isError` state is set to true, and an appropriate error message is displayed to the user.

### Initial Fetch Logic:

- **Old:** The component relied on the parent component to provide the initial list of movies.
- **New:** The component now proactively checks if the initial list is empty and fetches movies accordingly. This ensures that the component can function independently, even if no initial data is provided.

### Loading Indicators:

- **Old:** Loading indicators were missing, leaving the user without feedback during data fetching.
- **New:** Loading indicators are now present for both initial loading and infinite scrolling, improving the user experience by providing visual cues about ongoing processes.


## Code Examples (Illustrative)

```javascript
// New State Management
const [localMovies, setLocalMovies] = useState(movies || []);
const [isError, setIsError] = useState(false);
const [hasMore, setHasMore] = useState(false);

// New Error Handling
try { /* ... */ }
catch (err) {
  setHasMore(false);
  setIsError(true);
}

// New Loading Indicators
{isError ? (
  <div>Failed to fetch movies. Please try again later.</div>
) : localMovies.length === 0 ? (
  <div>Loading Movies...</div>
) : ( /* ... */ )}
```

# Header.jsx Component

## General Improvements

### State Management and Search Handling:

- The updated code showcases a refined approach to managing search input, incorporating state for better control and persistence.
- The handling of search clearing and navigation interactions has been improved, ensuring a more intuitive and consistent user experience.

## Specific Improvements

### Search State Management:

- **Old:** The search input value was passed directly to the `searchMovies` function, making it harder to track and manage the search term's state within the component.
- **New:** The introduction of the `searchTerm` state provides a controlled way to manage the search input. This enhances predictability and allows for easier manipulation and clearing of the input value.

### Clear Search Handling:

- **New:**  A `handleClearSearch` function has been added to explicitly reset both the `searchTerm` state and trigger a new search with an empty query. This function is called when the user navigates to the home page or clicks on the search icon, offering clear ways to reset the search.

### Search Navigation Handling:

- **New:** The `useNavigate` hook from React Router is leveraged to detect navigation events. When a navigation occurs, the `useEffect` hook is used to reset the `searchTerm`, ensuring a fresh search state for the new page.

### Code Simplification and Readability:

- **Old:** Search-related logic was somewhat intertwined with JSX elements, potentially making it harder to follow.
- **New:** The search handling logic has been extracted into dedicated functions (`handleSearch`, `handleClearSearch`), improving the code's readability and maintainability by separating concerns.

## Code Examples (Illustrative)

```javascript
// New Search State Management
const [searchTerm, setSearchTerm] = useState('');

// New Search Input Handling
<input type="search" value={searchTerm} onChange={handleSearch} ... />

// New Clear Search and Navigation Handling
<Link to="/" onClick={() => { searchMovies(''); handleClearSearch(); }}> ... </Link>

useEffect(() => { 
  setSearchTerm(''); 
}, [navigate]);
```
# Modal.jsx Component

## Purpose

The `Modal` component provides a reusable modal dialog with smooth animations and a semi-transparent overlay. It leverages **React Portals** to render the modal content outside of its parent component's DOM hierarchy, ensuring it appears as an overlay across the entire application.

## Props

| Prop Name  | Type     | Description                                           |
| :--------- | :------- | :---------------------------------------------------- |
| `className` | `string` | Additional CSS classes to apply to the modal for styling. |
| `children`  | `ReactNode` | The content to be displayed within the modal.          |
| `isOpen`    | `boolean` | Determines whether the modal is open (true) or closed (false). |
| `onClose`   | `function` | A callback function executed when the modal should close.  |

## State and Hooks

- **State:**  This component doesn't manage state directly. Instead, it relies on the `useModal` hook for controlling the open/closed state and animation behavior.
- **`useModal` Hook:** This custom hook handles:
    - The `isOpen` state (whether the modal is open or closed).
    - Animation delay when closing the modal.
    - Whether the modal is currently mounted in the DOM.

## Important Methods

- **`close`:** This method, returned by the `useModal` hook, is responsible for initiating the closing of the modal, including any associated closing animations.

## Components

- **`Overlay`:**  A memoized component that renders the semi-transparent overlay that can be clicked to close the modal. It accepts `className` and `onClick` props.
- **`Portal`:**  This component utilizes React Portals to render its children into a specified DOM element (typically `document.body`), enabling the overlay behavior.

## Example Usage

```javascript
import React, { useState } from 'react';
import { Modal } from './components/Modal/Modal';

const App = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <div>
      <button onClick={openModal}>Open Modal</button>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <h1>Modal Content</h1>
        <p>This is an example of modal content.</p>
      </Modal>
    </div>
  );
};

export default App;
```

# TrailerModal.jsx Component

## Purpose

The `TrailerModal` component is a specialized modal dialog designed to display a YouTube trailer for a selected movie. It utilizes the reusable `Modal` component for its structure and the `YoutubePlayer` component to embed the YouTube video seamlessly.

## Props

| Prop Name  | Type     | Description                                                                |
| :--------- | :------- | :------------------------------------------------------------------------- |
| `movieTitle` | `string` | The title of the movie whose trailer is being shown.                        |
| `videoKey`   | `string` | The unique YouTube video ID (e.g., 'dQw4w9WgXcQ') for the trailer to be played. |
| `isOpen`    | `boolean` | Determines whether the modal is open (true) or closed (false).             |
| `onClose`   | `function` | A callback function executed when the modal should close.                  |

## State and Hooks

- This component does not manage its own state. It relies on the props passed down from its parent component to control its visibility (`isOpen`) and content (`movieTitle`, `videoKey`).

## Components

- **`Modal`:**  The reusable modal component that provides the modal's structure, overlay, and basic functionality (opening, closing, animations).
- **`YoutubePlayer`:**  A component (likely from a library or your own implementation) responsible for embedding and playing YouTube videos using the provided `videoKey`.

## Example Usage

```javascript
import React, { useState } from 'react';
import TrailerModal from './components/TrailerModal/TrailerModal';

const App = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [movieTitle, setMovieTitle] = useState('Example Movie');
  const [videoKey, setVideoKey] = useState('dQw4w9WgXcQ');

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <div>
      <button onClick={openModal}>View Trailer</button> {/* Trigger to open the modal */}
      <TrailerModal 
        isOpen={isModalOpen} 
        onClose={closeModal} 
        movieTitle={movieTitle} 
        videoKey={videoKey} 
      />
    </div>
  );
};

export default App;
```
# ErrorBoundary.jsx Component

## Purpose

The `ErrorBoundary` component acts as a safety net within your React application. Its primary function is to catch JavaScript errors that occur within its child component tree. When an error is encountered, the `ErrorBoundary` gracefully handles the situation by logging the error and displaying a fallback UI to the user, preventing the application from crashing entirely.

## Props

| Prop Name | Type     | Description                                           |
| :-------- | :------- | :---------------------------------------------------- |
| `children` | `ReactNode` | The child components that the ErrorBoundary wraps. These are the components that will be monitored for errors. |

## State

| State Variable | Type     | Description                                       |
| :------------- | :------- | :------------------------------------------------ |
| `hasError`    | `boolean` | Tracks whether an error has been detected (true) or not (false). |

## Methods and Lifecycle Hooks

- `static getDerivedStateFromError(error)`:  This static method is automatically called by React when an error is thrown by a descendant component. It receives the error object as an argument and returns a new state object with `hasError` set to `true`. This signals to the `ErrorBoundary` that an error has occurred.

- `componentDidCatch(error, errorInfo)`:  This lifecycle method is called after an error has been thrown by a descendant component. It receives the error object and an error information object as arguments. Inside this method, you typically log the error details to a logging service or console for debugging purposes.

## Render Logic

The `ErrorBoundary` component's render logic is conditional based on the value of the `hasError` state:

- **If `hasError` is true:** The component renders a fallback UI, which could be a simple error message or a more elaborate error page. This UI is designed to inform the user that something went wrong and potentially provide options for recovery.

- **If `hasError` is false:** The component renders its `children` (the nested components) normally.

## Example Usage

```javascript
import React from 'react';
import ErrorBoundary from './components/ErrorBoundary';
import SomeComponent from './components/SomeComponent';

const App = () => {
  return (
    <ErrorBoundary>
      <SomeComponent /> {/* This component and its children are now protected by the ErrorBoundary */}
    </ErrorBoundary>
  );
};

export default App;
```
# moviesSlice.js

## Purpose
The `moviesSlice` manages the state of movies in the application, including fetching movies from an API, handling the loading state, and managing errors. It uses Redux Toolkit's `createSlice` and `createAsyncThunk` to simplify state management and asynchronous operations.

## Actions
- **fetchMovies:** An asynchronous thunk action to fetch movies from a given API URL and page number.

## State
- `movies` (array): An array to store the list of movies fetched from the API.
- `fetchStatus` (string): A string to represent the current status of the fetch operation. It can be `loading`, `success`, or `error`.

## Extra Reducers
The slice uses extra reducers to handle the different states of the `fetchMovies` thunk action.

## Changes from Old to New Version

### Fetch Movies Thunk
- **Old:** The thunk only accepted `apiUrl` as a parameter.
- **New:** The thunk now accepts an object with `apiUrl` and `page` as parameters, allowing for pagination.

**Old:**
```javascript
export const fetchMovies = createAsyncThunk('fetch-movies', async (apiUrl) => {
    const response = await fetch(apiUrl)
    return response.json()
});
```
**New:**
```javascript
export const fetchMovies = createAsyncThunk('fetch-movies', async ({ apiUrl, page }) => {
  const response = await fetch(`${apiUrl}&page=${page}`);
  return response.json();
});

```

# Hooks
# useIntersectionObserver.js

## Purpose
The `useIntersectionObserver` hook is a custom React hook designed to monitor the intersection of a target element with an ancestor element or with a top-level document's viewport. This can be useful for implementing features such as infinite scrolling, lazy loading, or any other functionality that depends on an element's visibility in the viewport.

## Parameters
- `options` (object): An optional configuration object for the `IntersectionObserver`. This can include properties such as `root`, `rootMargin`, and `threshold` to specify the intersection observer's behavior.
- `dependencies` (array): An optional array of dependencies that, when changed, will reinitialize the intersection observer.

## Return Values
- `targetRef` (ref): A React ref to be attached to the target element that needs to be observed.
- `isIntersecting` (boolean): A state variable that indicates whether the target element is intersecting with the root element as specified by the options.

## Example Usage
Here's an example of how to use the `useIntersectionObserver` hook within a component:

```javascript
import React, { useEffect } from 'react';
import { useIntersectionObserver } from './hooks/useIntersectionObserver';

const InfiniteScrollComponent = () => {
    const [targetRef, isIntersecting] = useIntersectionObserver({ threshold: 1.0 });

    useEffect(() => {
        if (isIntersecting) {
            // Load more data or perform any other action
            console.log('Element is in view!');
        }
    }, [isIntersecting]);

    return (
        <div>
            <div style={{ height: '150vh' }}>Scroll down to see the target element.</div>
            <div ref={targetRef} style={{ height: '100px', background: 'lightblue' }}>
                Target Element
            </div>
        </div>
    );
};

export default InfiniteScrollComponent;
```
# `useDebounce` Hook

The `useDebounce` hook is a custom React hook that helps to delay the execution of a function until after a specified wait time has passed since the last time it was invoked. This is particularly useful for scenarios like search input fields where you want to reduce the number of function calls made during rapid user input.

## Usage

### Parameters

- `callback` (`function`): The function to be executed after the debounce delay.
- `delay` (`number`): The amount of time in milliseconds to wait before executing the callback function.

### Returns

- A debounced version of the `callback` function.

## Example

Here's an example of how to use the `useDebounce` hook within a component:

```javascript
import { MutableRefObject, useCallback, useRef } from 'react';

export function useDebounce(callback, delay) {
    const timer = useRef();

    return useCallback(
        (...args) => {
            if (timer.current) {
                clearTimeout(timer.current);
            }
            timer.current = setTimeout(() => {
                callback(...args);
            }, delay);
        },
        [callback, delay],
    );
}
```
