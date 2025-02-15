import { SearchIcon } from "lucide-react";

export default function Search() {
  return (
    <div className="bg-gray-600 border-1 p-4 border-borderwhite flex gap-5 text-[20px]  text-white rounded-[10px] min-w-[266px] max-h-[58px] items-center cursor-pointer">
      <div className="flex">
        <SearchIcon className="mr-4" />
        <input type="text" className="outline-none max-w-[185px]" />
      </div>
    </div>
  );
}
