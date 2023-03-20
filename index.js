const express = require('express');
const app = express();

const mongoose = require('mongoose');
const dotenv = require('dotenv');
const helmet = require('helmet');
const morgan = require('morgan');
const multer = require('multer');
const path = require('path');

const userRoute = require('./routes/users');
const authRoute = require('./routes/auth');
const postRoute = require('./routes/posts');
const { storage } = require('./cloudinary/index');

if (process.env.NODE_ENV !== "production") {
    dotenv.config();
}

mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log("Connected to MONGODB")
});

app.use("/images", express.static(path.join(__dirname, "public/images")));

// Middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

const upload = multer({ storage });

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, "public/images/" + req.body.dest);
//     },
//     filename: (req, file, cb) => {
//         cb(null, req.body.name);
//     }
// })

app.post("/api/upload", upload.single("file"), (req, res) => {
    try {
        // console.log(req.file);
        return res.status(200).json(req.file.path);
    } catch (err) {
        console.log(err)
    }
});

app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);

// // static files
// app.use(express.static(path.join(__dirname, '../client/build')));
// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, '../client/build/index.html'));
// })

app.listen(8800, () => {
    console.log("Backend server is running.");
})