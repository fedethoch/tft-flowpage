import { NavLink } from "react-router-dom";

const linkBase = "px-3 py-2 rounded-xl text-sm font-semibold transition border";
const linkInactive =
  "border-white/10 text-white/80 hover:text-white hover:border-white/20 hover:bg-white/5";
const linkActive = "border-white/20 text-white bg-white/10";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/40 backdrop-blur">
      <div className="mx-auto max-w-6xl px-3 sm:px-4 py-3 flex flex-wrap items-center justify-between gap-2">
        <div className="font-extrabold tracking-tight">
          TFT <span className="text-white/60">Flow</span>
        </div>

        <nav className="flex gap-2">
          <NavLink
            to="/flow"
            className={({ isActive }) =>
              `${linkBase} ${isActive ? linkActive : linkInactive}`
            }
          >
            Flowchart
          </NavLink>

          <NavLink
            to="/tierlist"
            className={({ isActive }) =>
              `${linkBase} ${isActive ? linkActive : linkInactive}`
            }
          >
            Tier List
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
