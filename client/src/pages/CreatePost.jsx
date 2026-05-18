import ImageUpload from "../components/ImageUpload";

export default function CreatePost() {
  const handleUpload = (formData) => {
    console.log(formData.get("image"));
  };

  return (
    <div>
      <h2>Create Post</h2>
      <ImageUpload onUpload={handleUpload} />
    </div>
  );
}