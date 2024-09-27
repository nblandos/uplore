import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

const GameSearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (searchQuery.trim() !== "") {
      navigate(`/search?query=${searchQuery}`);
      setSearchQuery("");
      window.scrollTo(0, 0);
      e.target.reset();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex-grow max-w-lg ml-4 sm:px-8">
      <div className="flex items-center px-3 rounded-full justify-between bg-gray-200 dark:bg-gray-800">
        <input
          className="w-full p-2 font-medium bg-transparent"
          placeholder="Search"
          type="search"
          value={searchQuery}
          onChange={handleChange}
        />
        <button className="p-2">
          <FaSearch />
        </button>
      </div>
    </form>
  );
};

export default GameSearchBar;
