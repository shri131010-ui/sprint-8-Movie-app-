import { useContext } from "react";
import { FavoriteContext } from "../context/FavoriteContext";
import { FaHeart } from "react-icons/fa";
import { imageUrl } from "../services/tmdb";

function MovieCard({ movie }) {
  const { toggleFavorite, isFavorite } = useContext(FavoriteContext);

  return (
    <div className="movie-card">
      <img
        src={`${imageUrl}${movie.poster_path}`}
        alt={movie.title}
      />

      <div className="movie-info">
        <h3>{movie.title}</h3>

        <p>{movie.release_date?.slice(0, 4)}</p>

        <p>⭐ {movie.vote_average}</p>

        <button onClick={() => toggleFavorite(movie)}>
          <FaHeart
            color={isFavorite(movie.id) ? "red" : "gray"}
          />
        </button>
      </div>
    </div>
  );
}

export default MovieCard;