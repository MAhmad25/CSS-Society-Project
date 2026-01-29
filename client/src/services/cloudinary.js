// Cloudinary Configuration - Use environment variables or defaults
export const CLOUDINARY_CONFIG = {
  cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || "",
  uploadPreset: import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || "",
};

// Upload image to Cloudinary
export const uploadImageToCloudinary = async (file, folder = "css") => {
  // If unsigned preset exists, use direct unsigned upload
  if (CLOUDINARY_CONFIG.cloudName && CLOUDINARY_CONFIG.uploadPreset) {
    return new Promise((resolve, reject) => {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", CLOUDINARY_CONFIG.uploadPreset);
      if (folder) formData.append("folder", folder);

      fetch(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_CONFIG.cloudName}/image/upload`,
        {
          method: "POST",
          body: formData,
        },
      )
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
  }

  // Fallback: use server-side upload endpoint (/api/uploads)
  // This requires the backend to have the upload route mounted.
  const apiBase =
    import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";
  const fd = new FormData();
  fd.append("file", file);
  if (folder) fd.append("folder", folder);

  const resp = await fetch(`${apiBase}/uploads`, {
    method: "POST",
    body: fd,
  });
  const json = await resp.json();
  if (!resp.ok) {
    throw new Error(
      json.message ||
        json.error?.message ||
        json.data?.message ||
        "Server upload failed",
    );
  }
  return json.data?.secure_url || json.secure_url || json.data?.url;
};
