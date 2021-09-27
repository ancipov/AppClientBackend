const utils = require('../utils');
const {models} = require('../sequelize');
const passwordHash = require('password-hash');

module.exports = function (app) {

    app.post('/login', async (req, res) => {
        try {
            const {username, password} = req.body;

            let user = await models.users.findOne({
                where: {
                    username: username
                }
            });

            if (user && passwordHash.verify(password, user.password)) {
                let token = utils.getToken(user.id);
                return res.json({
                    user: user.toJSON(),
                    sessionToken: token
                });
            } else {
                return res.status(401).json({
                    error: 'Username or password is incorrect',
                });
            }
        } catch (e) {
            return utils.returnError(res, req, e);
        }
    });

    app.post('/singup', async (req, res) => {
        try {
            console.log(1);
            let user = req.body;

            if (await models.users.findOne({
                where: {
                    username: user.username
                }
            })) {
                return res.status(400).send({error: 'User with such email already exist'});
            }

            user.password = passwordHash.generate(user.password);

            user = await models.users.create(user);

            let token = utils.getToken(user.id);
            return res.json({
                user: user.toJSON(),
                sessionToken: token
            });
        } catch (e) {
            return utils.returnError(res, req, e);
        }
    });

}
