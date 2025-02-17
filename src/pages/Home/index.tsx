import { useEffect, useState } from "react";
import Modal from "../../components/Modal";
import CardNews from "../../components/CardNews";
import {
  getNews,
  saveNews,
  updateNews,
} from "../../data/services/appwrite/collections/articles";
import { fetchNews } from "../../data/api/axios";
import { checkDate } from "../../utils/checkDate";
import { FilteredNews } from "../../types/appwrite";
import {
  getNewsConfig,
  updateNewsConfig,
} from "../../data/services/appwrite/collections/config";
import Spinner from "../../components/Spinner";
import { useSearch } from "../../hooks/useSearch";

interface HomeProps {
  className: string;
}

export default function Home({ className }: HomeProps) {
  const [news, setNews] = useState<FilteredNews[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedNews, setSelectedNews] = useState<FilteredNews | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [newsSearched, setNewsSearched] = useState<FilteredNews[]>([]);
  const { searchTerm } = useSearch();

  async function handleSearch(query: string) {
    const data = localStorage.getItem("storedNews");

    if (data) {
      const dataParsed: FilteredNews[] = JSON.parse(data);

      if (query === "") return;

      const filteredNews = dataParsed.filter(
        (news) =>
          news.title.toLowerCase().includes(query.toLowerCase()) ||
          news.description.toLowerCase().includes(query.toLowerCase())
      );

      if (filteredNews.length > 0) {
        setNewsSearched(filteredNews);
        return;
      } else {
        setNewsSearched([]);
        return;
      }
    }

    return;
  }

  useEffect(() => {
    handleSearch(searchTerm);
  }, [searchTerm]);

  function handleRemoveFavorite(newsItem: FilteredNews) {
    const favorites = localStorage.getItem("favorites");

    if (favorites) {
      const favoritesParsed = JSON.parse(favorites);
      const updatedFavorites = favoritesParsed.filter(
        (fav: FilteredNews) => fav.id !== newsItem.id
      );

      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    }
  }

  async function handleNewsData() {
    const storedNews = localStorage.getItem("storedNews");
    const dataStorage: FilteredNews[] = storedNews
      ? JSON.parse(storedNews)
      : [];

    const config = await getNewsConfig();

    const lastUpdated = config?.lastUpdated;

    const dataNews = await fetchNews();
    console.log(dataNews);
    if (dataStorage.length < 10) {
      const newsData = await getNews();

      if (newsData) {
        localStorage.setItem("storedNews", JSON.stringify(newsData));
        setNews(newsData);
        setLoading(false);
      }
    } else if (
      dataStorage.length < 20 &&
      (!lastUpdated || checkDate(lastUpdated))
    ) {
      const dataNews = await fetchNews();

      if (dataNews) {
        await saveNews(dataNews);
        const newsData = await getNews();

        if (newsData) {
          const uniqueNews = newsData.filter(
            (newsItem) =>
              !dataStorage.some((storedItem) => storedItem.id === newsItem.id)
          );

          const finalNews = [...dataStorage, ...uniqueNews].slice(0, 20);

          localStorage.setItem("storedNews", JSON.stringify(finalNews));

          await updateNewsConfig();

          setNews(finalNews);
          setLoading(false);
        }
      }
    } else {
      if (!lastUpdated || checkDate(lastUpdated)) {
        const dataNews = await fetchNews();

        if (dataNews) {
          const existingNews = await getNews();
          const existingTitles = existingNews.map((news) => news.title);

          dataStorage.sort(
            (a, b) =>
              new Date(a.publishedAt).getTime() -
              new Date(b.publishedAt).getTime()
          );
          const newsToUpdate = dataStorage
            .slice(0, 10)
            .filter((newsItem) => existingTitles.includes(newsItem.title));

          await updateNews(newsToUpdate, dataNews);

          const updatedNews = await getNews();

          if (updatedNews) {
            const finalNews = updatedNews.slice(0, 20);
            localStorage.setItem("storedNews", JSON.stringify(finalNews));
            await updateNewsConfig();
            setNews(finalNews);
            setLoading(false);
          }
        }
      } else {
        setNews(dataStorage);
        setLoading(false);
      }
    }
  }

  useEffect(() => {
    setLoading(true);
    handleNewsData();
  }, []);

  function openModal(newsItem: FilteredNews) {
    setSelectedNews(newsItem);
    setIsModalOpen(true);
  }

  return (
    <div className="relative w-screen overflow-hidden">
      <div
        className={`${className} ${
          loading || isModalOpen || searchTerm
            ? "overflow-auto h-screen"
            : "animate-scroll !overflow-hidden"
        }  grid gap-12 place-items-center grid-cols-[repeat(auto-fit,minmax(230px,1fr))] sm:grid-cols-[repeat(auto-fit,minmax(400px,4fr))]`}
      >
        {searchTerm ? (
          newsSearched.map((newsItem) => (
            <CardNews
              key={newsItem.id}
              title={newsItem.title}
              description={newsItem.description}
              content={newsItem.content}
              url={newsItem.url}
              image={newsItem.image}
              publishedAt={new Date(newsItem.publishedAt).toLocaleDateString(
                "en"
              )}
              onRemoveFavorite={() => handleRemoveFavorite(newsItem)}
              onReadMore={() => openModal(newsItem)}
            />
          ))
        ) : loading ? (
          <div className="flex items-center justify-center h-screen w-screen">
            <Spinner />
          </div>
        ) : (
          <>
            {news.map((newsItem) => (
              <CardNews
                key={newsItem.id}
                title={newsItem.title}
                description={newsItem.description}
                content={newsItem.content}
                url={newsItem.url}
                image={newsItem.image}
                publishedAt={new Date(newsItem.publishedAt).toLocaleDateString(
                  "en"
                )}
                onRemoveFavorite={() => handleRemoveFavorite(newsItem)}
                onReadMore={() => openModal(newsItem)}
              />
            ))}
          </>
        )}
      </div>

      <Modal
        isOpen={isModalOpen}
        newsData={selectedNews || { title: "", content: "" }}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
