import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/node"

export const meta: MetaFunction = () => {
  return [
    { title: "Favorites • Movie Remix" },
    { name: "description", content: "Favorite Movies" },
  ];
};

export default function Favorites() {
  return (
    <div className="h-screen bg-black">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 mt-20">
        
          <div className="bg-white rounded shadow p-4 hover:shadow-lg mt-2">
            <Link to={`/movie/`}>
              <img
                src={`https://image.tmdb.org/t/p/w500/`}
                alt=""
                className="w-full h-80 object-cover mx-auto rounded"
              />
              <h2 className="text-2xl font-bold mt-4 text-black"></h2>
              <p className="text-gray-700 mb-2"></p>
              <p className="text-gray-700">Release Date: </p>
              <p className="text-gray-700">Popularity: </p>
            </Link>
            <button className="bg-gray-900 hover:bg-black text-white font-bold py-2 px-4 rounded mt-4 mx-auto">
              Add to Favorites
            </button>
          </div>
      </div>
    </div>
  );
}