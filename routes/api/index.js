const { router } = require('./base_imports')

router.use('/accounts', require('./accounts'))

module.exports = router