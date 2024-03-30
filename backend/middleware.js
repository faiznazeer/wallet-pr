const JWT_SECRET = require("./config");
const jwt = require("jsonwebtoken");


export function authMiddleware(req, res) {
    const auth = req.headers.authorization;
    if (!auth || !auth.startsWith('Bearer ')) {
        res.status(403).send("Invalid User!")
    }
    const token = auth.split(' ')[1]
    try{
        const decoded = jwt.verify(token, JWT_SECRET);
        req.userId = decoded.userId;
        next();
    }
    catch {
        res.status(403).send("Invalid User!")
    }
};
