import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import CoverImage from "../../components/common/CoverImage";
import Navbar from "../../components/common/Navbar";

const SearchResults = () => {
  const [gameResults, setGameResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const searchQuery = new URLSearchParams(location.search).get("query");

  useEffect(() => {
    const fetchGameData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_BASE_URL}/api/auth/games/search?query=${searchQuery}`,
        );
        const data = await response.json();
        setGameResults(data);
      } catch (error) {
        console.error("Error fetching game data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGameData();
  }, [searchQuery]);

  return (
    <div>
      <Navbar />
      <div className="px-12 py-6 flex justify-center mt-16">
        {isLoading ? (
          <LoadingSpinner />
        ) : gameResults.length === 0 ? (
          <h1 className="text-xl text-center font-bold">
            No search results found
          </h1>
        ) : (
          <div className="grid grid-cols-3 sm:grid-cols-4 xl:grid-cols-5 gap-y-5 gap-x-4">
            {gameResults.map((game) => (
              <Link to={`/game/${game.id}`} key={game.id}>
                <figure>
                  <CoverImage
                    imageId={game.cover.image_id}
                    gameName={game.name}
                  />
                  <figcaption className="mt-1 text-sm sm:text-base font-bold text-center line-clamp-3">
                    {game.name}
                  </figcaption>
                </figure>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResults;
