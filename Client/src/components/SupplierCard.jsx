import React, { useContext } from "react";
import { Star, CheckCircle } from "lucide-react";
import { getSupplierById } from "../utils/HandleSupplier";
import { fetchProductsBySupplierId } from "../utils/HandleProductAPIs";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const SupplierCard = ({ supplier }) => {
  // const renderRatingStars = (rating) => {
  //   const stars = [];
  //   const fullStars = Math.floor(rating);
  //   const hasHalfStar = rating % 1 !== 0;

  //   for (let i = 0; i < fullStars; i++) {
  //     stars.push(
  //       <Star key={`star-${i}`} className="text-yellow-400 w-5 h-5" />
  //     );
  //   }

  //   if (hasHalfStar) {
  //     stars.push(
  //       <div key="half-star" className="relative w-5 h-5">
  //         <Star className="text-gray-400 w-5 h-5 absolute" />
  //         <div className="absolute overflow-hidden w-1/2 h-5">
  //           <Star className="text-yellow-400 w-5 h-5" />
  //         </div>
  //       </div>
  //     );
  //   }

  //   const emptyStars = 5 - stars.length;
  //   for (let i = 0; i < emptyStars; i++) {
  //     stars.push(<Star key={`empty-${i}`} className="text-gray-400 w-5 h-5" />);
  //   }

  //   return stars;
  // };
  // console.log("supplier in supplierCard arsh: : ", supplier);

  

  const {setSuppliers, setSupplierProducts } = useContext(AppContext);
  const navigate = useNavigate();
  const handleProfile = () => {
      getSupplierById(supplier?.supplierId, setSuppliers);
      fetchProductsBySupplierId(
        supplier?.supplierId,
        setSupplierProducts
      );
      navigate(`/supplier-profile/${supplier?.supplierId}`);
  };

  if(!supplier) {
      return <div className="text-gray-400">Supplier data is unavailable.</div>;
  }
  return (
    <div className="bg-gradient-to-b from-gray-800 to-gray-700 p-6 rounded-xl shadow-xl border border-gray-600 hover:shadow-2xl hover:scale-105 transition-transform duration-300 ease-out">
      <div className="flex flex-col items-center gap-6 text-center md:text-left">
        <img
          src={
            supplier?.image ||
            "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
          }
          alt={`${supplier?.name} profile`}
          className="w-28 h-28 rounded-full object-cover border-4 border-blue-500 shadow-md -mt-10"
        />

        <div className="flex-1">
          <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
            <h2 className="text-2xl font-bold text-white">
              {supplier?.name || "Unknown Supplier"}
            </h2>
            {supplier?.verified && (
              <CheckCircle className="w-6 h-6 text-blue-500" />
            )}
          </div>

          {/* <div className="flex justify-center md:justify-start items-center mb-4">
            {renderRatingStars(supplier?.rating)}
            <span className="ml-2 text-white text-sm">{supplier?.rating}</span>
          </div> */}

          <div className="space-y-1 text-gray-300 text-sm">
            <div>
              <strong className="text-blue-400">Joined:</strong>{" "}
              {supplier?.createdAt &&
                new Date(supplier.createdAt).toLocaleDateString()}
            </div>
            <div>
              <strong className="text-blue-400">Service Area:</strong>{" "}
              {supplier?.serviceArea?.map((area, index) => (
                <span key={`${area}-${index}`}>{area} ,</span>
              ))}
            </div>
            <div>
              <strong className="text-blue-400">Contact:</strong>{" "}
              <a
                href={`mailto:${supplier?.email || ""}`}
                className="text-blue-400 hover:underline"
              >
                {supplier?.email || "No Email Provided"}
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <button onClick={handleProfile} className="w-full cursor-pointer bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-xl transition-transform transform hover:scale-105 shadow-md">
          View Supplier
        </button>
      </div>
    </div>
  );
};

export default SupplierCard;
