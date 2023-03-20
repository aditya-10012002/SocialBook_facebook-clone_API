const User = require('../models/User');
const router = require('express').Router();
const bcrypt = require('bcrypt');
const { json } = require('express');


// Register

router.post("/register", async (req, res) => {

    try {
        if (req.body.password.length < 6) return res.status(403).json("Password should contain atleast 6 char.");
        if (req.body.password !== req.body.passwordAgain) return res.status(403).json("Passwords don't match.");

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
            coverPicture: "https://res.cloudinary.com/du7cjrksv/image/upload/v1679119215/Socialbook/rrr99gbuuea1dalcdzsk.png",
            profilePicture: "https://res.cloudinary.com/du7cjrksv/image/upload/v1679119382/Socialbook/y0eplfrslmzovznkhzpi.jpg"
        });

        const invalidUsername = await User.findOne({ username: newUser.username });
        if (invalidUsername) return res.status(403).json("Username already in use.");

        const invalidEmail = await User.findOne({ email: newUser.email });
        if (invalidEmail) return res.status(403).json("Email already in use.");

        const user = await newUser.save();
        res.status(200).json(user);
    } catch (error) {
        return res.status(500).json(error);
    }
})


// Login

router.post("/login", async (req, res) => {

    try {
        const user = await User.findOne({ email: req.body.email });
        if(!user) return res.status(404).json("User not found");

        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if(!validPassword) return res.status(400).json("Wrong Password");

        res.status(200).json(user);
    } catch (error) {
        return res.status(500).json(error);
    }
})

module.exports = router;