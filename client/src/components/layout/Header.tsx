import { FiGlobe } from "react-icons/fi";
import { Link, NavLink } from "react-router-dom";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 bg-white/70 backdrop-blur-md supports-[backdrop-filter]:bg-white/60">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="group inline-flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-gray-700 text-white shadow-md transition-transform group-hover:-rotate-6">
              <FiGlobe />
            </span>
            <span className="text-xl font-bold tracking-tight text-gray-900 transition-colors">
              World Explorer
            </span>
          </Link>

          <nav className="flex items-center gap-2">
            <NavLink
              to="/compare"
              className={({ isActive }) => `inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition-all shadow-sm border ${
                isActive
                  ? "bg-gray-700 text-white border-transparent"
                  : "bg-white text-gray-700 hover:text-gray-900 hover:border-gray-300 border-gray-200"
              }`}
            >
              <span>Compare</span>
            </NavLink>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;