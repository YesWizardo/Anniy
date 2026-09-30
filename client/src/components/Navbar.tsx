import React, { useState } from "react";
import { RageLink } from "../rage/components/RageLink.js";
import { RageButton } from "../rage/components/RageButton.js";
import { useRage } from "../rage/RageProvider.js";
import { logoutUser } from "../lib/supabaseClient.js";
import { useNavigate } from "react-router-dom";

export const Navbar: React.FC = () => {
  const { currentUser, setCurrentUser } = useRage();
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/browse?q=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  const handleLogout = async () => {
    await logoutUser();
    setCurrentUser(null);
    navigate("/");
  };

  return (
    <header className="w-full bg-white border-b-4 border-black shadow-[0_4px_0px_#000] sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-4">
        {/* Brand Logo with 3 Mismatched Fonts */}
        <RageLink to="/" className="flex items-center gap-1.5 group select-none">
          <span className="text-3xl rotate-[-8deg] inline-block group-hover:rotate-12 transition-transform">
            📕
          </span>
          <div className="flex items-baseline">
            <span className="font-creepy text-3xl font-black text-rage-blood tracking-wider">
              READ
            </span>
            <span className="font-bubbly text-2xl font-black text-rage-pink drop-shadow-[2px_2px_0px_#000]">
              RAGE
            </span>
            <span className="font-pixel text-[9px] text-gray-500 ml-1.5 hidden sm:inline">
              .worst
            </span>
          </div>
        </RageLink>

        {/* Chaotic Search Bar */}
        <form onSubmit={handleSearch} className="flex-1 max-w-md hidden md:flex items-center gap-1">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search unavailable books..."
            className="w-full px-3 py-1.5 text-xs font-mono border-2 border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-rage-pink bg-rage-paper"
          />
          <RageButton type="submit" variant="secondary" className="!py-1.5 !px-3 text-xs">
            Search
          </RageButton>
        </form>

        {/* Navigation Links */}
        <nav className="flex items-center gap-3 sm:gap-5 text-xs font-bubbly">
          <RageLink
            to="/browse"
            className="hover:text-rage-blood transition-colors underline decoration-wavy decoration-rage-pink"
          >
            Catalog
          </RageLink>

          <RageLink
            to="/cart"
            className="hover:text-rage-blood transition-colors relative"
          >
            Cart 🛒
          </RageLink>

          <RageLink
            to="/support"
            className="hover:text-rage-blood transition-colors text-purple-700"
          >
            Support 🤖
          </RageLink>

          <RageLink
            to="/leaderboard"
            className="hover:text-rage-blood transition-colors text-yellow-700 font-pixel text-[10px]"
          >
            Rageboard 🏆
          </RageLink>

          {currentUser ? (
            <div className="flex items-center gap-2">
              <span className="font-mono text-[11px] text-gray-600 truncate max-w-[90px]">
                {currentUser.displayName}
              </span>
              <RageButton
                variant="ghost"
                onClick={handleLogout}
                className="!py-1 !px-2 !text-[10px]"
              >
                Exit
              </RageButton>
            </div>
          ) : (
            <RageLink
              to="/login"
              className="bg-rage-blood text-white px-3 py-1.5 rounded-lg border border-black shadow-[2px_2px_0px_#000] hover:bg-red-800"
            >
              Sign In
            </RageLink>
          )}
        </nav>
      </div>
    </header>
  );
};
