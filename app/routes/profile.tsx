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
