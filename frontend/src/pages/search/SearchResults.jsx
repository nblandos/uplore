import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import Navbar from "../../components/common/Navbar";

const SearchResults = () => {
  const [gameResults, setGameResults] = useState([]);
  const location = useLocation();
  const searchQuery = new URLSearchParams(location.search).get("query");

  useEffect(() => {
    const fetchGameData = async () => {
      try {
        console.log(import.meta.env.VITE_API_BASE_URL);
        const response = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/api/auth/games/search?query=${searchQuery}`,
        );
        const data = await response.json();
        setGameResults(data);
      } catch (error) {
        console.error("Error fetching game data:", error);
      }
    };

    fetchGameData();
  }, [searchQuery]);

  return (
    <div>
      <Navbar />
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-4">
          Search Results for &quot;{searchQuery}&quot;
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {gameResults.map((game) => (
            <Link
              to={`/game/${game.id}`}
              key={game.id}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div className="p-4">
                <h2 className="text-lg font-bold">{game.name}</h2>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchResults;
