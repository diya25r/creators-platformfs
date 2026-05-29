import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import socket from "../services/socket";

export default function Dashboard() {
  const [posts, setPosts] = useState([]);

  // ✅ FETCH POSTS
  const fetchPosts = async () => {
    try {
      const res = await axios.get("/api/posts");
      setPosts(res.data);
    } catch (err) {
      console.log("Error fetching posts:", err);
    }
  };

  useEffect(() => {
    // load posts initially
    fetchPosts();

    // connect socket
    socket.connect();

    socket.on("connect", () => {
      console.log("Connected:", socket.id);
    });

    socket.on("disconnect", () => {
      console.log("Disconnected");
    });

    socket.on("connect_error", (err) => {
      console.log("Socket error:", err.message);
    });

    // ✅ REALTIME NEW POST
    socket.on("newPost", (data) => {
      toast.success(data.message);

      // instantly update UI
      setPosts((prev) => [data.post, ...prev]);
    });

    // cleanup
    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("connect_error");
      socket.off("newPost");
      socket.disconnect();
    };
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Dashboard</h1>

      {posts.length === 0 ? (
        <p>No posts yet...</p>
      ) : (
        posts.map((post) => (
          <div
            key={post._id}
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              marginBottom: "15px",
              borderRadius: "8px",
            }}
          >
            <h3>{post.title}</h3>
            <p>{post.content}</p>

            {/* IMAGE */}
            {post.coverImage && (
              <img
                src={post.coverImage}
                alt={`Cover image for ${post.title}`}
                width="200"
                style={{ borderRadius: "6px" }}
              />
            )}
          </div>
        ))
      )}
    </div>
  );
}