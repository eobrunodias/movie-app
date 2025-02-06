import { API_BASE_IMAGE_URL } from "../../constants/api";
import { Results } from "../../types/movie";

export default function MovieCard({ movie }: { movie: Results }) {
  const { title, vote_average, poster_path, release_date, original_language } =
    movie;

  return (
    <div key={movie.id} className="movie-card">
      <img
        src={
          poster_path ? `${API_BASE_IMAGE_URL}${poster_path}` : "/no-movie.png"
        }
        alt="Movie Card"
      />
      <h3 className="mt-4">{title}</h3>
      <div className="content">
        <div className="rating">
          <img src="star.svg" alt="Star icon" />
          <p>{vote_average.toFixed(1)}</p>
        </div>

        <span>•</span>
        <span className="year">{original_language}</span>
        <span>•</span>
        <span className="lang">{release_date.split("-")[0]}</span>
      </div>
    </div>
  );
}
