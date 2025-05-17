/* eslint-disable react-refresh/only-export-components */
import { createContext, useState } from "react";

// ✅ Create Context
export const AppContext = createContext();

// ✅ Create Provider Component
export const AppProvider = ({ children }) => {
  const [product, setProduct] = useState(null);
  const [productById, setProductById] = useState(null);
  const [cartProducts, setCartProducts] = useState(null);
  const [favProduct, setFavProduct] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [sideNavSelect, setSideNavSelect] = useState("Home");
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [userRegisterData, setUserRegisterData] = useState(null);
  const [isSupplierOpen, setIsSupplierOpen] = useState(false);
  //supplier details
  const [suppliers, setSuppliers] = useState(null);
  const [checkSuppliers, setCheckSuppliers] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  // Single Supplier Products
  const [supplierProducts, setSupplierProducts] = useState(null);
  const [ orders, setOrders] = useState(null);
  const [forgotPasswordOpen,setForgotPasswordOpen] = useState(false)
   const [showMsg, setshowMsg] = useState(false);
   //check Refresh Token
   const [tokenResponse,setTokenResponse]=useState(false)
  return (
    <AppContext.Provider
      value={{
        product,
        setProduct,
        productById,
        setProductById,
        cartProducts,
        setCartProducts,
        favProduct,
        setFavProduct,
        isSidebarOpen,
        setIsSidebarOpen,
        sideNavSelect,
        setSideNavSelect,
        isLoginOpen,
        setIsLoginOpen,
        isRegisterOpen,
        setIsRegisterOpen,
        user,
        setUser,
        userRegisterData,
        setUserRegisterData,
        isSupplierOpen,
        setIsSupplierOpen,
        suppliers,
        setSuppliers,
        checkSuppliers,
        setCheckSuppliers,
        searchTerm,
        setSearchTerm,
        supplierProducts,
        setSupplierProducts,
        orders,
        setOrders,
        forgotPasswordOpen,
        setForgotPasswordOpen,
        showMsg,
        setshowMsg,
        tokenResponse,
        setTokenResponse
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
