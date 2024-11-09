require("dotenv").config();
const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const productRoutes = require("./routes/products");
const dbConnect = require("./db");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/products", productRoutes);

dbConnect()
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
