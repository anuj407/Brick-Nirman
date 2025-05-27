import { FaHome, FaUsers, FaFile, FaHeart } from "react-icons/fa";
import {
  IoCloseSharp,
  logo,
  FaCartShopping,
  ShoppingBasket,
} from "../assets/assets.js";
import { logoutUser } from "../utils/HandleAPIs.jsx";
import { useContext, useEffect, useState, useRef } from "react";
import { AppContext } from "../context/AppContext.jsx";
import { useNavigate } from "react-router-dom";

export default function Sidebar({
  isSidebarOpen,
  setIsSidebarOpen,
  sideNavSelect,
  handleSideNav,
}) {
  const [userLogout, setResponse] = useState(null);
  const { setUser } = useContext(AppContext);
  const sidebarRef = useRef();
  const navigate = useNavigate();
  const handleLogout = async () => {
    const respopnse = await logoutUser(setResponse);
   if (respopnse){
    navigate("/");
    window.scrollTo(0, 0);
   }

  };

  useEffect(() => {
    if (userLogout?.statusCode === 200) {
      setIsSidebarOpen(false);
      setUser(null);
      setResponse(null);
      window.location.reload();
    }
  }, [setIsSidebarOpen, setUser, userLogout]);


  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isSidebarOpen &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target)
      ) {
        setIsSidebarOpen(false);
      }
    };
  
    const handleScroll = () => {
      if (isSidebarOpen) {
        setIsSidebarOpen(false);
      }
    };
  
    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("scroll", handleScroll);
  
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isSidebarOpen, setIsSidebarOpen]);
  

  return (
    <aside
      ref={sidebarRef}
      className={`${
        isSidebarOpen ? "left-0" : "-left-[100%]"
      } bg-gray-900 w-[16rem] py-5 text-white flex flex-col overflow-hidden transition-all duration-500 fixed h-full z-40`}
    >
      <div className="flex items-center justify-between px-5">
        <div className="w-[40%] h-[3rem]">
          <img
            className="w-full h-full scale-[1.5] object-cover"
            src={logo}
            alt="Logo"
          />
        </div>
        <div
          onClick={() => setIsSidebarOpen(false)}
          className="text-3xl font-bold cursor-pointer"
        >
          <IoCloseSharp />
        </div>
      </div>

      <nav className="flex-1 p-5">
        <ul className="space-y-2">
          {[
            { name: "Home", icon: <FaHome /> },
            { name: "Supplier", icon: <FaUsers /> },
            { name: "Favorites", icon: <FaHeart /> },
            { name: "Carts", icon: <FaCartShopping /> },
            { name: "Orders", icon: <FaFile /> },
            { name: "Products", icon: <ShoppingBasket /> },
          ].map((item) => (
            <li
              key={item.name}
              onClick={() => handleSideNav(item.name)}
              className={`${
                sideNavSelect === item.name && "bg-gray-800"
              } p-3 cursor-pointer flex items-center space-x-3 hover:bg-gray-800 rounded-md`}
            >
              {item.icon} <span>{item.name}</span>
            </li>
          ))}
        </ul>
      </nav>

      <div className="w-full border-t-[1px] px-5 border-gray-700">
        <div
          onClick={handleLogout}
          className="p-3 flex items-center space-x-3 hover:bg-gray-800 rounded-md cursor-pointer"
        >
          <span>Logout</span>
        </div>
      </div>
    </aside>
  );
}
