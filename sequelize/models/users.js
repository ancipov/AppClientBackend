const {DataTypes} = require('sequelize');

module.exports = (sequelize) => {
    const users = sequelize.define('users', {
        id: {
            field: 'id',
            type: DataTypes.NUMBER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            field: 'username',
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            field: 'password',
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'users',
        tableName: 'users',
        timestamps: false
    });

    return users;
};
