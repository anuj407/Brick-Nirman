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

const allowedOrigins = [
  'https://brick-nirman.vercel.app',
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
  })
);

// Allow preflight for all routes
app.options('*', cors());
app.use((err, req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.setHeader('Access-Control-Allow-Credentials', 'true');

  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});


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
