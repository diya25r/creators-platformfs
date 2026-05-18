import React, { useEffect, useState } from "react";

const ImageUpload = ({ onUpload }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [error, setError] = useState("");

  const validateFile = (file) => {
    if (!file) return "No file selected";

    const validTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];

    if (!validTypes.includes(file.type)) {
      return "Please select a valid image file (jpeg, png, webp, gif)";
    }

    if (file.size > 5 * 1024 * 1024) {
      return `File too large. Max allowed is 5MB. Your file is ${(file.size / (1024 * 1024)).toFixed(
        2
      )}MB`;
    }

    return null;
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) {
      setSelectedFile(null);
      setPreviewUrl(null);
      setError("");
      return;
    }

    const validationError = validateFile(file);

    if (validationError) {
      setError(validationError);
      setSelectedFile(null);
      setPreviewUrl(null);
      return;
    }

    setError("");
    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  useEffect(() => {
    if (!previewUrl) return undefined;

    return () => {
      URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const handleUploadClick = () => {
    if (!selectedFile || error) return;

    const formData = new FormData();
    formData.append("image", selectedFile);

    onUpload(formData);
  };

  return (
    <div className="p-4 border rounded">
      <label htmlFor="image-upload">Select image</label>
      <input id="image-upload" type="file" accept="image/*" onChange={handleFileChange} />

      {error && (
        <p role="alert" style={{ color: "red", marginTop: "10px" }}>
          {error}
        </p>
      )}

      {previewUrl && !error && (
        <div style={{ marginTop: "10px" }}>
          <img
            src={previewUrl}
            alt="preview"
            style={{
              width: "200px",
              height: "200px",
              objectFit: "cover",
              borderRadius: "8px",
            }}
          />
        </div>
      )}

      <button
        type="button"
        onClick={handleUploadClick}
        disabled={!selectedFile || !!error}
        style={{ marginTop: "10px" }}
      >
        Upload
      </button>
    </div>
  );
};

export default ImageUpload;
