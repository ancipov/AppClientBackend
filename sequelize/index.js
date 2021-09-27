const fs = require('fs');
const utils = require('../utils');
const {Sequelize} = require('sequelize');
const {applyExtraSetup} = require('./extra-setup');

// const sequelize = new Sequelize(utils.DB.database, utils.DB.user, utils.DB.password, {
//     host: utils.DB.server,
//     port: utils.DB.port,
//     logging: false,
//     dialect: 'mssql',
//     driver: 'tedious',
//     dialectOptions: {
//         options: {
//             useUTC: true,
//             dateFirst: 1,
//             requestTimeout: 30000,
//             encrypt: false
//         }
//     }
// });


const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'db.sqlite'
});

(async() => {
    try {
        await sequelize.authenticate();
        console.log('Database connection OK! ');
    } catch (e) {
        console.log(e);
        process.exit(1);
    }
})();

const dir = __dirname + '/models';
const files = fs.readdirSync(dir);
for (var i in files) {
    const name = files[i].substr(0, files[i].indexOf('.'));
    const modelDefiner = require('./models/' + name);
    modelDefiner(sequelize)
}

applyExtraSetup(sequelize);

module.exports = sequelize;
