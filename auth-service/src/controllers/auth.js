const { isUndefined } = require('lodash')
const jwt = require('common/jwt');
const logger = require('common/log');

module.exports = (router) => {
    router.post('/token/create', (req, res) => {
        try {

            if (!isUndefined(req.body) && !isUndefined(req.body.username) && !isUndefined(req.body.password)) {

                jwt.generateToken(req.body.username, req.body.password).then(result => {
                    res.status(200).json(result)
                }).catch(err => {
                    res.status(401).json(err)
                })
            }
            else {
                res.status(500).json(errorMessage('Invalid input'))
            }

        } catch (Ex) {
            logger.error(`Error on JWT creation: ${Ex}`);
            res.status(500).json(errorMessage(err))
        }

    })
    return router
}