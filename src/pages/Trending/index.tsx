import { useEffect, useState } from "react";
import { FilteredNews } from "../../types/appwrite";
import CardNews from "../../components/CardNews";
import Modal from "../../components/Modal";
import { getTrending } from "../../data/services/appwrite/collections/trending";
import Spinner from "../../components/Spinner";

interface TrendingProps {
  className: string;
}

export default function Trending({ className }: TrendingProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedNews, setSelectedNews] = useState<FilteredNews | null>(null);
  const [trending, setTrending] = useState<FilteredNews[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  async function handleTrending() {
    const trending = await getTrending();

    if (trending) {
      setTrending(trending);
      setLoading(false);
    }
  }

  useEffect(() => {
    handleTrending();
  }, []);

  function openModal(newsItem: FilteredNews) {
    setSelectedNews(newsItem);
    setIsModalOpen(true);
  }

  return (
    <div
      className={`${className} grid gap-12 place-items-center h-screen w-screen grid-cols-[repeat(auto-fit,minmax(230px,1fr))] sm:!grid-cols-[repeat(auto-fit,minmax(400px,1fr))]`}
    >
      {!loading && trending.length === 0 && (
        <p className="text-colorfontbutton">No trending saved</p>
      )}

      {!loading ? (
        trending.map((newsItem, index) => (
          <CardNews
            key={newsItem.id}
            title={newsItem.title}
            description={newsItem.description}
            image={newsItem.image}
            url={newsItem.url}
            content={newsItem.content}
            isTrending
            trendingNumber={index + 1}
            publishedAt={new Date(newsItem.publishedAt).toLocaleDateString(
              "en"
            )}
            onReadMore={() => openModal(newsItem)}
          />
        ))
      ) : (
        <Spinner />
      )}

      <Modal
        isOpen={isModalOpen}
        newsData={selectedNews || { title: "", content: "" }}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
