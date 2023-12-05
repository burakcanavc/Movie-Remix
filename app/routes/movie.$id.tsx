import { LoaderFunctionArgs, json , MetaFunction} from "@remix-run/node";
import { Link, Outlet, useLoaderData } from "@remix-run/react";

export const meta: MetaFunction = () => {

  return [
    { title: "Movie Title • Movie Remix" },
    { name: "description", content: "Favorite Movies" },
  ];
};

export async function loader({ params }: LoaderFunctionArgs) {
  const url = await fetch(
    `https://api.themoviedb.org/3/movie/${params.id}?language=en-US`,
    {
      headers: {
        accept: "application/json",
        Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMmJlZjRjMzgxODFjYzFhYWU3MWRjMGViYzljNmJhMyIsInN1YiI6IjY1MzdkOTQ0OTQ2MzE4MDExZDA5Y2UyNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.F26xaV_uxq-YKfjQuJodsRBnpkfoLWG-PjiDJA3Bb1k'
      },
    }
  );

  return json(await url.json());
}

export default function MovieId() {
  const data: any = useLoaderData();

  return (
    <div className="bg-black h-screen items-center justify-center"><br /><br /><br />
      <div className="flex items-center">
        <img
        src={`https://image.tmdb.org/t/p/original/${data.backdrop_path}`}
        alt=""
        className="w-auto h-80 mr-16 rounded-md mt-10 ml-16"
        />

        <div className="mr-36">
          <h1 className="text-2xl text-white font-bold mb-2">{data.title}</h1>
            <p className="text-white mb-2">{data.overview}</p>
            <br />
            <p className="text-white mb-2">Popularity: {data.popularity}</p>
            <p className="text-white mb-2">Release Date: {data.release_date}</p>
        </div>
      </div>
    </div>
  );
}