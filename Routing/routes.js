const router = require('express').Router();
const db = require('../DB/db')
const { hashPassword, comparePassword } = require('../DB/security/auth')
const User = require('../DB/models/users')
const Tasks = require('../DB/models/tasks')

router.get('/login', (req, res) => {
    res.render('login', { messages: []})
});

router.get('/register', (req, res) => {
    res.render('register', { messages: []})
});

router.get('/logout', (req, res) => {
    req.session.destroy()
    res.redirect('/landing')
});

router.use((req, res, next) => {
    if (req.session.user) {
        next()
    } else {
        res.redirect('/landing')
    }
})

router.get('/', (req, res) => {
    tasks = {}
    res.render('home', { tasks: tasks})
});

router.get('/landing', (req, res) => {
    res.render('landing')
});


module.exports = router;
