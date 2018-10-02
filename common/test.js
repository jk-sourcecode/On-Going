const jsonToken = require('./jwt/lib')
const JWT = require('./jwt');

/*jsonToken.createToken({ status: 'success', username: 'kabil' }, 'Admin').then(token => {
    console.log(token)
    jsonToken.decodeToken(token, 'Admin123').then((decoded) => {
        console.log(decoded);
    }).catch(err => {
        console.log(err)
    });
}).catch(err => {
    console.log(err);
});*/


JWT.generateToken('Admin', 'Admin@123').then(result => { console.log(result) }).catch(error => { console.log(error) });