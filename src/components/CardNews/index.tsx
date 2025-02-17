import { ArrowUpRight, HeartIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { uniqueId } from "../../utils/uniqueId";

interface CardNewsProps {
  size?: "small" | "medium" | "large";
  key?: string;
  title: string;
  description: string;
  content?: string;
  image?: string;
  url?: string;
  className?: string;
  publishedAt?: string;
  isTrending?: boolean;
  trendingNumber?: number;
  onClick?: () => void;
  onReadMore?: () => void;
  onRemoveFavorite?: (title: string) => void;
}

const sizeSmall = "max-w-[463px] w-full h-[456px]";
const sizeMedium = "max-w-[463px] w-full h-[506px]";
const sizeLarge = "max-w-[463px] w-full h-[655px]";

const posterSmall = "max-w-[463px] w-full h-[226px] bg-gray-500";
const posterMedium = "w-full h-[276px] bg-gray-500";
const posterLarge = "max-w-[463px] w-full h-[425px] bg-gray-500";

const descriptionSmall = "w-full h-[230px] bg-gray-700 text-white";
const descriptionMedium = "w-full h-[230px] bg-gray-700 text-white";
const descriptionLarge = "w-full h-[230px] bg-gray-700 text-white";

export default function CardNews({
  size = "medium",
  title,
  description,
  content,
  image,
  url,
  className,
  publishedAt,
  isTrending,
  trendingNumber,
  onReadMore,
  onRemoveFavorite,
}: CardNewsProps) {
  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  const storageKey = "favorites";

  useEffect(() => {
    const storedFavorites = JSON.parse(
      localStorage.getItem(storageKey) || "[]"
    );
    const isAlreadyFavorite = storedFavorites.some(
      (fav: { title: string }) => fav.title === title
    );
    setIsFavorite(isAlreadyFavorite);
  }, [title]);

  function handleClickFavorite() {
    const savedFavorites = JSON.parse(
      localStorage.getItem("favorites") || "[]"
    );

    if (isFavorite) {
      const updatedFavorites = savedFavorites.filter(
        (news: { id: string }) => news.id !== title
      );
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));

      if (onRemoveFavorite) {
        onRemoveFavorite(title);
      }
    } else {
      const newFavorite = {
        id: uniqueId(title),
        title,
        description: description || "",
        content: content || "",
        url: url || "",
        image,
        publishedAt,
      };

      const updatedFavorites = [...savedFavorites, newFavorite];
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    }

    setIsFavorite((prev) => !prev);
  }

  const cardSize =
    size === "large" ? sizeLarge : size === "small" ? sizeSmall : sizeMedium;
  const cardPoster =
    size === "large"
      ? posterLarge
      : size === "small"
      ? posterSmall
      : posterMedium;
  const cardDescription =
    size === "large"
      ? descriptionLarge
      : size === "small"
      ? descriptionSmall
      : descriptionMedium;

  return (
    <div
      className={`card ${cardSize} shadow-card rounded-2xl border-1 border-borderwhite  w-full sm:max-w-[463px] hover:scale-103`}
    >
      <div className={`${className ?? ""} ${cardPoster} relative rounded-2xl`}>
        {isTrending ? (
          <div className="relative">
            <p className="absolute top-9 left-12 text-5xl font-bold text-blue-500 z-1">
              {trendingNumber}
            </p>
            <div className="bg-gray-700 h-20 w-20 rounded-full absolute top-5 left-5"></div>
          </div>
        ) : (
          <HeartIcon
            onClick={handleClickFavorite}
            size="30px"
            fill={`${isFavorite ? "#e63946" : "#8d939d"}`}
            className="cursor-pointer absolute top-5 right-5 hover:scale-110"
          />
        )}

        {image && (
          <img
            src={image}
            className="w-full h-full object-cover rounded-t-2xl"
          />
        )}
      </div>

      <div
        onClick={onReadMore}
        className={`${cardDescription} flex flex-col justify-around p-5 rounded-b-2xl cursor-pointer`}
      >
        {title && <h3 className="text-4xl font-bold truncate ">{title}</h3>}
        {description && (
          <h3 className="text-[20px] text line-clamp-2">{description}</h3>
        )}
        <span className="text-blue-500 font-bold text-1xl cursor-pointer flex items-center justify-between gap-2">
          {publishedAt && <h3 className="">{publishedAt}</h3>}
          <ArrowUpRight size="30px" />
        </span>
      </div>
    </div>
  );
}
