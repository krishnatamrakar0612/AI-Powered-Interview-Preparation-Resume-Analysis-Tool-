const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");




const app = express();

// ================= MIDDLEWARES =================



const allowedOrigins = [
  "http://localhost:5173",
  process.env.CLIENT_URL,
].filter(Boolean);

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

app.use(express.json());

app.use(cookieParser());

// ================= ROUTES =================
const reportRoutes = require("./routes/report.routes");

const authRoutes = require("./routes/auth.routes");

const debugRoutes = require("./routes/debug.routes");

app.use("/api/reports", reportRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/debug", debugRoutes);

// ================= HEALTH CHECK =================

app.get("/", (req, res) => {
  res.send("API is running...");
});

// ================= 404 HANDLER =================

app.use((req, res) => {
  res.status(404).json({
    message: "Route not found",
  });
});

// ================= GLOBAL ERROR HANDLER =================

app.use((err, req, res, next) => {
  console.error(err.stack);

  res.status(500).json({
    message: "Internal Server Error",
  });
});

module.exports = app;
