
const ListBox = ({ movies, handleSelectMovie }) => {
    const img404URL = 'https://demofree.sirv.com/nope-not-here.jpg';
    
    return (
        
        <ul className="list list-movies">
            {movies?.map((movie) => {
            




                return (<li className='' key={movie.imdbID} onClick={() => handleSelectMovie(movie.imdbID)}>
                    <img
                        src={movie.Poster === 'N/A' ? img404URL : movie.Poster}
                        alt={`${movie.Title} 
                    poster`} />
                    <h3>{movie.Title}</h3>
                    <div>
                        <p>
                            <span>📆</span>
                            <span>{movie.Year}</span>
                        </p>
                    </div>
                </li>

                )

            })}
        </ul>
    )
}

export default ListBox