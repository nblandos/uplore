import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import UploreLogoSvg from "../../components/svgs/UploreLogo";
import UploreHeaderSvg from "../../components/svgs/UploreHeader";

const Navbar = () => {
  return (
    <nav className="fixed top-0 inset-x-0 h-16 border-b border-gray-700 py-2 z-10 bg-base-100">
      <div className="container mx-auto h-full flex justify-between items-center gap-2">
        <Link to="/" className="flex gap-1 items-center">
          <UploreLogoSvg className="w-12 h-12 fill-black dark:fill-white" />
          <UploreHeaderSvg className="h-12 w-36 hidden md:block fill-black dark:fill-white" />
        </Link>

        <SearchBar />

        {/* only if not logged in */}
        <div className="flex gap-2">
          <Link to="/login" className="btn">
            Login
          </Link>
          <Link to="/signup" className="btn">
            Sign Up
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
