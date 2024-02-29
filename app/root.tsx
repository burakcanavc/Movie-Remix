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
  useLocation,
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
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";
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
              {isLoginPage ? (
                // Login sayfasındaysa bu SVG'yi göster
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path d="M14.5998 8.00033H21C22.1046 8.00033 23 8.89576 23 10.0003V12.1047C23 12.3659 22.9488 12.6246 22.8494 12.8662L19.755 20.3811C19.6007 20.7558 19.2355 21.0003 18.8303 21.0003H2C1.44772 21.0003 1 20.5526 1 20.0003V10.0003C1 9.44804 1.44772 9.00033 2 9.00033H5.48184C5.80677 9.00033 6.11143 8.84246 6.29881 8.57701L11.7522 0.851355C11.8947 0.649486 12.1633 0.581978 12.3843 0.692483L14.1984 1.59951C15.25 2.12534 15.7931 3.31292 15.5031 4.45235L14.5998 8.00033ZM7 10.5878V19.0003H18.1606L21 12.1047V10.0003H14.5998C13.2951 10.0003 12.3398 8.77128 12.6616 7.50691L13.5649 3.95894C13.6229 3.73105 13.5143 3.49353 13.3039 3.38837L12.6428 3.0578L7.93275 9.73038C7.68285 10.0844 7.36341 10.3746 7 10.5878ZM5 11.0003H3V19.0003H5V11.0003Z"></path>
                </svg>
              ) : (
                // Değilse bu SVG'yi göster
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
              )}
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
