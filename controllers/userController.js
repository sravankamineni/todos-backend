const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user')

const asyncHandler = require("express-async-handler")



const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body
    if (!username || !email || !password) {
        res.status(400)
        throw new Error("All fields are mandaroty")
    }
    const existingUser = await User.findOne({ email })

    if (existingUser) {
        res.status(400)
        throw new Error("User Already registerd")
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    // console.log(hashedPassword)
    const newUser = await User.create({
        username,
        email,
        password: hashedPassword
    });
    console.log(`user created ${newUser}`)
    if (newUser) {
        res.status(201).json({ _id: newUser.id, email: newUser.email })
    }
    else {
        res.status(400)
        throw new Error("User data is not valid")
    }
    res.json({ message: "User registered" })
})



const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        res.status(400)
        throw new Error("All fields are mandaroty")
    }
    const userExist = await User.findOne({ email })
    if (!userExist) {
        res.status(400)
        throw new Error("Invalid User")
    }
    const isMatch = await bcrypt.compare(password, userExist.password);

    if(!isMatch){
        res.status(404)
        throw new Error("Incorret Password")
    }

    if (userExist && isMatch) {
        const token = jwt.sign(
            {
                user: {
                    username: userExist.username,
                    email: userExist.email,
                    id: userExist.id
                }
            },
            process.env.JWT_SECRET,
            { expiresIn: '15m' }
        );

        res.status(201).json({ token })
    }
    else{
        res.status(400)
        throw new Error("Invalid Email or Passsword")
    }
   


})




module.exports = { registerUser, loginUser }