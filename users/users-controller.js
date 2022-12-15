import * as usersDao from './users-dao.js'

const UsersController = (app) => {
    app.post('/api/register', createUser);
    app.post('/api/login', loginUser);
    app.post('/api/logout', logoutUser);
    app.get('/api/profile', getCurrentUser);

    app.get('/api/register', findAllUsers)
    app.get('/api/register/:username', findUserByUserName)
    app.put('api/register/:uid', updateUser)
    app.delete('api/register/:uid', deleteUser)
}

const createUser = async (req, res) => {
    const user = req.body;
    const existingUser = await usersDao.findUserByUsername(user.username);
    if (existingUser) {
        res.sendStatus(403);
        return;
    }
    const newUser = await usersDao.createUser(user);
    req.session['currentUser'] = newUser;
    res.json(newUser);
}

const loginUser = async (req, res) => {
    const userCred = req.body;
    const existingUser = await usersDao.findUserByCredentials(userCred);
    if (existingUser) {
        req.session['currentUser'] = existingUser;
        res.json(existingUser)
        return;
    }
    res.sendStatus(403);
}

const logoutUser = async (req, res) => {
    req.session.destroy();
    res.sendStatus(200);
}

const getCurrentUser = async (req, res) => {
    if (req.session['currentUser']) {
        res.send(req.session['currentUser']);
    }
    else {
        res.sendStatus(403);
    }
}

const updateUser = async (req, res) => {
    const userIdToUpdate = req.params.uid;
    const updates = req.body;
    const status = await usersDao.updateUser(userIdToUpdate,
        updates);
    const user=await usersDao.findUserById(req.params.uid)
    req.session['currentUser'] = user
    res.json(user)
}

const deleteUser = async (req, res) => {
    const userIdToDelete = req.params.uid;
    const status = await usersDao.deleteUser(userIdToDelete);
    const users = await usersDao.findAllUsers()
    res.json(users)
}

const findAllUsers = async (req, res) => {
    const users = await usersDao.findAllUsers()
    res.json(users)
}

const findUserByUserName = async (req, res) => {
    const user=req.params.username;
    const existingUser = await usersDao.findUserByUsername(user);
    res.json(existingUser)
}

export default UsersController;