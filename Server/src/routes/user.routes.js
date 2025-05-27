import { Router } from 'express';
import {
  registerUser,
  loginUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  AccessRefreshToken,
  sendOtp,
  verifyOtp,
  updatePassword
} from '../controllers/user.controller.js';
import { upload } from '../middlewares/multer.middleware.js';
import { verifyJwt } from '../middlewares/auth.middleware.js';

const router = Router();

// User Registration
router.route('/register').post(registerUser);

// User Login
router.route('/login').post(loginUser);

// User Logout
router.route('/logout').post(verifyJwt, logoutUser);

// Get User Profile (Protected Route)
router.route('/profile').get(verifyJwt, getUserProfile);

// Update User Profile (Protected Route)
router.route('/update-profile').put(verifyJwt, updateUserProfile);
router.route('/update-password').put( updatePassword);

router.route('/refresh-token').post(verifyJwt, AccessRefreshToken);
export default router;

router.post("/send-otp", sendOtp);
router.post("/verify-otp", verifyOtp);