import dotenv from "dotenv";
import express from "express";
import uploadRoutes from "./routes/upload.js";
import http from "http";
import mongoose from "mongoose";
import { Server } from "socket.io";
import jwt from "jsonwebtoken";

import postRoutes from "./routes/posts.js";

dotenv.config();

const app = express();
app.use(express.json());

app.use("/api/upload", uploadRoutes);

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000", "http://localhost:5173"],
    credentials: true,
  },
});

// ✅ Socket Authentication Middleware
io.use((socket, next) => {
  try {
    const token = socket.handshake.auth.token;

    if (!token) {
      return next(new Error("No token"));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    socket.data.user = decoded;

    next();
  } catch (error) {
    next(new Error("Invalid token"));
  }
});

// ✅ Connection handler
io.on("connection", (socket) => {
  console.log(
    `User connected: ${socket.data.user.email}`
  );

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

// ✅ Pass io into routes
app.use("/api/posts", postRoutes(io));

const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.warn("MONGODB_URI is not set. Post creation will fail until MongoDB is configured.");
} else {
  mongoose
    .connect(MONGODB_URI)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.error("MongoDB connection error:", err.message));
}

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Graceful error handling for listen failures (e.g. port in use)
server.on("error", (err) => {
  if (err && err.code === "EADDRINUSE") {
    console.error(`Port ${PORT} is already in use. Stop the process using it or set a different PORT and retry.`);
    process.exit(1);
  }
  console.error("Server error:", err);
  process.exit(1);
});
