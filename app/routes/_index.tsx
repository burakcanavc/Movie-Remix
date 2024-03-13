import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { useEffect, useState } from "react";

export const meta: MetaFunction = () => {
  return [
    { title: "Movie Remix" },
    { name: "description", content: "Welcome to Movie Remix!" },
  ];
};

export async function loader({}: LoaderFunctionArgs) {
  const url = await fetch(
    "https://api.themoviedb.org/3/trending/movie/day?language=en-US",
    {
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMmJlZjRjMzgxODFjYzFhYWU3MWRjMGViYzljNmJhMyIsInN1YiI6IjY1MzdkOTQ0OTQ2MzE4MDExZDA5Y2UyNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.F26xaV_uxq-YKfjQuJodsRBnpkfoLWG-PjiDJA3Bb1k",
      },
    }
  );
  return json(await url.json());
}

export default function Index() {
  const data: any = useLoaderData();
  const [favorites, setFavorites] = useState<MovieType[]>([]);

  interface MovieType {
    id: any;
    poster_path: any;
    title: any;
    overview: any;
    release_date: any;
    popularity: any;
  }

  useEffect(() => {
    const storedFavorites = localStorage.getItem("favorites");
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  const addToFavorites = (movie: any) => {
    const isAlreadyInFavorites = checkIfInFavorites(movie);

    if (!isAlreadyInFavorites) {
      const movieToAdd = {
        id: movie.id,
        poster_path: movie.poster_path,
        title: movie.title,
        overview: movie.overview,
        release_date: movie.release_date,
        popularity: movie.popularity,
      };

      setFavorites((prevFavorites) => [...prevFavorites, movieToAdd]);
      localStorage.setItem(
        "favorites",
        JSON.stringify([...favorites, movieToAdd])
      );
      console.log(`Movie with ID ${movie.id} added to favorites.`);
    } else {
      console.log(`Movie with ID ${movie.id} is already in favorites.`);
    }
  };

  const checkIfInFavorites = (movie: any) => {
    return favorites.some((fav: any) => fav.id === movie.id);
  };

  return (
    <div className="bg-black">
      <br />
      <br />
      <br />
      <br />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 ml-1">
        {data.results.map((movie: any) => (
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
              className={`
            ${
              checkIfInFavorites(movie)
                ? "bg-blue-900 text-white pointer-events-none font-bold py-2 px-4 rounded mt-4 mx-auto"
                : "bg-white text-gray-900 hover:text-white hover:bg-blue-900 font-bold py-2 px-4 rounded mt-4 mx-auto"
            } `}
              onClick={() => addToFavorites(movie)}
            >
              {checkIfInFavorites(movie)
                ? "Added to Favorites"
                : "Add to Favorites"}
            </button>
          </div>
        ))}
        <br />
      </div>
    </div>
  );
}
