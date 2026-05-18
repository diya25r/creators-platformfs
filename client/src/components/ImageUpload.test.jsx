import { fireEvent, render, screen } from "@testing-library/react";
import ImageUpload from "./ImageUpload";

describe("ImageUpload", () => {
  let createObjectURL;
  let revokeObjectURL;

  beforeEach(() => {
    URL.createObjectURL = jest.fn();
    URL.revokeObjectURL = jest.fn();

    createObjectURL = jest
      .spyOn(URL, "createObjectURL")
      .mockImplementation((file) => `blob:${file.name}`);
    revokeObjectURL = jest.spyOn(URL, "revokeObjectURL").mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  const uploadFile = (file, onUpload = jest.fn()) => {
    render(<ImageUpload onUpload={onUpload} />);
    fireEvent.change(screen.getByLabelText(/select image/i), {
      target: { files: [file] },
    });

    return onUpload;
  };

  test("shows a preview and enables upload for a valid image", () => {
    const file = new File(["image-data"], "photo.png", { type: "image/png" });

    uploadFile(file);

    expect(screen.getByAltText(/preview/i)).toHaveAttribute("src", "blob:photo.png");
    expect(screen.getByRole("button", { name: /upload/i })).toBeEnabled();
  });

  test("shows an error and no preview for a wrong file type", () => {
    const file = new File(["not-image"], "notes.txt", { type: "text/plain" });

    uploadFile(file);

    expect(screen.getByRole("alert")).toHaveTextContent(/valid image file/i);
    expect(screen.queryByAltText(/preview/i)).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: /upload/i })).toBeDisabled();
  });

  test("shows an error for an image larger than 5MB", () => {
    const file = new File([new Uint8Array(5 * 1024 * 1024 + 1)], "large.jpg", {
      type: "image/jpeg",
    });

    uploadFile(file);

    expect(screen.getByRole("alert")).toHaveTextContent(/file too large/i);
    expect(screen.queryByAltText(/preview/i)).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: /upload/i })).toBeDisabled();
  });

  test("updates preview and revokes the old blob URL when switching files", () => {
    render(<ImageUpload onUpload={jest.fn()} />);
    const input = screen.getByLabelText(/select image/i);

    fireEvent.change(input, {
      target: { files: [new File(["first"], "first.webp", { type: "image/webp" })] },
    });
    fireEvent.change(input, {
      target: { files: [new File(["second"], "second.gif", { type: "image/gif" })] },
    });

    expect(screen.getByAltText(/preview/i)).toHaveAttribute("src", "blob:second.gif");
    expect(revokeObjectURL).toHaveBeenCalledWith("blob:first.webp");
  });

  test("submits FormData with the selected file", () => {
    const file = new File(["image-data"], "photo.png", { type: "image/png" });
    const onUpload = uploadFile(file);

    fireEvent.click(screen.getByRole("button", { name: /upload/i }));

    expect(onUpload).toHaveBeenCalledTimes(1);
    const formData = onUpload.mock.calls[0][0];
    expect(formData).toBeInstanceOf(FormData);
    expect(formData.get("image")).toBe(file);
  });
});
