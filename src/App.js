import { useEffect, useState } from "react";
import NavBar from "./components/header/NavBar";
import Main from "./components/main/Main";
import Search from "./components/header/Search";
import NumResults from "./components/header/NumResults";
import ListBox from "./components/main/ListBox";
import MovieList from "./components/main/watched/MovieList";
import Summary from "./components/main/watched/Summary";
import Box from "./components/main/Box";
import StarRating from "./components/lib/StarRating";
import { useMovies } from "./components/hooks/useMovies";
import { useLocalWatched } from "./components/hooks/useLocalWatched";
import { useKey } from "./components/hooks/useKey";



const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

const API_KEY = "ef3b4e53";

export default function App() {
 
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);


  
  const [ watched , setWatched ] = useLocalWatched();
  const [ movies, numResult, loading, error ] = useMovies(query);

  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.Runtime));

  const handleSelectMovie = (movieId) =>
    setSelectedId((curId) => (curId === movieId ? null : movieId));

  const handleCloseMovieDetails = () => {
    setSelectedId(() => null);
    document.title = "usePopcorn";

  };

  const handleAddWatchedMovie = (movie) => {
    if (watched.length > 0) {
      const newArr = watched.filter((list) => {
        return list.imdbID !== movie.imdbID
      });

      setWatched(() => [...newArr, movie]);
    } else {
      setWatched((curValue) => [...curValue, movie]);
    }

    // localStorage.setItem("watched", JSON.stringify([...watched, movie]));

  }

  const handleDeleteWatchMovie = (movieId) => {
    setWatched((watched) => watched.filter((movie) => {
      return movie.imdbID !== movieId
    }))
  }

  

  
  return (
    <>
      <NavBar>
        <Search query={query} setQuery={setQuery} />

        <NumResults numResult={numResult} />
      </NavBar>

      <Main>

        <Box>
          {!loading && !error && movies.length <= 0 && <h2 className="loader">Search the movie by name...</h2>}
          {loading && <h2 className="loader">Loading...</h2>}
          {!loading && !error && (
            <ListBox movies={movies} handleSelectMovie={handleSelectMovie} />
          )}
          {error && <h2 className="loader">{error}</h2>}
        </Box>


        <Box>
          {selectedId ? (
            <MovieDetails
              selectedId={selectedId}
              handleCloseMovieDetails={handleCloseMovieDetails}
              handleAddWatchedMovie={handleAddWatchedMovie}
              watched={watched}
            />
          ) : (
            <>
              <Summary
                watched={watched}
                avgImdbRating={avgImdbRating}
                avgRuntime={avgRuntime}
                avgUserRating={avgUserRating}
              />
              <MovieList watched={watched} handleDeleteWatchMovie={handleDeleteWatchMovie}
                handleSelectMovie={handleSelectMovie} />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}

function MovieDetails({ selectedId, handleCloseMovieDetails, handleAddWatchedMovie, watched }) {
  const [loading, setLoading] = useState(false);
  const [movie, setMovie] = useState({});

  const [ratingState, setRatingState] = useState('');

  const isWatched = watched.map(list => list.imdbID).includes(selectedId);


  const watchedUserRating = watched.find(list => list.imdbID === movie.imdbID);


  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre
  } = movie;

  useEffect(() => {
    setLoading(true);
    async function getSelectedMovie() {
      const responce = await fetch(
        `https://www.omdbapi.com/?apikey=${API_KEY}&i=${selectedId}`
      );

      const data = await responce.json();

      setMovie(() => data);
      setLoading(false);
      document.title = "Movie: " + data.Title;

    }

    getSelectedMovie();
  }, [selectedId]);


  useKey( 'Escape', handleCloseMovieDetails);

  const handleRatingState = rating => {
    setRatingState(() => rating);
  }

  function handleAdd() {
    const movieWithUserRating = { ...movie, userRating: ratingState, Runtime: Number(runtime.split(' ')[0]) };
    handleAddWatchedMovie(movieWithUserRating);
    handleCloseMovieDetails();
  }

  const defaultRating = watchedUserRating ? watchedUserRating.userRating : '';


  return (
    <>
      {loading && <h2 className="loader">Loading.......</h2>}
      {!loading && (
        <div className="details" >
          <header>
            <button className="btn-back" onClick={handleCloseMovieDetails}>
              &larr;
            </button>
            <img src={poster} alt={`Poster of ${poster}`} />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p><span>⭐</span> {imdbRating} IMDB Rating</p>
            </div>
          </header>

          <section>
            <div className="rating">

              <>
                <StarRating
                  maxRating={10}
                  handleRatingState={handleRatingState}
                  size={24}
                  defaultRating={defaultRating}
                />
                {ratingState && <button className="btn-add" onClick={handleAdd}>+ Add to List</button>}
              </>



            </div>
            <p>
              <em>{plot}</em>
            </p>
            <p>Starring {actors}</p>
            <p>Directed by {director}</p>
          </section>

        </div>
      )}
    </>
  );
}


