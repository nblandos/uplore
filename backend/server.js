import express from "express";
import dotenv from "dotenv";

import authRoutes from "./routes/authRoutes.js";
import { connect } from "mongoose";
import connectMongoDB from "./db/dbConnect.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  connectMongoDB();
});
