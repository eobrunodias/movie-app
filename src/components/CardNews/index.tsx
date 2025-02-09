import { HeartIcon } from "lucide-react";

interface CardNewsProps {
  size?: "small" | "medium" | "large";
  title: string;
  subtitle: string;
  poster?: string;
  onClick?: () => void;
}

const sizeSmall = "w-[463px] h-[456px]";
const sizeMedium = "w-[463px] h-[506px]";
const sizeLarge = "w-[463px] h-[655px]";

const posterSmall = "w-[463px] h-[226px] bg-gray-500";
const posterMedium = "w-full h-[276px] bg-gray-500 ";
const posterLarge = "w-[463px] h-[425px] bg-gray-500";

const descriptionSmall = "w-[463px] h-[230px] bg-gray-700 text-white";
const descriptionMedium = "w-full h-[230px] bg-gray-700 text-white";
const descriptionLarge = "w-[463px] h-[230px] bg-gray-700 text-white";

function handleClickFavorite() {}

export default function CardNews({
  size = "medium",
  title,
  subtitle,
  poster,
  onClick,
}: CardNewsProps) {
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
      onClick={onClick}
      className={`card ${cardSize} rounded-2xl border-1 border-borderwhite  w-full max-w-[550px]`}
      // className={`card ${cardSize} rounded-2xl border-1 border-borderwhite mb-[50px] mr-[50px]`}
      // className={`card ${cardSize} rounded-2xl border-1 border-borderwhite`}
    >
      <div className={`${cardPoster}`}>
        <HeartIcon onClick={handleClickFavorite} />
        {poster && <p className="">{poster}</p>}
      </div>
      <div className={`${cardDescription} flex flex-col justify-around p-5`}>
        {title && <h3 className="text-4xl font-bold">{title}</h3>}
        {subtitle && <h3 className="text-[20px] text">{subtitle}</h3>}
        <p>READ MORE</p>
      </div>
    </div>
  );
}
