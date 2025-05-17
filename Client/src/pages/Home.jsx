/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import ProductCard from "../components/ProductCard";
import { useNavigate } from "react-router-dom";
import { fetchProducts, getUserProfile, refreshTokens } from "../utils/HandleAPIs";
import SupplierCard from "../components/SupplierCard";
import HomeSlider from "../components/HomeSlider";
import { getAllSuppliers } from "../utils/HandleSupplier";

function Home() {
  const { product, setProduct, suppliers, setSuppliers ,setTokenResponse,setUser} =
    useContext(AppContext);
  const [loadingProducts, setLoadingProducts] = useState(true); // Loading state for products
  const [loadingSuppliers, setLoadingSuppliers] = useState(true); // Loading state for suppliers
  const navigate = useNavigate();

  const handleViewMore = (val) => {
    if (val === "supplier") {
      navigate("/suppliers");
    } else {
      navigate("/products");
    }
  };

  useEffect(() => {
    const getTokens = async () => {
      const result = await refreshTokens();
      console.log(result);
      
      setTokenResponse(result.success)
      // You can call setUser(result.user) here if needed
    };
  
    getTokens();
  }, []);

  useEffect(()=>{
    const getProfile = async()=>{
      await getUserProfile(setUser)
    }
    getProfile()
  },[])

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoadingProducts(true);
        setLoadingSuppliers(true);
        await fetchProducts(setProduct);
        setLoadingProducts(false);
        await getAllSuppliers(setSuppliers);
        setLoadingSuppliers(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoadingProducts(false);
        setLoadingSuppliers(false);
      }
    };

    fetchData();
    window.scrollTo(0, 0);
  }, [fetchProducts, getAllSuppliers, setProduct, setSuppliers]);

  return (
    <>
      <div className="w-screen overflow-x-hidden text-white">
        <div className="w-[99%] h-[40rem] mt-2 rounded-lg">
          <HomeSlider />
        </div>
        <section className="w-full bg-gray-800 text-white py-16 text-center">
          <h2 className="text-3xl font-semibold">Welcome to Brick Nirman!</h2>
          <p className="max-w-2xl text-xl mx-auto mt-4 text-gray-300">
            If you are one of those who want some creative and innovative things
            in the interior or exterior parts of your project, then you are in
            the right place! With decades of experience and close working with
            architects, we have developed bricks that provide the right balance
            between sophisticated looks and long-term sustainability results.
          </p>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-4 gap-8 max-w-5xl mx-auto border-t border-gray-600 pt-10">
            <div>
              <p className="text-3xl font-bold">25000+</p>
              <p className="text-gray-400">Projects Served</p>
            </div>
            <div>
              <p className="text-3xl font-bold">210+</p>
              <p className="text-gray-400">Variants</p>
            </div>
            <div>
              <p className="text-3xl font-bold">35</p>
              <p className="text-gray-400">Years of Brick Excellence</p>
            </div>
            <div>
              <p className="text-3xl font-bold">1+</p>
              <p className="text-gray-400">Countries Reached</p>
            </div>
          </div>
        </section>
        <div className="py-10">
          <div className="">
            <div className="flex justify-between px-12">
              <h1 className="text-2xl font-bold">Best Selling</h1>
              <button
                onClick={() => handleViewMore(product)}
                className="text-md underline text-blue-500 cursor-pointer"
              >
                View More{" "}
              </button>
            </div>
            <div className="flex items-center justify-center flex-wrap gap-5 mt-5">
              {loadingProducts ? (
                <p className="text-gray-700 dark:text-white">
                  Loading products...
                </p>
              ) : (
                product
                  ?.slice(7)
                  .map((product, index) => (
                    <ProductCard key={index} product={product} />
                  ))
              )}
            </div>
          </div>
        </div>
        <div className="py-10">
          <div className="">
            <div className="flex justify-between px-12">
              <h1 className="text-2xl font-bold">New Product</h1>
              <button
                onClick={() => handleViewMore()}
                className="text-md underline text-blue-500 cursor-pointer"
              >
                View More{" "}
              </button>
            </div>
            <div className="flex items-center justify-center flex-wrap gap-5 mt-5">
              {loadingProducts ? (
                <p className="text-gray-700 dark:text-white">
                  Loading products...
                </p>
              ) : (
                product
                  ?.slice(-8)
                  .map((product, index) => (
                    <ProductCard key={index} product={product} />
                  ))
              )}
            </div>
          </div>
        </div>
        <div className="py-10">
          <div className="">
            <div className="flex justify-between px-12">
              <h1 className="text-2xl font-bold">Top Suppliers</h1>
              <button
                onClick={() => handleViewMore("supplier")}
                className="text-md underline text-blue-500 cursor-pointer"
              >
                View More{" "}
              </button>
            </div>
            <div className=" flex items-center justify-center flex-wrap gap-5 mt-10">
              {loadingSuppliers ? (
                <p className="text-gray-700 dark:text-white">
                  Loading suppliers...
                </p>
              ) : (
                suppliers?.map((supplier, index) => (
                  <SupplierCard key={index} supplier={supplier} />
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
