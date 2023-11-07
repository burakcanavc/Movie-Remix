import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/node"

export const meta: MetaFunction = () => {
  return [
    { title: "Movie Remix" },
    { name: "description", content: "Welcome to Movie Remix!" },
  ];
};

export async function loader({}: LoaderFunctionArgs) {
  const url = await fetch(
    'https://api.themoviedb.org/3/trending/movie/day?language=en-US',
    {
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMmJlZjRjMzgxODFjYzFhYWU3MWRjMGViYzljNmJhMyIsInN1YiI6IjY1MzdkOTQ0OTQ2MzE4MDExZDA5Y2UyNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.F26xaV_uxq-YKfjQuJodsRBnpkfoLWG-PjiDJA3Bb1k'
      },
    }
  );
  return json(await url.json());
}

export default function Index() {
  const data: any = useLoaderData();

  const addToFavorites = (movieId: any) => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');

    if (!favorites.includes(movieId)) {
      favorites.push(movieId);
      localStorage.setItem('favorites', JSON.stringify(favorites));
      console.log(`Movie with ID ${movieId} added to favorites.`);
    } else {
      console.log(`Movie with ID ${movieId} is already in favorites.`);
    }
  };

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 bg-black lg:grid-cols-4 mt-20">
      {data.results.map((movie: any) => (
        <div key={movie.id} className="bg-gray-900 rounded shadow p-4 hover:shadow-lg mt-2">
          <Link to={`/movie/${movie.id}`}>
            <img
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              alt={movie.title}
              className="w-full h-80 object-cover mx-auto rounded"
            />
            <h2 className="text-2xl font-bold mt-4 text-white">{movie.title.length > 25 ? `${movie.title.substring(0, 25)}...` : movie.title}</h2>
            <p className="text-gray-300 mb-2">
              {movie.overview.length > 100
                ? `${movie.overview.substring(0, 100)}...`
                : movie.overview}
            </p>
            <p className="text-gray-500">Release Date: {movie.release_date}</p>
            <p className="text-gray-500">Popularity: {movie.popularity}</p>
          </Link>
          <button
            className="bg-white text-gray-900 hover:text-white hover:bg-red-500 font-bold py-2 px-4 rounded mt-4 mx-auto"
            onClick={() => addToFavorites(movie.id)}
          >
            Add to Favorites
          </button>
        </div>
      ))}
      <br />
    </div>
  );
}
