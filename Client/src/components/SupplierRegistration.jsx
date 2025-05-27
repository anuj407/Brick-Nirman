import React, { useContext, useState } from "react";
import { Mail, User, Phone, Newspaper } from "lucide-react";
import { registerSupplier } from "../utils/HandleSupplier";
import { AppContext } from "../context/AppContext";

const SupplierRegistration = () => {
  const { setIsSupplierOpen , user } = useContext(AppContext);
  const [name, setName] = useState("");
  const [gstNumber, setGstNumber] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState({
    street: "",
    city: "",
    state: "",
    zip: "",
    country: "India",
    geoLocation: { latitude: "", longitude: "" },
  });
  const [serviceArea, setServiceArea] = useState([]);
  const [currentArea, setCurrentArea] = useState("");

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setAddress((prevAddress) => ({
      ...prevAddress,
      [name]: value,
    }));
  };

  const handleAddArea = (e) => {
    if (e.key === "Enter" && currentArea.trim() !== "") {
      setServiceArea([...serviceArea, currentArea.trim()]);
      setCurrentArea("");
      e.preventDefault();
    }
  };

  const removeArea = (indexToRemove) => {
    setServiceArea(serviceArea.filter((_, index) => index !== indexToRemove));
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const supplierId = user?._id; // Assuming user context provides the supplier ID
    const supplierData = {
      supplierId,
      name,
      gstNumber,
      phone,
      email,
      address,
      serviceArea,
    };
    //
    registerSupplier(supplierData, setIsSupplierOpen);
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-10 rounded-2xl backdrop-blur-lg bg-blue-500/20 shadow-2xl border border-blue-500">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold text-white">Supplier Registration</h2>
        <p className="text-sm text-blue-300">
          Register your business as a supplier
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <div className="relative">
          <User className="absolute top-2/4 left-3 transform -translate-y-1/2 text-blue-400" />
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Business Name"
            required
            className="w-full pl-10 py-2 bg-blue-500/10 rounded-xl border border-blue-500 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div className="relative">
          <Newspaper className="absolute top-2/4 left-3 transform -translate-y-1/2 text-blue-400" />
          <input
            type="text"
            value={gstNumber}
            onChange={(e) => setGstNumber(e.target.value)}
            placeholder="GST Number"
            required
            className="w-full pl-10 py-2 bg-blue-500/10 rounded-xl border border-blue-500 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div className="relative">
          <Phone className="absolute top-2/4 left-3 transform -translate-y-1/2 text-blue-400" />
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Phone Number"
            required
            className="w-full pl-10 py-2 bg-blue-500/10 rounded-xl border border-blue-500 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div className="relative">
          <Mail className="absolute top-2/4 left-3 transform -translate-y-1/2 text-blue-400" />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email Address"
            required
            className="w-full pl-10 py-2 bg-blue-500/10 rounded-xl border border-blue-500 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div className="col-span-full space-y-4">
          <h3 className="text-white">Address</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="street"
              value={address.street}
              onChange={handleAddressChange}
              placeholder="Street"
              required
              className="w-full py-2 px-4 bg-blue-500/10 rounded-xl border border-blue-500 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="text"
              name="city"
              value={address.city}
              onChange={handleAddressChange}
              placeholder="City"
              required
              className="w-full py-2 px-4 bg-blue-500/10 rounded-xl border border-blue-500 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="text"
              name="state"
              value={address.state}
              onChange={handleAddressChange}
              placeholder="State"
              required
              className="w-full py-2 px-4 bg-blue-500/10 rounded-xl border border-blue-500 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="text"
              name="zip"
              value={address.zip}
              onChange={handleAddressChange}
              placeholder="Zip Code"
              required
              className="w-full py-2 px-4 bg-blue-500/10 rounded-xl border border-blue-500 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="text"
              name="country"
              value={address.country}
              onChange={handleAddressChange}
              placeholder="Country"
              disabled
              className="w-full py-2 px-4 bg-blue-500/10 rounded-xl border border-blue-500 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
        </div>

        <div className="col-span-full">
          <h3 className="text-white mb-2">
            Service Areas (Type and press Enter)
          </h3>
          <div className="flex flex-wrap items-center gap-2 p-2 bg-blue-500/10 rounded-xl border border-blue-500">
            {serviceArea.map((area, index) => (
              <span
                key={index}
                className="flex items-center gap-1 bg-blue-400 text-white px-2 py-1 rounded"
              >
                {area}
                <button
                  type="button"
                  onClick={() => removeArea(index)}
                  className="text-red-500 ml-1"
                >
                  x
                </button>
              </span>
            ))}
            <input
              type="text"
              value={currentArea}
              onChange={(e) => setCurrentArea(e.target.value)}
              onKeyDown={handleAddArea}
              placeholder="Add Service Area"
              className="flex-grow bg-transparent text-white focus:outline-none"
            />
          </div>
        </div>

        <div className="col-span-full">
          <button
            type="submit"
            className="w-full py-3 bg-blue-500 rounded-xl text-white font-bold hover:bg-blue-600 transition-colors"
          >
            Register as Supplier
          </button>
        </div>
      </form>
    </div>
  );
};

export default SupplierRegistration;
