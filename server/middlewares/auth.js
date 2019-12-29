const jwt = require('jsonwebtoken');

let tokenVerification = (req, res, next) => {
    let token = req.get('token');
    jwt.verify(token, process.env.SEED, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                err
            })
        }
        req.user = decoded.user;
        next();
    })
};
let AdminRoleVerification = (req, res, next) => {
    let user = req.user;
    if (user.role === 'ADMIN_ROLE') {
        next();
    } else {
         return res.json({
            ok: false,
            err: {
                message: 'User isn´t Administrator'
            }
        });
    }
};
module.exports = {
    tokenVerification,
    AdminRoleVerification
}