import { useEffect, useState } from "react";
import { fetchPopularMovies, searchMovies } from "../services/tmdb";
import SearchBar from "../components/SearchBar";
import MovieGrid from "../components/MovieGrid";
import Loader from "../components/Loader";
import useDebounce from "../hooks/useDebounce";
import useInfiniteScroll from "../hooks/useInfiniteScroll";

function Home() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const debouncedSearch = useDebounce(search, 500);

  // Load popular movies
  useEffect(() => {
    if (debouncedSearch.trim() === "") {
      loadMovies(page);
    }
  }, [page]);

  // Search movies
  useEffect(() => {
    if (debouncedSearch.trim() === "") {
      setPage(1);
      loadMovies(1);
    } else {
      searchMovie();
    }
  }, [debouncedSearch]);

  async function loadMovies(pageNo) {
    try {
      setLoading(true);

      const data = await fetchPopularMovies(pageNo);

      if (pageNo === 1) {
        setMovies(data.results);
      } else {
        setMovies((prev) => [...prev, ...data.results]);
      }

    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  async function searchMovie() {
    try {
      setLoading(true);

      const data = await searchMovies(debouncedSearch);

      setMovies(data.results);

    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  const lastMovieRef = useInfiniteScroll(() => {
    if (!loading && debouncedSearch.trim() === "") {
      setPage((prev) => prev + 1);
    }
  });

  return (
    <div className="container">
      <SearchBar
        search={search}
        setSearch={setSearch}
      />

      {loading && page === 1 ? (
        <Loader />
      ) : (
        <>
          <MovieGrid
            movies={movies}
            lastMovieRef={lastMovieRef}
          />

          {loading && <Loader />}
        </>
      )}
    </div>
  );
}

export default Home;