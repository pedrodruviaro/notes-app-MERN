const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
// import routes
const authRoutes = require("./routes/auth");
const noteRoutes = require("./routes/note");

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;
const uri = process.env.MONGO_URI;

app.use(cors({ origin: "*" }));

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoutes);
app.use("/api/notes", noteRoutes);

mongoose.connect(uri, () => {
    app.listen(port, () => console.log("Server running!"));
});
