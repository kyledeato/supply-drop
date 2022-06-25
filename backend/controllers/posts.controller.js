const { Post } = require('../models/post.model');

module.exports = {
    createPost: async (req, res) => {
        try {
            let post = req.body
            if (post.offer == true && post.image == null) {
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
}