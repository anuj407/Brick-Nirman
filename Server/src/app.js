import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();

// ROUTES
import orderRouter from './routes/order.routes.js';
import productRouter from './routes/product.routes.js';
import AddToFavRouter from './routes/addToFav.routes.js';
import AddToCartRouter from './routes/addToCart.routes.js';
import userRouter from './routes/user.routes.js';
import supplierRouter from './routes/supplier.routes.js';

// ✅ CORS CONFIG — placed at the top
const corsOptions = {
  origin: "https://brick-nirman.vercel.app",
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // ✅ Handles preflight requests

// ✅ Middlewares
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(express.static('public'));
app.use(cookieParser());

// ✅ Routes
app.use('/api/v1/orders', orderRouter);
app.use('/api/v1/products', productRouter);
app.use('/api/v1/addToFav', AddToFavRouter);
app.use('/api/v1/addToCart', AddToCartRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/suppliers', supplierRouter);

export { app };
