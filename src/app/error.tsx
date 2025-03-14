"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function ErrorPage() {
  const [timeLeft, setTimeLeft] = useState(15);
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
      setProgress((prev) => (prev > 0 ? prev - 100 / 15 : 0));
    }, 1000);

    const autoReload = setTimeout(() => {
      window.location.reload();
    }, 15000);

    return () => {
      clearInterval(interval);
      clearTimeout(autoReload);
    };
  }, []);

  const handleReload = () => {
    window.location.reload();
  };

  return (
    <div className="flex flex-col p-5 items-center justify-center min-h-full bg-gray-100 relative">
      <div className="absolute top-0 left-0 w-full h-2 bg-gray-300">
        <div
          className="h-full bg-gray-600 transition-all"
          style={{ width: `${progress}%` }}
        />
      </div>

      <h1 className="text-6xl font-bold text-[#666]">Oops!</h1>
      <p className="text-xl text-gray-700 mt-4 mb-6">
        Sorry, something went wrong. Page will reload in {timeLeft} seconds.
      </p>

      <div className="flex flex-col md:flex-row gap-4">
        <button
          onClick={handleReload}
          className="px-6 py-3 text-white bg-[#555] rounded hover:bg-[#666] transition duration-200"
        >
          Reload Now
        </button>

        <Link
          href="/"
          className="px-6 py-3 text-white bg-[#666] rounded hover:bg-[#777] transition duration-200"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
}
