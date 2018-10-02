/**
 * Provides set of methods to generate / validate JWT
 */
const mongoose = require('mongoose');
const userSchema = require('./schema/user')
const jwtLib = require('./lib')

const host = process.env.DB_HOST || 'mongodb://127.0.0.1:27017';
const database = process.env.DB_NAME || 'LIMO';

const secret = process.env.JWT_SECRET || 'Mojay@2018';

/**
 * Connects to mongodb using mongoose module
 */
function connectMongo() {
    mongoose.connect(`${host}/${database}`, { useNewUrlParser: true });
}

/**
 * Close connection with mongodb
 */
function closeConnection() {
    mongoose.connection.close();
}

/**
 * Validate username and password with database and returns ture / fase
 * @param {*} username
 * @param {*} password
 * @returns
 */
function validateUser(username, password) {
    return new Promise((resolve, reject) => {
        try {
            connectMongo();
            let db = mongoose.connection;
            db.once("open", () => {
                userSchema.find({ username, password }, (err, user) => {
                    if (err) {
                        closeConnection();
                        reject(false)
                    };

                    if (user.length > 0) {
                        closeConnection();
                        resolve(true);
                    } else {
                        closeConnection();
                        resolve(false);
                    }

                });
            })
        } catch (Ex) {
            logger.error(`Error on user validation with datbase: ${Ex}`);
            closeConnection();
            reject(false);

        }
    })
}

class JWT {
    /**
     * Generate JWT if given username and password is valid
     * @param {*} username
     * @param {*} password
     * @returns
     * @memberof JWT
     */
    generateToken(username, password) {
        return new Promise((resolve, reject) => {
            try {
                let result;
                validateUser(username, password).then(isValid => {

                    if (isValid) {
                        jwtLib.createToken({ status: 'success', username: username }, secret).then(token => {
                            result = {
                                status: 'success',
                                jwt: token
                            }
                            resolve(result);
                        }).catch(err => {
                            result = {
                                status: 'failure',
                                jwt: null,
                                error: err,
                            }
                            resolve(result);
                        })
                    } else {
                        result = {
                            status: 'failure',
                            jwt: null,
                            error: 'Invalid user',
                        }
                        resolve(result);
                    }

                }).catch(() => {
                    result = {
                        status: 'failure',
                        jwt: null,
                        error: 'Invalid user',
                    }
                    resolve(result);
                })

            } catch (Ex) {
                logger.error(`Error on JWT creation: ${Ex}`);
                reject(Ex);
            }
        })

    }
}

module.exports = new JWT();