const { HttpStatus, router } = require('../base_imports')

const bcrypt = require('bcryptjs')

//Load User Model
const User = require('../../../models/User');

router.post('/', async (req, res) => {
    
    try {
        const checkUser = await User.findOne({ email: req.body.email })
        if(checkUser){
            return res.json({
                status: HttpStatus.BAD_REQUEST,
                message: 'Email already taken',
                body: {}
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