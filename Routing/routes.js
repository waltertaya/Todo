const router = require('express').Router();
const db = require('../DB/db')
const { hashPassword, comparePassword } = require('../DB/security/auth')
const User = require('../DB/models/users')
const Tasks = require('../DB/models/tasks')

router.get('/login', (req, res) => {
    res.render('login', { messages: []})
});

router.post('/login', async (req, res) => {
    const { userName, password } = req.body;
    const found = await User.findOne({username: userName})
    if (found) {
        const match = await comparePassword(password, found.password)
        console.log(match)
        if (match) {
            req.session.current_user = found;
            res.redirect('/')
        } else {
            res.redirect('/landing')
        }
    } else {
        res.redirect('/login')
    }
});

router.get('/register', (req, res) => {
    res.render('register', { messages: []})
});

router.post('/register', async (req, res) => {
    const { userName, email, password, confirmPassword } = req.body;
    // console.log(req.body);
    const existingUser = await User.findOne({username: userName});
    const existingEmail = await User.findOne({email: email});
    if (!(password === confirmPassword)) {
        res.redirect('/register')
    }
    if (existingEmail || existingUser) {
        res.redirect('/register')
    }
    const hashedPassword = await hashPassword(password);
    const new_user = new User({ username: userName, email, password: hashedPassword })
    await new_user.save();
    res.redirect('/login')
})

router.get('/logout', (req, res) => {
    req.session.destroy()
    res.redirect('/landing')
});

router.get('/landing', (req, res) => {
    res.render('landing')
});

// router.use((req, res, next) => {
//     if (req.session.found) {
//         next()
//     } else {
//         res.redirect('/landing')
//     }
// })

router.get('/', (req, res) => {
    tasks = {}
    res.render('home', { tasks: tasks, user: req.session.current_user})
});


module.exports = router;
