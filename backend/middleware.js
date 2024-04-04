const { JWT_SECRET } = require("./config");
const jwt = require("jsonwebtoken");


const authMiddleware = (req, res, next) => {
    const auth = req.headers.authorization;
    if (!auth || !auth.startsWith('Bearer ')) {
        res.status(403).send("Invalid User!")
        return;
    }
    const token = auth.split(' ')[1]
    try{
        const decoded = jwt.verify(token, JWT_SECRET);
        req.userId = decoded.UserId;
        next();
    }
    catch {
        res.status(403).send("Unable to verify user")
    }
};

module.exports = authMiddleware;