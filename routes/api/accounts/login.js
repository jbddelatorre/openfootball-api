const { HttpStatus, router } = require('../base_imports')

const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

module.exports = async (req, res) => {
    const { email, password } = req.body
    
    try {
        const user = await global.db.accounts.users.findOne({ email: email })
        
        if(!user) {
            return res.json({
                status: HttpStatus.BAD_REQUEST,
                message: "Email does not exist",
                body: {}
            })
        }
        
        const match = await bcrypt.compare(password, user.password)
        
        if(match) {
            const payload = { id: user.id, name: user.name, email: user.email }

            jwt.sign(
                payload,
                process.env.SECRET_OR_KEY,
                { expiresIn: 3600 },
                (err, token) => {
                    if(err) {
                        
                        return res.json({
                            status: HttpStatus.BAD_REQUEST,
                            message: "Login failed",
                            body: {}
                        })
                    }

                    return res.json({
                        status: HttpStatus.OK,
                        message: "Login successful",
                        body: {
                            ...payload,
                            token: 'Bearer ' + token
                        }
                    })
                }
            )
        } else {
            return res.json({
                status: HttpStatus.BAD_REQUEST,
                message: "Password does not match",
                body: {}
            })
        }
    } catch(err) {
        return res.json({
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            message: "Database check failed",
            body: {}
        })
    }
}