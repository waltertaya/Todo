const router = require('express').Router();

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

router.get('/', (req, res) => {
    tasks = {}
    res.render('home', { tasks: tasks})
});

router.get('/landing', (req, res) => {
    res.render('landing')
});


module.exports = router;
