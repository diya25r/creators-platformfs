import express from "express";
import http from "http";
import { Server } from "socket.io";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import postRoutes from "./routes/posts.js";

dotenv.config();

const app = express();
app.use(express.json());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
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

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});