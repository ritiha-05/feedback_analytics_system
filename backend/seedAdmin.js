const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const Admin = require("./models/Admin");

(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("CONNECTED TO DB:", mongoose.connection.name);

    const hashedPassword = await bcrypt.hash("admin123", 10);

    // ⭐ FORCE UPDATE EXISTING ADMIN
    const admin = await Admin.findOneAndUpdate(
      { email: "admin@test.com" },
      { email: "admin@test.com", password: hashedPassword },
      { new: true, upsert: true } // create if missing
    );

    console.log("SEEDED ADMIN:", admin);

    console.log("✅ Admin seeded successfully");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();

