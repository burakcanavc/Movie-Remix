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
  const isClient = typeof window !== "undefined";

  const favorites = isClient
    ? JSON.parse(localStorage.getItem("favorites") || "[]")
    : [];

  const removeFromFavorites = (movieId: any) => {
    if (isClient) {
      const updatedFavorites = favorites.filter(
        (fav: any) => fav.id !== movieId
      );
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      navigate("/favorites", { replace: true });
    }
  };

  return (
    <div className="min-h-screen bg-black">
      {" "}
      <br />
      <br />
      <br />
      <br />
      <div className="text-white font-bold">HELLOOOOOOOO</div>
    </div>
  );
}
