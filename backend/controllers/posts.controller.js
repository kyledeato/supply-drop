const { Post } = require('../models/post.model');

module.exports = {
    createPost: async (req, res) => {
        try {
            let post = req.body
            if (post.offer == true && post.image == undefined) {
                throw new Error("Post must contain an image")
            }
            const newpost = await Post.create(post)
            res.json(newpost)
            }
            catch (err) {
                console.log(err)
                res.status(400).json(err)
            }
    },

    getPost: (req, res) => {
        Post.findOnePost({ _id: req.params.id })
            .then(post => res.json(post))
            .catch(err => res.json(err))
    },

    getAllPosts: (req, res) => {
        Post.find({})
            .then(post => res.json(post))
            .catch(err => res.json(err))
    },

    updatePost: (req, res) => {
        Post.findOneAndUpdate = ({ _id: req.params.id }, req.body, { new: true })
            .then(updatePost => res.json(updatePost))
            .catch(err => res.json(err))
    },

    deletePost: (req, res) => {
        User.deleteOne({ _id: req.params.id })
            .then(deleteConfirmation => res.json(deleteConfirmation))
            .catch(err => res.json(err))
    }

}