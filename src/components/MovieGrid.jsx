import MovieCard from "./MovieCard";

function MovieGrid({ movies, lastMovieRef }) {
  return (
    <div className="movie-grid">
      {movies.map((movie, index) => {
        if (index === movies.length - 1) {
          return (
            <div ref={lastMovieRef} key={movie.id}>
              <MovieCard movie={movie} />
            </div>
          );
        }

        return (
          <MovieCard
            key={movie.id}
            movie={movie}
          />
        );
      })}
    </div>
  );
}

export default MovieGrid;