// Cloudinary Configuration - Use environment variables or defaults
export const CLOUDINARY_CONFIG = {
      cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || "demo",
      uploadPreset: import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || "unsigned_preset",
};

// Upload image to Cloudinary
export const uploadImageToCloudinary = async (file) => {
      // Validate configuration
      if (CLOUDINARY_CONFIG.cloudName === "demo" || CLOUDINARY_CONFIG.uploadPreset === "unsigned_preset") {
            throw new Error("Cloudinary is not configured. Please set VITE_CLOUDINARY_CLOUD_NAME and VITE_CLOUDINARY_UPLOAD_PRESET in your .env file. For now, images can be added via URL.");
      }

      return new Promise((resolve, reject) => {
            const formData = new FormData();
            formData.append("file", file);
            formData.append("upload_preset", CLOUDINARY_CONFIG.uploadPreset);

            fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CONFIG.cloudName}/image/upload`, {
                  method: "POST",
                  body: formData,
            })
                  .then((res) => res.json())
                  .then((data) => {
                        if (data.secure_url) {
                              resolve(data.secure_url);
                        } else {
                              reject(new Error(data.error?.message || "Upload failed"));
                        }
                  })
                  .catch((err) => reject(err));
      });
};
