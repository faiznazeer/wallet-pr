const express = require("express");
const z = require("zod");
const { User, Account } = require("../db");
const { JWT_SECRET } = require("../config")
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middleware");

const router = express.Router();

const signUpBody = z.object({
    username: z.string().email(),
    firstName: z.string(),
    lastName: z.string(),
    password: z.string(),
});

router.post('/signup', async (req, res) => {
    const userDetails = req.body;
    const isPayLoadValid = signUpBody.safeParse(userDetails);
    if (!isPayLoadValid.success) {
        res.status(411).json({
            message: "Email already taken / Incorrect inputs"
        });
        return;
    }
    const isUserPresent = await User.findOne({
        username: userDetails.username,
    });
    if (isUserPresent) {
        res.status(411).json({
            message: "Email already taken / Incorrect inputs"
        });
        return;
    }
    const user = await User.create(userDetails);
    const UserId = user._id;
    await Account.create({userId: UserId, balance: 1 + Math.random() * 10000})
    const token = jwt.sign({ UserId }, JWT_SECRET);
    res.json({
        message: "User created successfully",
        token: token
    })
})

const signInBody = z.object({
    username: z.string().email(),
    password: z.string()
})

router.post('/signin', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const isPayLoadValid = signInBody.safeParse(req.body);
    if (!isPayLoadValid.success) {
        res.status(411).json({
            message: "Incorrect inputs"
        })
        return;
    }
    const isUserPresent = await User.findOne({username: username, password: password});
    if (!isUserPresent) {
        res.status(411).json({
            message: "Error while logging in"
        })
        return;
    }
    const UserId = isUserPresent._id;
    const token = jwt.sign({ UserId }, JWT_SECRET)
    res.json({
        token: token
    })
})

const updateBody = z.object({
    password: z.string().optional(),
    firstName: z.string().optional(),
    lastName: z.string().optional()
})

router.put('/', authMiddleware, async (req, res) => {
    const userId = req.userId;
    const isPayLoadValid = updateBody.safeParse(req.body);
    if(!isPayLoadValid.success) {
        res.status(411).json({
            message: "Error while updating information"
        });
        return;
    }
    await User.findOneAndUpdate(
        {_id: userId},
        {
            password: req.body.password,
            firstName: req.body.firstName,
            lastName: req.body.lastName
        });
    res.json({
        message: "User information updated successfully"
    })
})

router.get('/bulk', async (req, res) => {
    const filter = req.query.filter || "";

    const users = await User.find({
        $or: [{
            firstName: {
                "$regex": filter
            }
        }, {
            lastName: {
                "$regex": filter
            }
        }]
    })

    res.json({
        user: users.map(user => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    })
})


module.exports = router;