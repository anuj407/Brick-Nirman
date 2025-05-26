import mongoose from 'mongoose';
import { Product } from '../models/product.models.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { uploadOnCloudinary } from '../utils/cloudinary.js';
import { Supplier } from '../models/supplier.model.js';

export const createProduct = asyncHandler(async (req, res) => {
  const { name, price, quantityAvailable, size, grade } =
    req.body;
   
  // ✅ Validation: Ensure required fields
  if (
    !name ||
    !price ||
    !quantityAvailable ||
    !size ||
    !grade
  ) {
    throw new ApiError(400, 'All fields are required');
  }

  // ✅ Extract image paths from `req.files`
  const imagePaths = req.file?.path;

  // ✅ Validate image presence
  if (!imagePaths) {
    throw new ApiError(400, 'image is required');
  }

  const uploadedImage = await uploadOnCloudinary(imagePaths);

  if (!uploadedImage) {
    throw new ApiError(500, `Failed to upload image`);
  }

  // ✅ Create new product with Cloudinary URLs
  const newProduct = await Product.create({
    name,
    price,
    quantityAvailable,
    size,
    grade,
    image: uploadedImage.secure_url,
    supplierId: req.user._id,
  });

  res
    .status(201)
    .json(
      new ApiResponse(
        201,
        true,
        newProduct,
        null,
        'Product created successfully'
      )
    );
});

export const getAllProducts = asyncHandler(async (req, res) => {
  const products = await Product.find();
  let message;
  if (products.length === 0) {
    message = 'No products found';
  } else {
    message = 'Products fetched successfully';
  }

  res.status(200).json(new ApiResponse(200, products, message));
});

export const getProductById = asyncHandler(async (req, res) => {
 console.log("Id "+ req.params.id);
 
  const product = await Product.findById(req.params.id)
  const supplier = await Supplier.findOne({supplierId: product.supplierId});

  const data = {product: product, supplier: supplier}
  let message;
  if (product.length === 0) {
    message = 'No products found';
  } else {
    message = 'Products fetched successfully';
  }

  res.status(200).json(new ApiResponse(200, data, message));
});
export const getProductsBySupplierId = asyncHandler(async (req, res) => {
  console.log("Supplier ID: " + req.params.id);
  
  const products = await Product.find({ supplierId: req.params.id });
  console.log("products", products);
  
  let message;
  
  if (!products || products.length === 0) {
    message = 'No products found for this supplier';
  } else {
    message = 'Products fetched successfully';
  }

  res.status(200).json(new ApiResponse(200, products, message));
});
export const updateProduct = asyncHandler(async (req, res) => {
  const {
    name,
    description,
    category,
    price,
    quantityAvailable,
    size,
    grade,
    supplierId,
  } = req.body;

  const product = await Product.findById(req.params.id);

  if (!product) {
    throw new ApiError(404, 'Product not found');
  }

  // ✅ Extract image paths from `req.files`
  const imagePaths = req.files?.images?.path;
  let uploadedImage;
  if (imagePaths) {
    uploadedImage = await uploadOnCloudinary(path);
  }

  // ✅ Update only provided fields
  if (name) product.name = name;
  if (description) product.description = description;
  if (category) product.category = category;
  if (price) product.price = price;
  if (quantityAvailable) product.quantityAvailable = quantityAvailable;
  if (size) product.size = size;
  if (grade) product.grade = grade;
  if (supplierId) product.supplierId = supplierId;
  if (uploadedImage) product.images = uploadedImage;

  await product.save();

  res
    .status(200)
    .json(new ApiResponse(200, product, 'Product updated successfully'));
});

export const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id);

  if (!product) {
    throw new ApiError(404, 'Product not found');
  }

  res.status(200).json(new ApiResponse(200, 'Product deleted successfully'));
});
