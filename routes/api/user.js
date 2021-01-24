const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');

//User Model
const User = require('../../models/User');

// route           post to api/users
// description:    register new user
// access:         public
router.post('/', (req, res) => {
    const { name, email, password } = req.body;
    console.log(req.body)

    //simple validation
    if (!name || !email || !password) res.status(400).json({ msg: "pls enter all fields" })

    //Check for existing user
    User.findOne({ email })
        .then(user => {
            if (user) return res.status(400).json({ msg: "user already exists" });

            const newUser = new User({
                name,
                email,
                password
            });

            //Create salt & hash
            bcrypt.genSalt(10, (err, salt) => {
                if (err) throw err;
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    newUser.save()
                        .then(user => {
                            jwt.sign(
                                { id: user.id },
                                config.get('jwtSecret'),
                                { expiresIn: 3600 },
                                (err, token) => {
                                    if (err) throw err;
                                    res.json({
                                        token,
                                        user: {
                                            id: user.id,
                                            name: user.name,
                                            email: user.email
                                        }
                                    })
                                }
                            )


                        }).catch(err => console.log(`Error: ${err}`))
                })
            })
        }).catch(err => console.log(err))
})

//Get route for the login user
router.post('/login', (req, res) => {
    const { email, password } = req.body;
    User.findOne({ email })
        .then(user => {
            if (!user) return res.status(400).json({ msg: "User doesn't exist!" })

            bcrypt.compare(password, user.password)
                .then(isMatched => {
                    if (!isMatched) return res.status(400).json({ msg: "Wrong password" })

                    jwt.sign(
                        { id: user.id }, config.get('jwtSecret'), (err, token) => {
                            if (err) throw err;

                            res.json({
                                token,
                                user: {
                                    id: user.id,
                                    name: user.name,
                                    email: user.email
                                }
                            })
                        }
                    )
                })
        })
        .catch(err => console.log(`Error: ${err}`))

})


module.exports = router;