import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import SearchResults from "./pages/search/SearchResults";
import SignUpPage from "./pages/auth/signup/SignUpPage";
import LoginPage from "./pages/auth/login/LoginPage";

function App() {
  return (
    <div className="flex max-w-6xl mx-auto">
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

//  TODO: fix header, add game pages, connect auth to backend, add game images to results page and improve styling of results page
//  TODO: improve search api to return only necessary data, sort by relevance, add pagination and options + filters for search
