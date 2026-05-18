import express from "express";
import Post from "../models/Post.js";

const router = express.Router();

const postRoutes = (io) => {
  router.get("/", async (req, res) => {
    try {
      const posts = await Post.find().sort({ createdAt: -1 });
      res.status(200).json(posts);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  });

  router.post("/", async (req, res) => {
    try {
      const { title, content, username, coverImage } = req.body;

      // ✅ SAVE IN DATABASE
      const post = await Post.create({
        title,
        content,
        username,
        coverImage: coverImage || null,
      });

      // ✅ REALTIME UPDATE
      io.emit("newPost", {
        message: `New post created by ${username}!`,
        post,
      });

      res.status(201).json(post);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  });

  return router;
};

export default postRoutes;
