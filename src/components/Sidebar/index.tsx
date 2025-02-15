import { Link, useLocation } from "react-router-dom";
import Button from "./button";
import {
  ArrowLeftToLineIcon,
  ArrowRightToLineIcon,
  Heart,
  House,
  SunIcon,
  TrendingUp,
} from "lucide-react";
import Search from "../Search";
import { useEffect, useState } from "react";

export default function Sidebar() {
  const { pathname } = useLocation();

  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth < 890);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 890);

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const navLinks = [
    { to: "/", label: "Home", icon: isOpen ? <House /> : <House size={30} /> },
    {
      to: "/favorites",
      label: "Favorites",
      icon: isOpen ? <Heart /> : <Heart size={30} />,
    },
    {
      to: "/trending",
      label: "Trending",
      icon: isOpen ? <TrendingUp /> : <TrendingUp size={30} />,
    },
  ];

  return (
    <aside
      className={`bg-gray-700 w-full min-h-[90px] border-b sm:border-b-0 sm:min-h-screen sm:h-screen sm:border-r border-borderwhite transition-all duration-300 sm:block flex items-center justify-center p-4 sm:p-0
    ${isOpen ? "sm:max-w-[320px]" : "sm:max-w-[100px]"}`}
    >
      <div className="flex sm:max-w-[266px] items-center sm:flex-col sm:h-full sm:mx-auto sm:my-0 transition-all duration-300 ">
        <div className="sm:h-2/3 sm:max-w-[266px] ">
          <div
            className={`flex sm:items-center sm:w-full sm:mt-6 sm:mb-12
              ${
                isOpen
                  ? "sm:justify-between "
                  : "sm:flex-col-reverse sm:gap-6 sm:justify-center "
              }`}
          >
            <SunIcon
              size="30px"
              className="text-amber-400 sm:cursor-pointer sm:hover:scale-115 sm:block hidden"
            />
            {isOpen ? (
              <ArrowLeftToLineIcon
                size="30px"
                onClick={() => setIsOpen((prev) => (prev ? false : true))}
                className="sm:cursor-pointer sm:text-colorfontbutton sm:hover:scale-115 hidden sm:block"
              />
            ) : (
              <ArrowRightToLineIcon
                size="30px"
                onClick={() => setIsOpen((prev) => (prev ? false : true))}
                className="sm:cursor-pointer sm:text-colorfontbutton sm:hover:scale-115 hidden sm:block"
              />
            )}
          </div>

          {!isOpen && (
            <hr className="sm:text-borderwhite sm:w-[50px] sm:rounded-[10px]" />
          )}

          {!isMobile && isOpen && <Search />}

          <nav className="sm:bg-gray-700 w-screen sm:border-0 flex items-center justify-around sm:flex-col sm:w-full sm:max-w-[266px] sm:mt-12 sm:items-center bg-gray-600 border-1 rounded-[10px] min-h-[58px] border-colorfontbutton max-w-[548px] flex-1 mx-2 sm:mx-0">
            <SunIcon
              size="30px"
              className="text-amber-400 sm:cursor-pointer sm:hover:scale-115 block sm:hidden"
            />
            {navLinks.map(({ to, label, icon }) => (
              <Link
                key={to}
                to={to}
                className={`sm:p-4 sm:text-colorfontbutton sm:cursor-pointer sm:hover:scale-115
                   ${
                     isOpen
                       ? "sm:bg-gray-600 sm:border sm:border-borderwhite sm:text-[20px] sm:font-bold sm:rounded-[10px] sm:min-w-[266px] sm:mb-[0.65rem] sm:max-h-[58px] sm:border-l-[20px]"
                       : "sm:max-w-[50px] sm:mb-[0.65rem] sm:max-h-[58px] sm:flex sm:items-center sm:justify-center"
                   }
                  ${pathname === to ? "sm:border-l-blue-500" : ""}`}
              >
                <Button
                  isActive={pathname === to}
                  label={`${!isMobile && isOpen ? label : ""}`}
                >
                  {icon}
                </Button>
              </Link>
            ))}
          </nav>
        </div>
        <div className="sm:h-1/3 sm:flex sm:flex-col sm:items-center sm:justify-end hidden">
          {isOpen ? (
            <hr className="sm:text-borderwhite sm:w-[256px] sm:mb-9 sm:rounded-[10px]" />
          ) : (
            <hr className="sm:text-borderwhite sm:w-[50px] sm:mb-9 sm:rounded-[10px]" />
          )}

          {isOpen ? (
            <Link to="/">
              <img
                src="logo.svg"
                alt="logo"
                className="sm:mb-8 cursor-pointer"
              />
            </Link>
          ) : (
            <Link to="/">
              <img
                src="short-logo.svg"
                alt="logo-short"
                className="sm:mb-8 cursor-pointer"
              />
            </Link>
          )}
        </div>
      </div>
    </aside>
  );
}
