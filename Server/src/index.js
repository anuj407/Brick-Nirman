import dotenv from 'dotenv';
// import express from "express";
import { connectDB } from './db/db.js';
import { app } from './app.js';
dotenv.config();
connectDB();

// const PORT = process.env.PORT || 8000;
app.get('/', (req, res) => {
  res.send('Server is running');
});
app.listen(process.env.PORT || 3000 , () => console.log(`server is listening on Port : ${process.env.PORT || 3000}`));
