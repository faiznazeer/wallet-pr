const express = require("express");
const mongoose = require("mongoose");
const { Account } = require("../db");
const authMiddleware = require("../middleware");

const router = express.Router();

router.get('/balance', authMiddleware, async (req, res) => {
    const userId = req.userId;
    const userAccount = await Account.findOne({
        userId: userId
    });
    res.json({
        balance: userAccount.balance
    });
})

router.post('/transfer', authMiddleware, async (req, res) => {
    const { to, amount } = req.body;
    const session = await mongoose.startSession();

    try {
        session.startTransaction();

        const toAccount = await Account.findOne({ userId: to }).session(session);
        if (!toAccount) {
            await session.abortTransaction();
            res.status(400).json({
                message: "Invalid account"
            });
        }

        const fromAccount = await Account.findOne({ userId: req.userId }).session(session);
        if (fromAccount.balance < amount) {
            await session.abortTransaction();
            res.status(400).json({
                message: "Insufficient Balance"
            });
        }

        await Account.updateOne({ userId: req.userId },
            {$inc: {balance: -amount}}
        ).session(session);
        await Account.findOneAndUpdate({ userId: to },
            {$inc: {balance: amount}}
        ).session(session);
        await session.commitTransaction();
        res.json({
            message: "Transfer Successful"
        });
    }
    catch(error) {
        console.log("An error occurred during the transaction:" + error);
        await session.abortTransaction();
    }
    finally {
        await session.endSession();
    }
})

module.exports = router;