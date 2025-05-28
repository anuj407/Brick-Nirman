import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { User } from '../models/user.model.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { uploadOnCloudinary } from '../utils/cloudinary.js';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

//generate the access and resfresh token
export const generateAccessAndRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    //save refresh token to the db
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return {
      accessToken,
      refreshToken,
    };
  } catch (error) {
    throw new ApiError(
      500,
      'something went wrong while generating refresh and access token'
    );
  }
};
export const AccessRefreshToken = asyncHandler(async(req,res)=>{
  const refreshToken = req.cookies.refreshToken;
  if(!refreshToken){
      throw new ApiError("Refresh token is required",401)
  }
  const user = await User.findOne({refreshToken});
  if(!user){
      throw new ApiError("Invalid refresh token",401)
  }
  return res.json(new ApiResponse(200,user))  
})
// Register User
export const registerUser = asyncHandler(async (req, res) => {
  const { fullName, email, phone, address, role, password } = req.body;

  // Validate required fields
  if (!fullName || !email || !phone || !role || !password) {
    throw new ApiError(400, 'Please fill all required fields');
  }

  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new ApiError(400, 'User already exists');
  }


  // Create new user
  const user = await User.create({
    fullName,
    email,
    phone,
    address,
    role,
    password,
  });

  // Remove password from response
  const userResponse = user.toObject();
  delete userResponse.password;

  // Return success response
  res
    .status(201)
    .json(new ApiResponse(201, userResponse, 'User registered successfully'));
});

// Login User
export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new ApiError(400, 'Both fields are required');
  }
  const user = await User.findOne({ email });
  const isPasswordCorrect = await user.isPasswordCorrect(password);
  if (!user || !isPasswordCorrect) {
    throw new ApiError(401, 'Invalid email or password');
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    user._id
  );

  const loggedInUser = await User.findById(user._id).select(
    '-password -refreshToken'
  );

  //send refresh token to frontend
  const option = {
    httpOnly: true,
    secure: true,
    sameSite: "None" 
  };
  res
    .status(200)
    .cookie('accessToken', accessToken, option)
    .cookie('refreshToken', refreshToken, option)
    .json(
      new ApiResponse(
        200,
        loggedInUser,
        'User logged in Succesfully'
      )
    );
});

// Get User Profile
export const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (!user) throw new ApiError(404, 'User not found');

  res.json(new ApiResponse(200, user, 'User profile retrieved successfully'));
});

// Update User Profile
export const updateUserProfile = asyncHandler(async (req, res) => {
  const { fullName, email, phone, address, password } = req.body;

  const user = await User.findById(req.user._id);
  if (!user) throw new ApiError(404, 'User not found');

  if (fullName) user.fullName = fullName;
  if (email) user.email = email;
  if (phone) user.phone = phone;
  if (address) user.address = address;
  if (password) user.password = password;

  await user.save();

  const updatedUser = await User.findById(req.user._id).select('-password');

  res.json(
    new ApiResponse(200, updatedUser, 'User profile updated successfully')
  );
});

export const updatePassword = asyncHandler(async (req, res) => {
  const { phone, password } = req.body;

  const user = await User.findOne({ phone });
  if (!user) {
    throw new ApiError(404, 'User not found');
  }

  user.password = password; // Will be hashed automatically
  await user.save();
  res.json(
    new ApiResponse(200,null, 'User profile updated successfully')
  );
});

// Logout User
export const logoutUser = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  // console.log("see: ", token);
  //Remove refresh token form the db
  await User.findOneAndUpdate(
    { _id: userId },
    { $unset: { refreshToken: 1 } },
    {
      new: true,
    }
  );
  const options = {
    httpOnly: true,
    secure: true,
    sameSite: "None" 
  };
  return res
    .status(200)
    .clearCookie('accessToken', options)
    .clearCookie('refreshToken', options)
    .json(new ApiResponse(200, {}, 'User logged Out'));
});


// In-memory store for OTPs (for demo; use Redis in production)
const otpStore = new Map();

// Send OTP
export const sendOtp = asyncHandler(async (req, res) => {
  const { number } = req.body;

  if (!number) {
    throw new ApiError(400, "Phone number is required");
  }
  const userExist = await User.find({phone:number})
  
  if(userExist.length > 0){
    const otp = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
    const expiresAt = Date.now() + 5 * 60 * 1000; // 5 minutes
  
    otpStore.set(number, { otp, expiresAt });
  
    return res
      .status(200)
      .json(new ApiResponse(200, otp, "OTP sent successfully"));
  }
  else{
    return res
      .status(204)
      .json(new ApiResponse(204, null, "Enter Registered Number"));
  }
});

// Verify OTP
export const verifyOtp = asyncHandler(async (req, res) => {
  const { number, otp } = req.body;

  if (!number || !otp) {
    throw new ApiError(400, "Both phone number and OTP are required");
  }

  const stored = otpStore.get(number);

  if (!stored) {
    throw new ApiError(400, "No OTP found for this number");
  }

  if (Date.now() > stored.expiresAt) {
    otpStore.delete(number);
    throw new ApiError(400, "OTP expired");
  }

  if (stored.otp !== otp) {
    throw new ApiError(401, "Invalid OTP");
  }

  otpStore.delete(number); // Clear after success

  return res
    .status(200)
    .json(new ApiResponse(200, null, "OTP verified successfully"));
});
