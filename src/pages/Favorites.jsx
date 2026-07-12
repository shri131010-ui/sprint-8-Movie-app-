import { useContext } from "react";
import { FavoriteContext } from "../context/FavoriteContext";
import MovieGrid from "../components/MovieGrid";

function Favorites() {

  const { favorites } = useContext(FavoriteContext);

  return (
    <div className="container">

      <h2>My Favorites</h2>

      {favorites.length === 0 ? (
        <p>No Favorite Movies</p>
      ) : (
        <MovieGrid movies={favorites} />
      )}

    </div>
  );
}

export default Favorites;