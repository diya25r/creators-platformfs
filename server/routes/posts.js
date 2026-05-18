import express from "express";

const router = express.Router();

const postRoutes = (io) => {
  // Create post
  router.post("/", async (req, res) => {
    try {
      const { title, content, username } = req.body;

      const post = {
        title,
        content,
        username,
      };

      // ✅ Emit realtime event
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
