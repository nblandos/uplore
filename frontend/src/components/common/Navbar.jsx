import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import UploreLogoSvg from "../../components/svgs/UploreLogo";
import UploreHeaderSvg from "../../components/svgs/UploreHeader";

const Navbar = () => {
  return (
    <nav className="fixed top-0 inset-x-0 h-fit border-b border-gray-700 py-2">
      <div className="max-w-7xl h-full flex justify-between items-center gap-2 w-full">
        <Link to="/" className="flex gap-1 items-center pl-4">
          <UploreLogoSvg className="w-12 h-12 fill-black dark:fill-white" />
          <UploreHeaderSvg className="h-12 w-36 hidden md:block fill-black dark:fill-white" />
        </Link>
        <SearchBar />
      </div>
    </nav>
  );
};

export default Navbar;
