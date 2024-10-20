import React, { useState } from "react";
import axios from "axios";
import "../assets/ImageUpload.css";

const ImageUpload = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [uploadStatus, setUploadStatus] = useState("");
    const [id, setId] = useState("");
    const [uploadedFiles, setUploadedFiles] = useState([]); // For keeping track of uploaded files

    // Handle file selection or drop
    const handleFileChange = (e) => {
        const file = e.target.files ? e.target.files[0] : e.dataTransfer.files[0];
        setSelectedImage(file);

        const fileReader = new FileReader();
        fileReader.onloadend = () => {
            setPreview(fileReader.result);
        };
        fileReader.readAsDataURL(file);
    };

    // Drag and drop handlers
    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleDrop = (e) => {
        e.preventDefault();
        handleFileChange(e);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!selectedImage) {
            setUploadStatus("Please select an image first.");
            return;
        }

        if (!id) {
            setUploadStatus("Please provide an ID.");
            return;
        }

        const formData = new FormData();
        formData.append("image", selectedImage);
        formData.append("id", id);

        try {
            const response = await axios.post("http://localhost:8080/LuxuryHairVendingSystemDB/tips/save", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            // Update uploaded files list
            setUploadedFiles((prevFiles) => [...prevFiles, { id, name: selectedImage.name }]);
            setUploadStatus("Image uploaded successfully!");
        } catch (error) {
            setUploadStatus("Error uploading image. Please try again.");
        }
    };

    return (
        <div className="upload-container">
            <div className="upload-box">
                <div
                    className="drag-drop-area"
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                >
                    <p>Drag and Drop files to upload</p>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        style={{ display: "none" }}
                        id="file-input"
                    />
                    <label htmlFor="file-input" className="browse-button">
                        Browse
                    </label>
                </div>

                {preview && (
                    <div className="preview-section">
                        <h3>Image Preview:</h3>
                        <img src={preview} alt="Preview" style={{ maxWidth: "300px", marginTop: "10px" }} />
                    </div>
                )}
            </div>

            <div className="uploaded-files">
                <h3>Uploaded Files</h3>
                <ul>
                    {uploadedFiles.map((file, index) => (
                        <li key={index}>
                            {file.name} <span>ID: {file.id}</span>
                        </li>
                    ))}
                </ul>
            </div>

            <form onSubmit={handleSubmit}>
                <div>
                    <input
                        type="text"
                        placeholder="Enter ID"
                        value={id}
                        onChange={(e) => setId(e.target.value)}
                    />
                </div>
                <button type="submit">Upload Image</button>
            </form>

            {uploadStatus && <p>{uploadStatus}</p>}
        </div>
    );
};

export default ImageUpload;
