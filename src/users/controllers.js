const User = require("./model");


const registerUser = async (req, res) => {

    try {       

        const user = await User.create(req.body);

            res.status(201).json({
                message: "success",
                user: {
                    username: req.body.username,
                    email: req.body.email,
                    password: req.body.password,
        }});
    } catch (error) {
        res.status(501).json({ message: error.message, error: error })
    }
}

const login = async (req, res) => {
    try {

        res.status(201).json({ message: "success",
            user: {
                username: req.body.username,
                password: req.body.password
            }});
        
    } catch (error) {
        res.status(501).json({ message: error.message, error: error})
    }
}
module.exports = { registerUser, login, }