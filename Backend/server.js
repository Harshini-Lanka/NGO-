import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";
import registrationRoutes from "./routes/registrationRoutes.js";


dotenv.config();

connectDB();

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://ngo-lime-mu.vercel.app",
    ],
    credentials: true,
  })
);
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/registrations", registrationRoutes);

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Ekk Kadam Backend Running 🚀",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});