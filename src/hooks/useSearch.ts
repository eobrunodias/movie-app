import { useContext } from "react";
import { SearchContext } from "../context/search/SearchContext";

export function useSearch() {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("useSearch deve ser usado dentro de um SearchProvider");
  }
  return context;
}
