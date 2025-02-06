import "./App.css";
import Search from "./components/Search";
import Spinner from "./components/Spinner";
import MovieCard from "./components/MovieCard";
import { MovieProps } from "./types/movie";
import { useEffect, useState } from "react";
import { API_BASE_URL, API_OPTIONS } from "./constants/api";

function App() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [movieList, setMovieList] = useState<MovieProps | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    fetchMovies();
  }, []);

  async function fetchMovies(): Promise<void> {
    setIsLoading(true);
    setErrorMessage("");

    try {
      const endpoint: string = `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;

      const response = await fetch(endpoint, API_OPTIONS);

      if (!response.ok) {
        throw new Error("Failed to fetch movies");
      }

      const data = await response.json();

      if (!data) {
        setErrorMessage(data.Error || "Failed to fetch movies");
        setMovieList(null);
        return;
      }

      setMovieList(data);
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

        <section className="all-movies">
          <h2 className="mt-[40px]">All movies</h2>

          {isLoading ? (
            <Spinner />
          ) : errorMessage ? (
            <p className="text-red-500">{errorMessage}</p>
          ) : movieList && movieList.results.length > 0 ? (
            <ul>
              {movieList &&
                movieList.results.map((movie) => <MovieCard movie={movie} />)}
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
