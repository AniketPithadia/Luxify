import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { FaSearch } from "react-icons/fa";
const Header = () => {
  return (
    <header className="bg-slate-200">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to="/">
          <div className="LogoContainer">
            <img src={logo} alt="Logo" />
          </div>
        </Link>
        <form className="flex items-center bg-slate-100 p-3 rounded-lg">
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent  outline-none border-none w-24 sm:w-64"
          />
          <FaSearch size={17} />
        </form>
        <ul className="flex gap-4">
          <Link to="/">
            <li className="hidden sm:inline text-slate-700  hover:underline">
              Home
            </li>
          </Link>
          <Link to="/about">
            <li className="hidden sm:inline text-slate-700 hover:underline">
              About
            </li>
          </Link>
          <Link to="/sign-in">
            <li className=" text-slate-700 hover:underline">Sign In</li>
          </Link>
        </ul>
      </div>
    </header>
  );
};

export default Header;
