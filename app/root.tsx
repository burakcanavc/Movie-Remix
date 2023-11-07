import { cssBundleHref } from "@remix-run/css-bundle";
import type { LinksFunction } from "@remix-run/node";
import {
  Links,
  Link,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

import stylesheet from "~/tailwind.css";
import logo from "public/logo.png";
export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet },
];

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Layout />
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

function Layout(){
  return(
    <nav className="flex items-center justify-between p-4 bg-black text-white fixed w-full top-0">
    <div className="flex items-center">
    <Link to="/">
      <img src={logo} alt="Logo" className="w-48 h-auto mr-2 transition duration-300 transform hover:scale-110" />
    </Link>
    </div>
    <div className="flex items-center">
      <Link to="/" className="font-bold mr-12 hover:text-black hover:bg-white rounded-md px-6 py-2">
        HOME
      </Link>
      <Link to="/favoritesPage" className="font-bold mr-12 hover:text-black hover:bg-white rounded-md px-6 py-2">FAVORITES</Link>
    </div>
  </nav>
  );
}