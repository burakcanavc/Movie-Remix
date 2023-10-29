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
    'https://api.themoviedb.org/3/trending/movie/day?language=en-US&page=2',
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
  console.log(data);
  return ( 
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
    {data.results.map((movie: any) => (
      <div key={movie.id} className="bg-white rounded shadow p-4">
        <img
          src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
          alt={movie.title}
          className="max-w-full h-auto mx-auto"
        />
        <h2 className="text-xl font-bold mt-4">{movie.title}</h2>
        <p className="text-gray-700 mb-2">{movie.overview}</p>
        <p className="text-gray-700">Release Date: {movie.release_date}</p>
        <p className="text-gray-700">Popularity: {movie.popularity}</p>
        <p className="text-gray-700">Vote Count: {movie.vote_count}</p>
        <p className="text-gray-700">Vote Average: {movie.vote_average}</p>
      </div>
    ))}
  </div>
  );
}
