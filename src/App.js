import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import MovieList from "./Components/MovieList";
import Header from "./Components/Header";
import SearchBox from "./Components/SearchBox";
import AddFavourite from "./Components/AddFavourite";

import "./App.css";
function App() {
  const [movies, setMovies] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [favorite, setFavourite] = useState([]);
  const getMovieReq = async () => {
    const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=279c9150`;
    const response = await fetch(url);
    const responseJson = await response.json();

    if (responseJson.Search) {
      setMovies(responseJson.Search);
    }
  };

  function addFavouriteMovie(movie) {
    const newfavorite = [...favorite, movie];
    setFavourite(newfavorite);
  }

  useEffect(
    function () {
      getMovieReq();
      console.log(movies);
    },
    [searchValue]
  );

  return (
    <div className="container-fluid movie-app">
      <div className="row d-flex align-items-center mt-4 mb-4">
        <Header title="Movies"></Header>
        <SearchBox
          searchValue={searchValue}
          setSearchValue={setSearchValue}
        ></SearchBox>
      </div>
      <div className="row">
        <MovieList
          movies={movies}
          favoriteComponent={AddFavourite}
          handleFavouritesClick={addFavouriteMovie}
        ></MovieList>
      </div>
      <div className="row d-flex align-items-center mt-4 mb-4">
        <Header title="Favorites"></Header>
      </div>
      <div className="row">
        <MovieList
          movies={favorite}
          favoriteComponent={AddFavourite}
        ></MovieList>
      </div>
    </div>
  );
}

export default App;

// api -> http://www.omdbapi.com/?i=tt3896198&apikey=279c9150
