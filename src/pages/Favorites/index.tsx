import { useState, useEffect } from "react";
import CardNews from "../../components/CardNews";
import Modal from "../../components/Modal";
import { FilteredNews } from "../../types/appwrite";

interface FavoritesProps {
  className: string;
}

export default function Favorites({ className }: FavoritesProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedNews, setSelectedNews] = useState<FilteredNews | null>(null);
  const [favorites, setFavorites] = useState<FilteredNews[]>([]);

  useEffect(() => {
    const savedFavorites = localStorage.getItem("favorites");
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  function handleRemoveFavorite(newsItem: FilteredNews) {
    const updatedFavorites = favorites.filter((fav) => fav.id !== newsItem.id);
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  }

  function openModal(newsItem: FilteredNews) {
    setSelectedNews(newsItem);
    setIsModalOpen(true);
  }

  return (
    <div
      className={`${className} grid gap-12 place-items-center h-screen  w-screen grid-cols-[repeat(auto-fit,minmax(230px,1fr))] sm:!grid-cols-[repeat(auto-fit,minmax(400px,1fr))]`}
    >
      {favorites.length === 0 && (
        <p className="text-colorfontbutton">No favorites saved</p>
      )}

      {favorites.map((newsItem) => (
        <CardNews
          key={newsItem.id}
          title={newsItem.title}
          description={newsItem.description}
          image={newsItem.image}
          url={newsItem.url}
          content={newsItem.content}
          publishedAt={new Date(newsItem.publishedAt).toLocaleDateString("en")}
          onRemoveFavorite={() => handleRemoveFavorite(newsItem)}
          onReadMore={() => openModal(newsItem)}
        />
      ))}

      <Modal
        isOpen={isModalOpen}
        newsData={selectedNews || { title: "", content: "" }}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
