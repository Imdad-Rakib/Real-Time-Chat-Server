// external imports
import bcrypt from "bcrypt";

// internal imports
import { People as User } from "../models/people.mjs";

function getLogin(req, res, next) {
    res.render("index");
}
async function login(req, res, next) {
    try {
        const user = await User.findOne({
            email: req.body.email
        });
        if (user && user._id) {
            const isValidPassword = await bcrypt.compare(
                req.body.password,
                user.password
            );
            if (isValidPassword) {
                const userObject = {
                    name: user.name,
                    email: user.email,
                };
                res.status(500).json(userObject);
            } else {
                res.json({
                    error: 'Invalid email or password'
                })
            }
        } else {
            res.json({
                error: 'Invalid email or password'
            })
        }
    } catch (err) {
        console.log(err);
        res.json({
            error: 'Internal server error'
        })
    } 
}

function logout(req, res) {
    res.clearCookie(process.env.COOKIE_NAME);
    res.send("logged out");
}

export{
    getLogin,
    login,
    logout
};
