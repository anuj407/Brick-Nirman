import { useState, useEffect, useContext } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import Login from "./Login";
import UserRegistration from "./UserRegistration";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import SupplierRegistration from "./SupplierRegistration";
import ForgotPassword from "./ForgotPassword";
import { getUserProfile, refreshTokens } from "../utils/HandleAPIs";
import { getSupplierById } from "../utils/HandleSupplier";

export default function Dashboard() {
  const { 
    isSidebarOpen, setIsSidebarOpen, 
    sideNavSelect, setSideNavSelect, 
    isLoginOpen, setIsLoginOpen, 
    isRegisterOpen, setIsRegisterOpen ,
    isSupplierOpen, setIsSupplierOpen,
    forgotPasswordOpen ,setForgotPasswordOpen,
    setshowMsg, setTokenResponse ,
    setSuppliers ,setIsSuppliers,
    checkSuppliers, setSupplierBtn,
    setUser, user
  } = useContext(AppContext);
  
  const navigate = useNavigate()
  const userId = user?._id; // Get the user ID from the user object
  console.log("userId:", userId);
  
  //side Nav Selection
  const handleSideNav = (value) => {
    setSideNavSelect(value);
  
    const routes = {
      Home: '/',
      Supplier: '/suppliers',
      Favorites: '/favourites',
      Carts: '/carts',
      Orders: '/orders',
      Products: '/products',
    };
  
    const protectedRoutes = ['Favorites', 'Carts', 'Orders'];
  
    if (routes[value]) {
      if (protectedRoutes.includes(value)) {
        if (userId) {
          navigate(routes[value]);
        } else {
          setshowMsg(true); // ✅ show message if not logged in
          setTimeout(() => setshowMsg(false), 2000);
        }
      } else {
        navigate(routes[value]); // normal navigation for other pages
      }
    }
  };
  
  
  
  const [PopUp, setPopUp] = useState(true);
  const handlePopUp = (event) => {
    event.stopPropagation();
    setPopUp(false);
  };
  
useEffect(() => {
  // get Logged In user Data
    const getProfile = async()=>{
      await getUserProfile(setUser)
    }
    getProfile()

 // verify if user is logged in
    const getTokens = async () => {
      const result = await refreshTokens();
      if(result.success) {
        setTokenResponse(true)
         // Check if supplierId is available
         if(userId){
           getSupplierById(userId, setSuppliers, setIsSuppliers).then(() => {
               setSupplierBtn(!checkSuppliers);
             });
         }
      }
      // You can call setUser(result.user) here if needed
    };
    getTokens();


  
  document.body.style.overflow =
    isLoginOpen || isRegisterOpen ? "hidden" : "auto";
}, [checkSuppliers, isLoginOpen, isRegisterOpen, setIsSuppliers, setSupplierBtn, setSuppliers, setTokenResponse, setUser, userId]);


  return (
    <div className="w-full">
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        sideNavSelect={sideNavSelect}
        handleSideNav={handleSideNav}
      />
      <div className="max-w-screen h-[5rem] text-white z-10">
        <Navbar
          setIsSidebarOpen={setIsSidebarOpen}
          setIsRegisterOpen={setIsRegisterOpen}
          setIsLoginOpen={setIsLoginOpen}
        />
      </div>
      {isLoginOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-[#22222282] flex justify-center items-center z-50">
          <div
            onClick={handlePopUp}
            className="bg-gray-800 shadow-lg relative w-[80%] max-w-md rounded-2xl"
          >
            <button
              className="absolute top-4 right-4 text-gray-600 cursor-pointer hover:text-gray-900 text-xl z-40"
              onClick={() => setIsLoginOpen(false)}
            >
              ✖
            </button>
            <Login />
          </div>
        </div>
      )}
      {isRegisterOpen && (
        <div
          className={`fixed top-0 left-0 w-full h-full bg-[#22222282] flex justify-center items-center z-50`}
        >
          <div
            onClick={handlePopUp}
            className="bg-gray-800 shadow-lg relative w-[80%] max-w-md rounded-2xl"
          >
            <button
              className="absolute top-4 right-4 text-gray-600 cursor-pointer hover:text-gray-900 text-xl z-40"
              onClick={() => setIsRegisterOpen(false)}
            >
              ✖
            </button>
            <UserRegistration />
          </div>
        </div>
      )}
       {isSupplierOpen && (
        <div
          className={`fixed top-0 left-0 w-full h-full bg-[#22222282] flex justify-center items-center z-50`}
        >
          <div
            onClick={handlePopUp}
            className="bg-gray-800 shadow-lg relative w-[80%] max-w-md rounded-2xl"
          >
            <button
              className="absolute top-4 right-4 text-gray-600 cursor-pointer hover:text-gray-900 text-xl z-40"
              onClick={() => setIsSupplierOpen(false)}
            >
              ✖
            </button>
            <SupplierRegistration />
          </div>
        </div>
      )}
       {forgotPasswordOpen && (
        <div
          className={`fixed top-0 left-0 w-full h-full bg-[#22222282] flex justify-center items-center z-50`}
        >
          <div
            onClick={handlePopUp}
            className="bg-gray-800 shadow-lg relative w-[80%] max-w-md rounded-2xl"
          >
            <button
              className="absolute top-4 right-4 text-gray-600 cursor-pointer hover:text-gray-900 text-xl z-40"
              onClick={() => setForgotPasswordOpen(false)}
            >
              ✖
            </button>
            <ForgotPassword />
          </div>
        </div>
      )}
    </div>
  );
}
