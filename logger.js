function log (erq,res,next) {
    console.log('Logging...')
    next()
}

module.exports = log