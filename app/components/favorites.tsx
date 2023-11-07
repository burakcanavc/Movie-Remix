import { Link } from "@remix-run/react";
import { useEffect, useState } from 'react';

export default function Favorites() {
  const [favoriFilmler, setFavoriFilmler] = useState([]);

  useEffect(() => {
    const favoriFilmlerFromLocalStorage = localStorage.getItem("favoriFilmler");
const favoriFilmler = favoriFilmlerFromLocalStorage ? JSON.parse(favoriFilmlerFromLocalStorage) : [];
setFavoriFilmler(favoriFilmler);
  }, []);

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 bg-black lg:grid-cols-4 mt-20">
      {favoriFilmler.map((movie: any) => (
        <div key={movie.id} className="bg-white rounded shadow p-4 hover:shadow-lg mt-2">
          <Link to={`/movie/${movie.id}`}>
            <img
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              alt={movie.title}
              className="w-full h-80 object-cover mx-auto rounded"
            />
            <h2 className="text-2xl font-bold mt-4 text-black">{movie.title.length > 25 ? `${movie.title.substring(0, 25)}...` : movie.title}</h2>
            <p className="text-gray-700 mb-2">
              {movie.overview.length > 100 ? `${movie.overview.substring(0, 100)}...` : movie.overview}
            </p>
            <p className="text-gray-700">Release Date: {movie.release_date}</p>
            <p className="text-gray-700">Popularity: {movie.popularity}</p>
          </Link>
        </div>
      ))}
    </div>
  );
}