const { HttpStatus, router } = require('../base_imports')

const bcrypt = require('bcryptjs')

module.exports = async (req, res) => {
    try {
        const checkUser = await global.db.accounts.users.findOne({ email: req.body.email })

        if(checkUser){
            return res.json({
                status: HttpStatus.BAD_REQUEST,
                message: 'Email already taken',
                body: {}
            })
        } else {
            const newUser = {
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            }
            
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, async (err, hash) => {
                    if (err) throw err;

                    newUser.password = hash;

                    let user = await global.db.accounts.users.create(newUser)

                    return res.json({
                        status: HttpStatus.OK,
                        message: 'Registration success',
                        body: {
                            id: user.id,
                            name: user.name,
                            email: user.email
                        }
                    })
                })
            })
        }

    } catch(e) {
        res.json({
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            message: 'Database check failed',
            body: {}
        })
    }
}

