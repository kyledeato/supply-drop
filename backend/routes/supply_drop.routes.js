const UserController = require('../controllers/users.controller');
const PostController = require('../controllers/posts.controller');
const { authenticate } = require('../configs/jwt.config');

module.exports = function (app) {
	//User routes
	app.post('/api/user/register', UserController.register)
	app.post('/api/user/login', UserController.login)
	app.post('/api/user/logout', UserController.logout)
	app.get('/api/user', UserController.getAllUsers)
	app.get('/api/user/:id', UserController.getUser)
	app.put('/api/user/:id', UserController.updateUser)
	app.delete('/api/user/:id', UserController.deleteUser)
	app.get('/api/auth', authenticate, UserController.getLoggedUser)

	//Post Routes
	app.post('/api/post/new', PostController.createPost)
	app.get('/api/post/', PostController.getAllPosts)
	app.get('/api/post/:id', PostController.getPost)
	app.put('/api/post/:id', PostController.updatePost)
	app.delete('/api/post/:id', PostController.deletePost)
}