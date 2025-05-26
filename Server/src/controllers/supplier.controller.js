import { Supplier } from '../models/supplier.model.js';
import { User } from '../models/user.model.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { ApiError } from '../utils/ApiError.js';
import { uploadOnCloudinary } from '../utils/cloudinary.js';
// Create a new supplier
export const createSupplier = asyncHandler(async (req, res) => {
  const { supplierId, name, gstNumber, phone, email, address, serviceArea } =
    req.body;
    console.log("supplier : "+supplierId);
    
  const user = await User.findById(supplierId);
  if (!user) {
    throw new ApiError(401, 'User not found');
  }
  const existingSupplier = await Supplier.findOne({ supplierId });
    if (existingSupplier) {
      throw new ApiError(400, 'User already exists');
    }
  
  if (
    !supplierId ||
    !name ||
    !gstNumber ||
    !phone ||
    !email ||
    !address ||
    !serviceArea
  ) {
    throw new ApiError(400, 'All fields are required');
  }

  const supplier = await Supplier.create({
    supplierId,
    name,
    gstNumber,
    phone,
    email,
    address,
    serviceArea,
  });

  res
    .status(201)
    .json(new ApiResponse(201, supplier, 'Supplier created successfully'));
});

// Get all suppliers
export const getAllSuppliers = asyncHandler(async (req, res) => {
  const suppliers = await Supplier.find();
  res
    .status(200)
    .json(new ApiResponse(200, suppliers, 'Suppliers retrieved successfully'));
});

// Get a single supplier by ID
export const getSupplierById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const supplierId = id
  console.log('supplierId: ', supplierId);
  const supplier = await Supplier.find({supplierId: supplierId});

  if (!supplier) {
    throw new ApiError(404, 'Supplier not found');
  }
console.log('supplier: ', supplier);

  res
    .status(200)
    .json(new ApiResponse(200, supplier, 'Supplier retrieved successfully'));
});

// Update a supplier
export const updateSupplier = asyncHandler(async (req, res) => {
  const { name, gstNumber, phone, email, address, serviceArea } = req.body;
  const supplier = await Supplier.findOne({ supplierId: req.user?._id });
  let avatarUrl;
  if (req.file) {
    const avatarLocalPath = req.file.path;
    console.log(avatarLocalPath);

    const avatarResponse = await uploadOnCloudinary(avatarLocalPath);
    console.log('avatarResponse: ', avatarResponse);

    if (!avatarResponse) {
      throw new ApiError(500, 'Failed to upload avatar file');
    }

    avatarUrl = avatarResponse.url;
  }
  if (!supplier) {
    throw new ApiError(404, 'Supplier not found');
  }
  if (avatarUrl) {
    supplier.image = avatarUrl;
  }
  if (name) {
    supplier.name = name;
  }
  if (gstNumber) {
    supplier.gstNumber = gstNumber;
  }
  if (phone) {
    supplier.phone = phone;
  }
  if (email) {
    supplier.email = email;
  }
  if (address) {
    supplier.address = address;
  }
  if (serviceArea) {
    supplier.serviceArea = serviceArea;
  }

  await supplier.save();
  const updatedSupplier = await Supplier.find({ supplierId: req.user?._id });
  res
    .status(200)
    .json(
      new ApiResponse(200, updatedSupplier, 'Supplier updated successfully')
    );
});

// Delete a supplier
export const deleteSupplier = asyncHandler(async (req, res) => {
  const { id, role } = req.query; // ✅ Correct way to access query parameters

  if (!role || !id) {
    throw new ApiError(400, 'Id and Role are required');
  }

  const userRole = await User.findById(req.user._id);
  if (role === 'user' || userRole.role === 'user') {
    throw new ApiError(403, 'Unauthorized to delete supplier');
  }

  const supplier = await Supplier.findByIdAndDelete(id);
  if (!supplier) {
    throw new ApiError(404, 'Supplier not found');
  }
  const user = await User.findByIdAndUpdate(supplier.supplierId, {
    $set: { role: 'user' },
  });
  if (!user) {
    throw new ApiError(404, 'User not found');
  }

  res
    .status(200)
    .json(new ApiResponse(200, null, 'Supplier deleted successfully'));
});
