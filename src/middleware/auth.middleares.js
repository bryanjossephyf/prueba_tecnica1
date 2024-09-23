import jwt from "jsonwebtoken";


const verifyToken = (req,res,next) => {
    const token = req.cookies.login

    if(!token){
        return res.status(400).json({message: "token no provieded"})
    }

    try {
        const payload = jwt.verify(token, process.env.SECRET_WORD)
        req.user = payload.user
        next()
    } catch (error) {
        return res.status(403).json({ message: "Token not valid" });
    }
    
}

export default verifyToken 