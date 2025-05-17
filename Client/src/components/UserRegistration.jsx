import React, { useContext, useState } from "react";
import { Eye, EyeOff, Mail, Lock, User, Phone } from "lucide-react";
import { registerUser } from "../utils/HandleAPIs";
import { AppContext } from "../context/AppContext";
import SupplierRegistration from "./SupplierRegistration.jsx";

const Registration = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("user");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { setIsRegisterOpen, setIsSupplierOpen ,setIsLoginOpen } = useContext(AppContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    const userInputData = {
      fullName: name,
      email,
      phone,
      role,
      password,
      confirmPassword,
    };
    registerUser(userInputData, (data) => {
      if (data?.role === "supplier") {
        setIsRegisterOpen(false);
        setIsSupplierOpen(true);
      }
      else{
        setIsRegisterOpen(false);
        setIsLoginOpen(true)
      }
    });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 rounded-2xl backdrop-blur-lg bg-blue-500/20 shadow-2xl border border-blue-500">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-white">Register</h2>
        <p className="text-sm text-blue-300">Create a new account</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="relative">
          <User className="absolute top-2/4 left-3 transform -translate-y-1/2 text-blue-400" />
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your Name"
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
          <Lock className="absolute top-2/4 left-3 transform -translate-y-1/2 text-blue-400" />
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            className="w-full pl-10 py-2 bg-blue-500/10 rounded-xl border border-blue-500 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute top-2/4 right-3 transform -translate-y-1/2 text-blue-400"
          >
            {showPassword ? <EyeOff /> : <Eye />}
          </button>
        </div>

        <div className="relative">
          <Lock className="absolute top-2/4 left-3 transform -translate-y-1/2 text-blue-400" />
          <input
            type={showConfirmPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm Password"
            required
            className="w-full pl-10 py-2 bg-blue-500/10 rounded-xl border border-blue-500 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="button"
            onClick={toggleConfirmPasswordVisibility}
            className="absolute top-2/4 right-3 transform -translate-y-1/2 text-blue-400"
          >
            {showConfirmPassword ? <EyeOff /> : <Eye />}
          </button>
        </div>

        <div className="relative">
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
            className="w-full  pl-3 py-2 bg-blue-500/10 rounded-xl border border-blue-500 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="user" className="bg-blue-900">User</option>
            <option value="supplier" className="bg-blue-900">Supplier</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full py-2 mt-4 bg-blue-500 rounded-xl text-white font-bold hover:bg-blue-600 transition-colors"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Registration;
