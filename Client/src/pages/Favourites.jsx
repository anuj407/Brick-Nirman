import React, { useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import FavouriteCard from "../components/FavouriteCard";
import { fetchFavProducts } from "../utils/HandleProductAPIs";

function Favourites() {
  const { favProduct, setFavProduct ,user } = useContext(AppContext);
  useEffect(() => {
    const userId = user?._id; // Get user ID from context
    if (userId) {
      fetchFavProducts(setFavProduct);
    }
    window.scrollTo(0, 0);
  }, [setFavProduct, user?._id]);
  return (
    <>
      <div className=" bg-gradient-to-br from-gray-800 to-gray-900 py-10 px-4">
        <div className="max-w-7xl mx-auto text-center mb-12">
          <h1 className="text-4xl font-bold text-white">Favourite Products</h1>
          <p className="text-blue-300 mt-3">Explore your favourite products</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {favProduct?.map((product, index) => (
            <FavouriteCard key={index} product={product} />
          ))}
        </div>
      </div>
    </>
  );
}

export default Favourites;
