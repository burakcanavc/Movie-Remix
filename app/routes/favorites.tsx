import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { Link, useLoaderData, useNavigate } from "@remix-run/react";
import { json } from "@remix-run/node";
import { useEffect } from "react";

export const meta: MetaFunction = () => {
  return [
    { title: "Favorites • Movie Remix" },
    { name: "description", content: "Favorite Movies" },
  ];
};

export default function Favorites() {
  const navigate = useNavigate();
  // Client tarafında mı çalıştığını kontrol etmek için
  const isClient = typeof window !== "undefined";

  // Sadece client tarafında çalışıyorsa localStorage'ı kullan
  const favorites = isClient
    ? JSON.parse(localStorage.getItem("favorites") || "[]")
    : [];

  const removeFromFavorites = (movieId: any) => {
    // Sadece client tarafında çalışıyorsa işlemleri gerçekleştir
    if (isClient) {
      const updatedFavorites = favorites.filter(
        (fav: any) => fav.id !== movieId
      );
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      console.log(`ID'si ${movieId} olan film favorilerden kaldırıldı.`);
      // Eğer Remix Data Loader kullanıyorsanız burada yerel durumu güncelleyebilir veya veriyi tekrar çekebilirsiniz.
      navigate("/favorites", { replace: true });
    }
  };

  return (
    <div
      className={`${
        favorites.length === 0 ? "min-h-screen bg-black" : "bg-black"
      }`}
    >
      <br />
      <br />
      <br />
      <br />
      {favorites.length > 0 && (
        <div className="grid grid-cols-1 gap-4 bg-black md:grid-cols-2 lg:grid-cols-4 ml-1">
          {favorites.map((movie: any) => (
            <div
              key={movie.id}
              className="bg-gray-900 rounded shadow p-4 hover:shadow-lg mt-2"
            >
              <Link to={`/movie/${movie.id}`}>
                <img
                  src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                  alt={movie.title}
                  className="w-full h-80 object-cover mx-auto rounded"
                />
                <h2 className="text-2xl font-bold mt-4 text-white">
                  {movie.title.length > 20
                    ? `${movie.title.substring(0, 20)}...`
                    : movie.title}
                </h2>
                <p className="text-gray-300 mb-2">
                  {movie.overview.length > 80
                    ? `${movie.overview.substring(0, 80)}...`
                    : movie.overview}
                </p>
                <p className="text-gray-500">
                  Release Date: {movie.release_date}
                </p>
                <p className="text-gray-500">Popularity: {movie.popularity}</p>
              </Link>
              <button
                className="bg-white text-gray-900 hover:text-white hover:bg-red-700 font-bold py-2 px-4 rounded mt-4 mx-auto"
                onClick={() => removeFromFavorites(movie.id)}
              >
                Remove from Favorites
              </button>
            </div>
          ))}
        </div>
      )}{" "}
      <br />
      <br />
    </div>
  );
}
