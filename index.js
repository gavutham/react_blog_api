const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const multer = require("multer");
const authRoute = require("./routes/auth");
const usersRoute = require("./routes/users");
const postsRoute = require("./routes/posts");
const categoriesRoute = require("./routes/categories");
const cors = require("cors");

const app = express();

dotenv.config();
app.use(express.json());
app.use(cors());

app.use("/images", express.static(path.join(__dirname, "/images")));

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, "images");
	},
	filename: (req, file, cb) => {
		cb(null, req.body.name);
	},
});

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
	res.status(200).json("file uploaded");
});

mongoose
	.connect(process.env.MONGO)
	.then(console.log("Succesfully Connected to database."))
	.catch((err) => console.error(err));

app.use("/api/auth/", authRoute);
app.use("/api/users/", usersRoute);
app.use("/api/posts/", postsRoute);
app.use("/api/categories/", categoriesRoute);

app.listen(process.env.PORT || 5000, () => {
	console.log("Server is up");
});
