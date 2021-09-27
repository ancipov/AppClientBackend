const {DataTypes} = require('sequelize');

module.exports = (sequelize) => {
    const categories = sequelize.define('categories', {
        _id: {
            field: 'id',
            type: DataTypes.NUMBER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            field: 'name',
            type: DataTypes.STRING
        },
        description: {
            field: 'description',
            type: DataTypes.STRING
        },
        userId: {
            field: 'userId',
            type: DataTypes.NUMBER
        },
        deleted: {
            field: 'deleted',
            type: DataTypes.BOOLEAN
        },
        _updatedAt: {
            field: 'updatedAt',
            type: DataTypes.DATE
        }
    }, {
        sequelize,
        modelName: 'categories',
        tableName: 'categories',
        timestamps: false
    });

    return categories;
};
