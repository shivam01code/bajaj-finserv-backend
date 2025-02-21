const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

app.post("/bfhl", (req, res) => {
  try {
    const { full_name, dob } = req.body;

    if (!full_name || !dob) {
      return res
        .status(400)
        .json({ is_success: false, message: "Invalid input format" });
    }

    res.json({
      is_success: true,
      user_id: `${full_name.replace(/\s/g, "_")}_${dob}`,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ is_success: false, message: "Server Error" });
  }
});

// GET: Return operation code
app.get("/bfhl", (req, res) => {
  res.status(200).json({ operation_code: 1 });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
