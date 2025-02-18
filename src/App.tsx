import Sidebar from "./components/Sidebar";
import AppRoutes from "./AppRouter";
import { SearchProvider } from "./context/search/SearchProvider";
import { HashRouter } from "react-router-dom";

export default function App() {
  return (
    <SearchProvider>
      <main className="flex flex-1 h-screen overflow-hidden sm:flex-row flex-col">
        <Sidebar />
        <HashRouter>
          <AppRoutes />
        </HashRouter>
      </main>
    </SearchProvider>
  );
}
