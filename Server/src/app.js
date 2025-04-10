import express, { urlencoded } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
const app = express();
import orderRouter from './routes/order.routes.js';
import productRouter from './routes/product.routes.js';
import AddToFavRouter from './routes/addToFav.routes.js';
import AddToCartRouter from './routes/addToCart.routes.js';
import userRouter from './routes/user.routes.js';
import supplierRouter from './routes/supplier.routes.js';

app.use(
  cors({
    origin:
      'https://brick-nirman-frontend.vercel.app' || process.env.CORS_ORIGIN,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(express.static('public'));
app.use(cookieParser());

//import Route
app.use('/api/v1/orders', orderRouter);
app.use('/api/v1/products', productRouter);
app.use('/api/v1/addToFav', AddToFavRouter);
app.use('/api/v1/addToCart', AddToCartRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/suppliers', supplierRouter);

export { app };
