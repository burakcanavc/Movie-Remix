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
  NavLink,
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

function Layout() {
  const isLoggedIn = true;
  return (
    <nav className="flex items-center justify-between p-4 bg-black text-white fixed w-full">
      <div className="flex items-center">
        <Link to="/">
          <img
            src={logo}
            alt="Logo"
            className="w-48 h-auto mr-2 transition duration-300 transform hover:scale-110"
          />
        </Link>
      </div>
      <div className="flex items-center">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "bg-white text-black font-bold mr-4 rounded-sm px-6 py-2"
              : "font-bold mr-4 hover:text-black hover:bg-white rounded-sm px-6 py-2"
          }
        >
          HOME
        </NavLink>

        {isLoggedIn ? (
          <NavLink
            to="/favorites"
            className={({ isActive }) =>
              isActive
                ? "bg-white text-black font-bold mr-4 rounded-sm px-6 py-2"
                : "font-bold mr-4 hover:text-black hover:bg-white rounded-sm px-6 py-2"
            }
          >
            FAVORITES
          </NavLink>
        ) : (
          ""
        )}

        {isLoggedIn ? (
          <NavLink to="/login">
            <button className="font-bold mr-4 hover:bg-green-600 rounded-sm px-6 py-2">
              {/* Kullanıcı giriş yapmışsa gösterilecek simge */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
                />
              </svg>
            </button>
          </NavLink>
        ) : (
          <NavLink to="/">
            <button className="font-bold mr-4 hover:bg-red-600 rounded-sm px-6 py-2">
              {/* Kullanıcı giriş yapmamışsa gösterilecek simge */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
                />
              </svg>
            </button>
          </NavLink>
        )}
      </div>
    </nav>
  );
}
