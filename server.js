const express = require("express");
const app = express();

const dotenv = require("dotenv");
const cors = require("cors");
const cookieparser = require("cookie-parser");
const dbConnect = require("./config/database");

dotenv.config();
dbConnect();

app.use(express.json());
app.use(
  cors({
    origin: "http:localhost:5173",
    credentials: true,
  }),
);
app.use(cookieparser);

const userRoutes = require("./routes/User");
app.use("/api/v1/auth", userRoutes);

app.get("/", (req, res) => {
  res.send("Anmol Perfumery Udyog API is running...");
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
