import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import Trending from "./pages/Trending";

export default function AppRoutes() {
  return (
    <Routes>
      <Route
        path="/"
        element={<Home className="px-[50px] overflow-y-auto py-[24px]" />}
      />
      <Route
        path="/favorites"
        element={<Favorites className="px-[50px] overflow-y-auto py-[24px]" />}
      ></Route>
      <Route
        path="/trending"
        element={<Trending className="px-[50px] overflow-y-auto py-[24px]" />}
      ></Route>
    </Routes>
  );
}
