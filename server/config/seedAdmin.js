const User = require("../src/models/User");

const createAdminUser = async () => {
      try {
            // Check if admin already exists
            const adminExists = await User.findOne({ role: "admin" });

            if (adminExists) {
                  console.log("✅ Admin user already exists");
                  return;
            }

            // Create admin user with default credentials
            const admin = new User({
                  email: process.env.ADMIN_EMAIL || "admin@gcu.edu.pk",
                  password: process.env.ADMIN_PASSWORD || "Admin@123456",
                  fullName: "Admin",
                  role: "admin",
                  isActive: true,
            });

            await admin.save();

            console.log("✅ Admin user created successfully");
            console.log(`📧 Email: ${admin.email}`);
            console.log("⚠️  Please change the default password after first login");
      } catch (error) {
            console.error("❌ Error creating admin user:", error.message);
      }
};

module.exports = { createAdminUser };
