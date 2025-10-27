"use client";

import { useState, useEffect } from "react";

export default function Navbar() {
  const [currentTime, setCurrentTime] = useState<string>("");
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeString = now.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
      setCurrentTime(timeString);
    };

    updateTime();

    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`sticky top-4 z-50 flex justify-between items-center mb-8 px-8 py-7 rounded-[11px] w-[calc(100%+2rem)] -mx-4 transition-all duration-300 ${
        isScrolled
          ? "bg-[#f2f2f2] shadow-[0_2px_8px_rgba(0,0,0,0.25)]"
          : "bg-[#f2f2f2] shadow-none"
      }`}
    >
      <div className="flex items-center">
        <h1 className="text-2xl text-[#333333] tracking-tight">
          <span className="font-extrabold">Better </span>
          <span className="font-black">Ethereum</span>
          <span className="font-extrabold"> DApp</span>
        </h1>
      </div>

      <div className="flex items-center space-x-4">
        <div className="text-sm font-medium text-[#333333]">{currentTime}</div>

        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#333333] hover:text-gray-600 transition-colors duration-200"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="hover:scale-110 transition-transform duration-200"
          >
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
          </svg>
        </a>
      </div>
    </nav>
  );
}
