import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import Trending from "./pages/Trending";
import Sidebar from "./components/Sidebar";

export default function App() {
  return (
    <div className="h-screen">
      <main className="flex flex-1 h-screen overflow-hidden sm:flex-row flex-col">
        <Sidebar />
        <Routes>
          <Route
            path="/"
            element={
              <Home className="px-[50px] overflow-y-auto pt-[24px] mb-[24px]" />
            }
          />
          <Route path="/favorites" element={<Favorites />}></Route>
          <Route path="/trending" element={<Trending />}></Route>
        </Routes>
      </main>
    </div>
  );
}
