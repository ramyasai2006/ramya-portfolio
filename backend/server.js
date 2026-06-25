require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected");
  })
  .catch((err) => {
    console.error("❌ MongoDB Error:", err);
  });

// Contact Schema
const ContactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
});

const Contact = mongoose.model("Contact", ContactSchema);

// Test Route
app.get("/", (req, res) => {
  res.send("Backend Working ✅");
});

// Contact API
app.post("/contact", async (req, res) => {

    console.log("Request Body:", req.body);

    try {

        const data = new Contact(req.body);

        await data.save();

        console.log("Saved Successfully");

        res.json({
            message: "Message saved successfully"
        });

    } catch (error) {

        console.error("Full Error:");
        console.error(error);

        res.status(500).json({
            message: error.message
        });

    }

});

// Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running at port ${PORT}`);
});