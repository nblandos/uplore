import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import SearchResults from "./pages/search/SearchResults";
import SignUpPage from "./pages/auth/signup/SignUpPage";
import LoginPage from "./pages/auth/login/LoginPage";

function App() {
  return (
    <div className="flex flex-col grow container mx-auto">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/search" element={<SearchResults />} />

        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </div>
  );
}

export default App;

//  TODO: fix header, add game pages, connect auth to backend
//  TODO: sort by relevance, add pagination and options + filters for search
