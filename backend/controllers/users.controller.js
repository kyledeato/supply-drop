const jwt = require("jsonwebtoken");
const { User } = require('../models/user.model');
const bcrypt = require('bcrypt');
console.log(User);

module.exports = {
    login: async (req, res) => {
        const user = await User.findOneUser({ email: req.body.email });

        if (user === null) {
            return res.sendStatus(400);
        }

        const correctPassword = await bcrypt.compare(req.body.password, user.password);

        if (!correctPassword) {
            return res.sendStatus(400);
        }

        const userToken = jwt.sign({
            id: user._id
        }, process.env.SECRET_KEY);

        res
            .cookie("usertoken", userToken, process.env.SECRET_KEY, {
                httpOnly: true
            })
            .json({ msg: "success!" });
    },

    register: async (req, res) => {
        try {
            let user = req.body
            if (user.password != user.confirmPassword) {
                throw new Error("Passwords don't match")
            }
            const newuser = await User.create(user)
                .then(user => {
                    console.log("HERE")
                    const userToken = jwt.sign({
                        id: user._id
                    }, process.env.SECRET_KEY);
                    res.cookie("usertoken", userToken, process.env.SECRET_KEY, {
                        httpOnly: true
                    })
                        .json({ msg: "success!", user: user });
                })
            res.json(newuser)

        }
        catch (err) {
            console.log(err)
            res.status(400).json(err)
        }
    },

    logout: (req, res) => {
        res.clearCooke('usertoken');
        res.sendStatus(200);
    },

    getUser: (req, res) => {
        User.findOneUser({ _id: req.params.id })
            .then(user => res.json(user))
            .catch(err => res.json(err))
    },

    getAllUsers: (req, res) => {
        User.find({})
            .then(user => res.json(user))
            .catch(err => res.json(err))
    },

    updateUser: (req, res) => {
        User.findOneAndUpdate = ({ _id: req.params.id }, req.body, { new: true })
            .then(updateUser => res.json(updateUser))
            .catch(err => res.json(err))
    },

    deleteUser: (req, res) => {
        User.deleteOne({ _id: req.params.id })
            .then(deleteConfirmation => res.json(deleteConfirmation))
            .catch(err => res.json(err))
    },

    getLoggedUser: (req, res) => {
        const userToken = res.locals.payload;
        console.log(userToken)
        User.findOneUser({ _id: userToken.id })
            .then(loggedUser => {
                res.json(loggedUser)
            })
            .catch(err => res.json(err))
    }
}

module.exports.index = (req, res) => {
    res.json({
        message: "Forum Board"
    })
};