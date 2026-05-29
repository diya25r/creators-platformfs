import React, { useState } from "react";
import axios from "axios";
import ImageUpload from "../components/ImageUpload";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [coverImageUrl, setCoverImageUrl] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleUpload = async (formData) => {
    try {
      setStatusMessage("Uploading image...");
      setErrorMessage("");
      console.log("Selected file:", formData.get("image"));

      const res = await axios.post("/api/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log("Upload response:", res.data);
      setCoverImageUrl(res.data.url);
      setStatusMessage("Image uploaded. Now create your post.");
    } catch (err) {
      console.log("Upload failed:", err);
      setStatusMessage("");
      setErrorMessage(
        err.response?.data?.message || "Image upload failed. Check that the backend is running."
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      setErrorMessage("Please enter a title and content.");
      return;
    }

    try {
      setStatusMessage("Creating post...");
      setErrorMessage("");

      const res = await axios.post("/api/posts", {
        title,
        content,
        username: "demoUser",
        coverImage: coverImageUrl,
      });

      console.log("Post created:", res.data);
      setStatusMessage("Post created successfully!");
      setTitle("");
      setContent("");
      setCoverImageUrl("");
    } catch (err) {
      console.log("Post error:", err);
      setStatusMessage("");
      setErrorMessage(
        err.response?.data?.message || "Post creation failed. Check that the backend is running."
      );
    }
  };

  return (
    <div>
      <h2>Create Post</h2>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <ImageUpload onUpload={handleUpload} />

        {coverImageUrl && <p>Uploaded Image URL ready</p>}
        {statusMessage && <p style={{ color: "green" }}>{statusMessage}</p>}
        {errorMessage && (
          <p role="alert" style={{ color: "red" }}>
            {errorMessage}
          </p>
        )}

        <button type="submit">Create Post</button>
      </form>
    </div>
  );
};

export default CreatePost;
