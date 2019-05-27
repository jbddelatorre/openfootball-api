const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs')

//Load User Model
const User = require('../../../models/User');

router.post('/signup', async (req, res) => {
    try {
        const checkUser = await User.findOne({ email: req.body.email })
        if(checkUser){
            res.status(400).json({
                'error': 'USER_ALREADY_EXISTS'
            })
        } else {
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            });
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    newUser
                        .save()
                        .then(user => res.json(user))
                        .catch(err => console.log(err));
                })
            })
        }

    } catch(e) {
        res.status(404).json({
            'error': 'INVALID_REQUEST'
        })
    }
})

module.exports = router