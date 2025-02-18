import { XCircleIcon } from "lucide-react";
import { cleanContent } from "../../utils/cleanContent";

interface ModalProps {
  isOpen: boolean;
  newsData: {
    title: string;
    content?: string;
    url?: string;
    image?: string;
  };
  onClose: () => void;
}

export default function Modal({ isOpen, newsData, onClose }: ModalProps) {
  if (!isOpen || !newsData) return null;

  return (
    <div className="fixed inset-0 bg-bg-modal bg-opacity-50 flex items-center justify-center z-1">
      <div className="bg-bg-modal text-white rounded-lg w-3/4 sm:w-1/2 max-h-[80vh] overflow-hidden relative border-1 border-borderwhite">
        <div className="rounded-full bg-gray-900 w-13 h-13 absolute top-5 right-5 flex items-center justify-center z-2">
          <XCircleIcon
            onClick={onClose}
            className="text-red cursor-pointer"
            size="40px"
          />
        </div>

        <div className="relative mb-12">
          <img
            src={newsData.image || "https://placehold.co/600x400"}
            alt="poster"
            className="object-cover w-full h-64 rounded-t-lg"
          />
        </div>

        <div className="overflow-y-auto max-h-[50vh]">
          <div className="px-6 flex flex-col justify-between h-full mb-12">
            <h1 className="text-5xl font-bold mb-12">{newsData.title}</h1>

            <div className="max-h-[calc(100%-16rem)] mb-12">
              <p className="text-2xl ">
                {cleanContent(newsData.content || "")}
              </p>
            </div>

            <a
              href={newsData.url}
              className="text-blue-500 font-bold text-1xl cursor-pointer"
            >
              <span className="text-colorfontbutton italic">Source: </span>
              {newsData.url}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
