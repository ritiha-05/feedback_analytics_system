const Admin = require("../models/Admin");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {
  try {
    const email = req.body.email?.trim().toLowerCase();
    const password = req.body.password;

    if (!email || !password) {
      return res.status(400).json({ msg: "Email and password required" });
    }

    const admin = await Admin.findOne({ email });

    // ⭐ DEBUG 1 — after DB query
    console.log("ADMIN FROM DB:", admin);
   

    if (!admin) {
      return res.status(401).json({ msg: "Invalid credentials" });
    }

    const match = await bcrypt.compare(password, admin.password);

    // ⭐ DEBUG 2 — after compare
    console.log("MATCH RESULT:", match);

    if (!match) {
      return res.status(401).json({ msg: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: admin._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({ token });

  } catch (err) {
    console.error("Auth error:", err);
    res.status(500).json({ msg: "Server error" });
  }
};

