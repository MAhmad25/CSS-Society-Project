const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const cloudinary = require("../middleware/cloudinary");

// POST /api/uploads
// body: multipart/form-data with `file` and optional `folder`
router.post("/", upload.single("file"), async (req, res) => {
      try {
            if (!req.file) {
                  return res.status(400).json({ status: "error", message: "No file provided" });
            }

            const folder = req.body.folder || "css";

            cloudinary.uploader
                  .upload_stream({ resource_type: "image", folder }, (error, result) => {
                        if (error) {
                              return res.status(500).json({ status: "error", message: "Cloudinary upload failed", error });
                        }

                        // Return a consistent shape
                        res.status(200).json({ status: "success", data: { secure_url: result.secure_url, public_id: result.public_id } });
                  })
                  .end(req.file.buffer);
      } catch (err) {
            res.status(500).json({ status: "error", message: err.message });
      }
});

module.exports = router;
