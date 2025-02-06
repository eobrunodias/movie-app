import "./App.css";
import Search from "./components/Search";
import Spinner from "./components/Spinner";
import MovieCard from "./components/MovieCard";
import { MovieProps } from "./types/movie";
import { API_OPTIONS } from "./constants/api";
import { useEffect, useState } from "react";

import { useDebounce } from "react-use";
import { getTrendingMovies, updateSearchCount } from "./api/appwrite";
import { getMovieEndpoint } from "./api/tmdb";
import { MetricsModel } from "./types/metrics-model";

function App() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [debounceSearchTerm, setDebounceSearchTerm] = useState<string>("");

  const [movieList, setMovieList] = useState<MovieProps | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [trendingMovies, setTrendingMovies] = useState<MetricsModel[]>();

  useDebounce(() => setDebounceSearchTerm(searchTerm), 500, [searchTerm]);

  useEffect(() => {
    fetchMovies(debounceSearchTerm);
  }, [debounceSearchTerm]);

  useEffect(() => {
    loadTrendingMovies();
  }, []);

  async function loadTrendingMovies() {
    try {
      const movies = await getTrendingMovies();

      setTrendingMovies(movies);
    } catch (error) {
      console.error(`Error fetching trending movies: ${error}`);
    }
  }

  async function fetchMovies(query: string = ""): Promise<void> {
    setIsLoading(true);
    setErrorMessage("");

    try {
      const response = await fetch(getMovieEndpoint(query), API_OPTIONS);

      if (!response.ok) {
        throw new Error("Failed to fetch movies");
      }

      const data = await response.json();

      if (!data) {
        setErrorMessage(data.Error || "Failed to fetch movies");
        setMovieList(null);
        return;
      }

      setTrendingMovies(await getTrendingMovies());

      setMovieList(data);

      if (query && data.results.length > 0) {
        await updateSearchCount(query, data.results[0]);
      }
    } catch (error) {
      // "Internal client view error"
      console.error(`Error fetching movies: ${error}`);
      // App error view
      setErrorMessage("Error fetching movies. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <div className="pattern"></div>

      <div className="wrapper">
        <header>
          <img src="/hero.png" alt="Hero Banner" />
          <h1>
            Find <span className="text-gradient">Movies</span> You'll Enjoy
            Without the Hassle
          </h1>
        </header>

        <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

        {trendingMovies && trendingMovies.length > 0 && (
          <section className="trending">
            <h2>Trending Movies</h2>
            <ul>
              {trendingMovies.map((movie, index) => (
                <li key={movie.$id}>
                  <p>{index + 1}</p>
                  {!movie.poster_path.endsWith("null") ? (
                    <img src={movie.poster_path} alt="trending" />
                  ) : (
                    <img src="/no-poster.png" alt="no poster movie" />
                  )}
                </li>
              ))}
            </ul>
          </section>
        )}

        <section className="all-movies">
          <h2 className="mt-[40px]">All movies</h2>

          {isLoading ? (
            <Spinner />
          ) : errorMessage ? (
            <p className="text-red-500">{errorMessage}</p>
          ) : movieList && movieList.results.length > 0 ? (
            <ul>
              {movieList &&
                movieList.results.map((movie) => (
                  <MovieCard key={movie.id} movie={movie} />
                ))}
            </ul>
          ) : (
            errorMessage
          )}
        </section>
      </div>
    </>
  );
}

export default App;
