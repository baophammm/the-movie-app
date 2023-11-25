import React, { createContext, useReducer, useEffect } from 'react';

const initialState = {
  watchlist: localStorage.getItem('watchlist')
    ? JSON.parse(localStorage.getItem('watchlist'))
    : [],
  watched: localStorage.getItem('watched')
    ? JSON.parse(localStorage.getItem('watched'))
    : [],
};

const ADD_MOVIE_TO_WATCHLIST = 'ADD_MOVIE_TO_WATCHLIST';
const REMOVE_MOVIE_FROM_WATCHLIST = 'REMOVE_MOVIE_FROM_WATCHLIST';
const ADD_MOVIE_TO_WATCHED = 'ADD_MOVIE_TO_WATCHED';
const MOVE_MOVIE_TO_WATCHLIST = 'MOVE_MOVIE_TO_WATCHLIST';
const REMOVE_MOVIE_FROM_WATCHED = 'REMOVE_MOVIE_FROM_WATCHED';

const reducer = (state, action) => {
  switch (action.type) {
    case ADD_MOVIE_TO_WATCHLIST:
      return {
        ...state,
        watchlist: [action.payload, ...state.watchlist],
      };

    case REMOVE_MOVIE_FROM_WATCHLIST:
      return {
        ...state,
        watchlist: state.watchlist.filter(movie => movie.id !== action.payload),
      };
    case ADD_MOVIE_TO_WATCHED:
      return {
        ...state,
        watchlist: state.watchlist.filter(
          movie => movie.id !== action.payload.id
        ),
        watched: [action.payload, ...state.watched],
      };
    case MOVE_MOVIE_TO_WATCHLIST:
      return {
        ...state,
        watched: state.watched.filter(movie => movie.id !== action.payload.id),
        watchlist: [action.payload, ...state.watchlist],
      };
    case REMOVE_MOVIE_FROM_WATCHED:
      return {
        ...state,
        watched: state.watched.filter(movie => movie.id !== action.payload),
      };

    default:
      return state;
  }
};

const GlobalContext = createContext({ ...initialState });

function GlobalProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    localStorage.setItem('watchlist', JSON.stringify(state.watchlist));
    localStorage.setItem('watched', JSON.stringify(state.watched));
  }, [state]);

  const addMovieToWatchlist = movie => {
    dispatch({ type: ADD_MOVIE_TO_WATCHLIST, payload: movie });
  };

  const removeMovieFromWatchlist = id => {
    dispatch({ type: REMOVE_MOVIE_FROM_WATCHLIST, payload: id });
  };

  const addMovieToWatched = movie => {
    dispatch({ type: ADD_MOVIE_TO_WATCHED, payload: movie });
  };

  const moveMovieToWatchlist = movie => {
    dispatch({ type: MOVE_MOVIE_TO_WATCHLIST, payload: movie });
  };

  const removeMovieFromWatched = id => {
    dispatch({ type: REMOVE_MOVIE_FROM_WATCHED, payload: id });
  };

  return (
    <GlobalContext.Provider
      value={{
        watchlist: state.watchlist,
        watched: state.watched,
        addMovieToWatchlist,
        removeMovieFromWatchlist,
        addMovieToWatched,
        moveMovieToWatchlist,
        removeMovieFromWatched,
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
}

export { GlobalContext, GlobalProvider };
