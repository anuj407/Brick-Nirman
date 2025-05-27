import React, { useContext, useEffect, useRef, useCallback, useState } from "react";
import { Pencil, BadgeCheck } from "lucide-react";
import { AppContext } from "../context/AppContext";
import ProductCard from "../components/ProductCard";
import { useParams } from "react-router-dom";
import { getSupplierById, updateSupplier } from "../utils/HandleSupplier";
import {
  createProduct,
  fetchProductsBySupplierId,
} from "../utils/HandleProductAPIs";
import CreatePostModal from "../components/CreatePostModal";
// import PopUp_Meassage from "../components/PopUp_Meassage";

const SupplierProfile = () => {
  const {
    supplierProducts,
    suppliers,
    setSuppliers,
    setCheckSuppliers,
    setSupplierProducts,
    user
  } = useContext(AppContext);

  const { id } = useParams();
  const fileInputRef = useRef(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  // const [message, setMessage] = useState("");

  // Fetch supplier by ID
  useEffect(() => {
    if (id) getSupplierById(id, setSuppliers, setCheckSuppliers);
  }, [id, setCheckSuppliers, setSuppliers]);

  const [allowEdit, setAllowEdit] = useState(false);
  // Fetch supplier's products
  useEffect(() => {
    if (id) {
      fetchProductsBySupplierId(id, setSupplierProducts);
      window.scrollTo(0, 0);
    }
    if(user){
      if(id === user._id) {
        setAllowEdit(true);
      }
    }
    else{
      setAllowEdit(false);
    }
  }, [id, setSupplierProducts, user]);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

 const handleFileChange = useCallback(
  (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append("avatar", file); // ensure field name matches what multer expects
      updateSupplier(formData, setSuppliers);
      e.target.value = null;
    }
  },
  [setSuppliers]
);

// console.log("Supplier Products:", supplierProducts);

  const handleCreateProduct = async (formData) => {
    try {
      const result = await createProduct(formData);
      console.log("✅ Created Product:", result);
      // setMessage("✅ Product created successfully");
      fetchProductsBySupplierId(id, setSupplierProducts);
      setIsModalOpen(false);
    } catch (error) {
      console.error("❌ Error creating product:", error);
      // setMessage("❌ Failed to create product");
    }
  };

  return (
    <div className="w-screen p-4 text-white">
      {/* Header */}
      <div className="max-w-4xl mx-auto flex items-center justify-between mb-6">
        <div className="flex items-center gap-6">
          <img
            src={
              suppliers?.[0]?.image ||
              "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
            }
            alt="Supplier Profile"
            className="w-24 h-24 rounded-full object-cover"
          />

          <div>
            <div className="flex items-center gap-2 text-2xl font-semibold">
              <h1>{suppliers?.[0]?.name}</h1>
              {suppliers?.[0]?.verified ? (
                <BadgeCheck className="text-blue-500 w-5 h-5" />
              ) : (
                <span className="text-xs text-gray-500">⚠️ Not Verified</span>
              )}
            </div>
            <p className="text-gray-200">📞 {suppliers?.[0]?.phone}</p>
            <p className="text-gray-200">✉️ {suppliers?.[0]?.email}</p>
            <p className="text-gray-200">
              <b>Service Area:</b>{" "}
              {suppliers?.[0]?.serviceArea?.join(", ")}
            </p>
            <p className="text-gray-200">
              <b>Address:</b>{" "}
              {[suppliers?.[0]?.address?.zip, suppliers?.[0]?.address?.street, suppliers?.[0]?.address?.city, suppliers?.[0]?.address?.state, suppliers?.[0]?.address?.country]
                .filter(Boolean)
                .join(", ")}
            </p>
          </div>
        </div>
        {allowEdit &&
          <button
          onClick={handleClick}
          className="flex items-center cursor-pointer gap-2 text-gray-900 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-full text-sm"
          >
            <Pencil className="w-4 h-4" /> Edit Profile
          </button>
        }
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
          accept="image/*"
        />
      </div>

      {/* Posts Section */}
      <div className="max-w-5xl mx-auto">
        <div className="w-full flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold mb-4">Posts</h2>
          
          { allowEdit &&
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 cursor-pointer border border-gray-100 hover:text-black hover:bg-gray-200 px-4 py-2 rounded-full text-sm"
            >
              <Pencil className="w-4 h-4" /> Create Post
            </button>
          }
        </div>

        <CreatePostModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleCreateProduct}
        />

        <div className="flex flex-wrap max-lg:justify-center gap-4">
          {supplierProducts?.map((post, index) => (
            <ProductCard key={index} product={post} />
          ))}
        </div>
      </div>

      {/* Optional message display (uncomment if you use PopUp_Meassage) */}
      {/* {message && <PopUp_Meassage message={message} />} */}
    </div>
  );
};

export default SupplierProfile;
