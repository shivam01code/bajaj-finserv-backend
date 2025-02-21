const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

app.post("/bfhl", (req, res) => {
  try {
    const { data, full_name, dob, email, roll_number } = req.body;

    if (!Array.isArray(data)) {
      return res.status(400).json({ is_success: false, message: "Invalid input format" });
    }

    const numbers = data.filter((item) => !isNaN(item));
    const alphabets = data.filter((item) => /^[A-Z a-z]$/.test(item));

    const highest_alphabet = alphabets.length
      ? [alphabets.sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase())).pop()]
      : [];

    const response = {
      is_success: true,
      user_id: `${full_name}_${dob}`,
      email: email,
      roll_number: roll_number,
      numbers: numbers.map(String),
      alphabets: alphabets.map(String),
      highest_alphabet: highest_alphabet.map(String),
    };

    res.json(response);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ is_success: false, message: "Server Error" });
  }
});

app.get("/bfhl", (req, res) => {
  res.status(200).json({ operation_code: 1 });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
