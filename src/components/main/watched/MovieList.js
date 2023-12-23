import React from 'react'

const MovieList = ({ watched, handleDeleteWatchMovie, handleSelectMovie }) => {
    return (
        <ul className="list list-movies">
            {watched.map((movie) => {

                return (<li key={movie.imdbID}
                    onClick={() => handleSelectMovie(movie.imdbID)}
                >
                    <div>
                        <img src={movie.Poster} alt={`${movie.Title} poster`} />
                        <h3>{movie.Title}</h3>
                        <div>
                            <p>
                                <span>⭐️</span>
                                <span>{movie.imdbRating}</span>
                            </p>
                            <p>
                                <span>🌟</span>
                                <span>{movie.userRating}</span>
                            </p>
                            <p>
                                <span>⏳</span>
                                <span>{movie.Runtime} </span>
                            </p>


                        </div>
                    </div>

                    <button className='btn-delete' onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteWatchMovie(movie.imdbID)
                    }}>❌</button>

                </li>)

            })}
        </ul >
    )
}

export default MovieList


{/* <li li key={movie.imdbID} >
                                <img src={movie.Poster} alt={`${movie.Title} poster`} />
                                <h3>{movie.Title}</h3>
                                <div>
                                    <p>
                                        <span>⭐️</span>
                                        <span>{movie.imdbRating}</span>
                                    </p>
                                    <p>
                                        <span>🌟</span>
                                        <span>{movie.userRating}</span>
                                    </p>
                                    <p>
                                        <span>⏳</span>
                                        <span>{movie.Runtime} </span>
                                    </p>
                                </div>
                            </li> */}