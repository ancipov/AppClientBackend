const fs = require('fs');
const {Sequelize} = require('sequelize');
const {applyExtraSetup} = require('./extra-setup');

const Op = Sequelize.Op;
const operatorsAliases = {
    $eq: Op.eq,
    $ne: Op.ne,
    $gte: Op.gte,
    $gt: Op.gt,
    $lte: Op.lte,
    $lt: Op.lt,
    $not: Op.not,
    $in: Op.in,
    $notIn: Op.notIn,
    $is: Op.is,
    $like: Op.like,
    $notLike: Op.notLike,
    $iLike: Op.iLike,
    $notILike: Op.notILike,
    $regexp: Op.regexp,
    $notRegexp: Op.notRegexp,
    $iRegexp: Op.iRegexp,
    $notIRegexp: Op.notIRegexp,
    $between: Op.between,
    $notBetween: Op.notBetween,
    $overlap: Op.overlap,
    $contains: Op.contains,
    $contained: Op.contained,
    $adjacent: Op.adjacent,
    $strictLeft: Op.strictLeft,
    $strictRight: Op.strictRight,
    $noExtendRight: Op.noExtendRight,
    $noExtendLeft: Op.noExtendLeft,
    $and: Op.and,
    $or: Op.or,
    $any: Op.any,
    $all: Op.all,
    $values: Op.values,
    $col: Op.col
};

let path = '/sandbox/db.sqlite';

if (!fs.existsSync(path)) {
    path = 'db.sqlite';
}

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: path,
    operatorsAliases
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
