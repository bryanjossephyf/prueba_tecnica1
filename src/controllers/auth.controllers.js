import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"


/* users for login */

const users = [
    {
        user: "Bryan",
        password: "contraseña123" ,
    },
    {
        user: "Josseph",
        password: "123"
    }
]

/* hash password */

const encryUsers = users.map((user)=>{
    return {
        ...user,
        password: bcrypt.hashSync(user.password, 10)
    }
})
 
/*  */
class AuthControllers {
    constructor(){}

    authenticate(req,res){
        const { user, password } = req.body

        //if users exist
        const foundUser = encryUsers.find((x) => {
            return x.user === user
        })

        if(!foundUser){
            return res.status(400).json({ message: "User not found" });
        }

        //if the passowrd is correct
        const validPassword = bcrypt.compareSync(password, foundUser.password)
        
        if(!validPassword){
            return res.status(401).json({ message: "Invalid password" });
        }

        //create jwt
        const token = jwt.sign({user:foundUser.user}, process.env.SECRET_WORD, {
            expiresIn: "1h",
        })

        res.cookie("login", token, {
            maxAge: 100* 60 * 60,
            httpOnly: true
        }).json({
            token
        })
    }
}

export default new AuthControllers()
