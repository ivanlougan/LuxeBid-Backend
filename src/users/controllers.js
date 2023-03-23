const User = require("./model");
const jwt = require("jsonwebtoken");

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
};

const login = async (req, res) => {
    try {
        if(req.authCheck) {
        res.status(201).json({ message: "success",
            user: {
                username: req.authCheck.username,
                password: req.authCheck.email
            }});
            return;  
        }

        const token = await jwt.sign({ id: req.user.id }, process.env.SECRET_KEY);
        
        res.status(201).json({ 
            message: "success",
            user: {
                username: req.user.username,
                email: req.user.email,
                token: token,
            }
        });
    } catch (error) {
        res.status(501).json({ message: error.message, error: error})
    }
};

const updateUser = async (req, res) => {
    try {
        if (!req.authCheck) {
            const error = new Error("User is not authorised");
            res.status(401).json({ errorMessage: error.message, error: error });
        }
      await User.update({ 
            [req.body.updateKey]: req.body.updateValue }, 
            { where: { username: req.body.username }}
        );
        res.status(201).json({ message: "success", username: updateUser });
      
    } catch (error) {
      console.log(error);
      res.status(500).send({ error: error.message });
    }
};

const deleteUser = async (req, res) => {
    try {
        if (!req.authCheck) {
            const error = new Error("User is not authorised");
            res.status(401).json({ errorMessage: error.message, error: error });
        }
        const deleteUser = await User.destroy({ where: { username: req.body.username } });
        res.status(201).json({ message: "successfully deleted", result: deleteUser });
    }
    catch (error) {
        res.status(501).json({ errorMessage: error.message, error: error });
    }
};

module.exports = { registerUser, login, updateUser, deleteUser}