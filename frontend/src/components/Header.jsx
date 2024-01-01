import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import logo from "../assets/logo.png";
import { FaSearch } from "react-icons/fa";
import { useMediaQuery } from "react-responsive";
import { useSelector } from "react-redux";
import mobileLogo from "../assets/mobileLogo.png";
import MyDropDown from "./MyDropDown";
const Header = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState("");
  const windowSize = useMediaQuery({ query: "(min-width: 600px)" });

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("searchTerm", searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  return (
    <header className="fixed top-0 z-50 w-full text-[#22333c]  bgLightBrown ">
      <div className="flex justify-between gap-2 items-center max-w-6xl mx-auto py-3 px-4 z-50 ">
        <Link to="/">
          <div className="LogoContainer">
            {windowSize ? (
              <img src={logo} alt="Logo" />
            ) : (
              <img src={mobileLogo} alt="mobileLogo" />
            )}
          </div>
        </Link>
        <form
          onSubmit={handleSubmit}
          className="flex items-center bg-slate-100 p-3 me-12 rounded-lg awesomeForm"
        >
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-transparent  outline-none border-none w-24 sm:w-64 "
          />
          <button type="submit">
            <FaSearch size={17} />
          </button>
        </form>
        <ul className="flex gap-4 justify-center items-center ">
          <Link
            to="/"
            className="hidden sm:inline hover:scale-110 transition-transform duration-200 hover:text-[#376079]"
          >
            <li>Home</li>
          </Link>
          {currentUser ? (
            <MyDropDown currentUser={currentUser} />
          ) : (
            <li>
              <Link to="/sign-in">Sign In</Link>
            </li>
          )}
        </ul>
      </div>
    </header>
  );
};

export default Header;
