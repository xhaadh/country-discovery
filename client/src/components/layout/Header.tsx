import { FiGlobe,  } from "react-icons/fi";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-sm border-b border-gray-100 shadow-sm">
      <div className="container mx-auto px-4 py-4 max-w-7xl">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-3 group">
            <FiGlobe className="text-2xl text-blue-600 group-hover:text-blue-700 transition-colors" />
            <span className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
              World Explorer
            </span>
          </Link>

          <div className="flex items-center space-x-4">
            <Link
              to="/compare"
              className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              {/* <FiCompare className="text-lg" /> */}
              <span>Compare</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;