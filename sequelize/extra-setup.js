function applyExtraSetup(sequelize) {
    const {users, categories, notes} = sequelize.models;

    users.hasMany(categories, {
        foreignKey: 'userId',
        onDelete:'cascade',
        onUpdate:'cascade',
        hooks:true
    });

    categories.belongsTo(users, {foreignKey : 'userId'});

    categories.hasMany(notes, {
        foreignKey: 'categoryId',
        onDelete:'cascade',
        onUpdate:'cascade',
        hooks:true
    });

    notes.belongsTo(categories, {foreignKey : 'categoryId'});
}

module.exports = {applyExtraSetup};
