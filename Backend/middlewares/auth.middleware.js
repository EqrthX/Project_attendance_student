import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
    const token = req.cookies.token || req.header.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({
            message: "Unauthorized! Token is required.",
            status: false
        })
    }

    try {
        const decode = jwt.verify(token, process.env.JWT_TOKEN)
        req.user = decode
        next()
    } catch (error) {
        return res.status(403).json({ message: "Invalid or Expired Token" })
    }
}