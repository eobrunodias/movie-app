import { SearchIcon } from "lucide-react";

interface SearchProps {
  className: string;
  readOnly: boolean;
  searchTerm: string;
  setSearchTerm: (value: string) => void;
}

export default function Search({
  className,
  readOnly,
  searchTerm,
  setSearchTerm,
}: SearchProps) {
  return (
    <div
      className={`${className} bg-gray-600 border-1 p-4 border-borderwhite flex gap-5 text-[20px] text-white rounded-[10px] min-w-[266px] max-h-[58px] items-center`}
    >
      <div className="flex">
        <SearchIcon className="mr-4" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={`${className} outline-none max-w-[185px]`}
          readOnly={readOnly}
        />
      </div>
    </div>
  );
}
