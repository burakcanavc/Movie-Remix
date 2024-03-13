import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { Form, Link, useLoaderData, useNavigate } from "@remix-run/react";
import { useEffect, useRef } from "react";

export const meta: MetaFunction = () => {
  return [
    { title: "Login • Movie Remix" },
    { name: "description", content: "Login" },
  ];
};

export default function Favorites() {
  const navigate = useNavigate();
  const emailInputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    emailInputRef.current?.focus();
  }, []);
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    if (!email) {
      alert("Email address is required.");
      return;
    }

    if (password.length < 6) {
      alert("Password must be at least 6 characters long.");
      return;
    }
    if (email === "burakcanavc@gmail.com" && password === "12345678") {
      navigate("/profile");
    } else {
      alert("Email or password is incorrect.");
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-950 bg-gradient-to-r from-black">
      <div className="px-8 py-6 mt-4 text-left bg-gray-900 bg-gradient-to-r from-gray-800 shadow-lg w-full max-w-lg rounded-lg">
        <h3 className="text-3xl font-bold text-center text-white">Log in</h3>
        <Form method="post" className="mt-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-white" htmlFor="email">
              Email
            </label>
            <input
              ref={emailInputRef}
              type="email"
              placeholder="Enter your email address"
              name="email"
              id="email"
              className="w-full px-4 py-2 mt-2 border rounded-md bg-gray-700 text-white"
            />
          </div>
          <div className="mt-4">
            <label className="block text-white" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              name="password"
              id="password"
              className="w-full px-4 py-2 mt-2 border rounded-md bg-gray-700 text-white"
            />
          </div>
          <div className="flex items-baseline justify-between mt-4">
            <button className="px-6 py-2 mt-4 bg-black bg-gradient-to-r from-gray-950 text-white rounded-lg text-lg hover:bg-gray-500">
              Log in
            </button>
            <Link
              to={"/login"}
              className="text-sm text-gray-400 hover:underline"
            >
              Forgot your password?
            </Link>
          </div>
        </Form>
      </div>
    </div>
  );
}
