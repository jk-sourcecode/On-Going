const packageFile = require('../package.json');
/**
 * Module to define all the routes
 * @param {*} app
 * @param {*} router
 * @returns
 */
module.exports = function (app, router) {
    /**
    * Endpoint for getting API information
    * @returns
    */
    app.get('/info', (req, res) => {
        res.status(200).json({
            name: packageFile.name,
            status: 'OK',
            version: packageFile.version
        })
    })

    /**
  * Endpoint for validating user and get JWT response back
  * @returns
  */
    app.use('/auth', require('./controllers/auth')(router))

    return app
}