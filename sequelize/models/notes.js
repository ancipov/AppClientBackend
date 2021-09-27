const {DataTypes} = require('sequelize');

module.exports = (sequelize) => {
    const notes = sequelize.define('notes', {
        _id: {
            field: 'id',
            type: DataTypes.NUMBER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        content: {
            field: 'content',
            type: DataTypes.STRING
        },
        categoryId: {
            field: 'categoryId',
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
        modelName: 'notes',
        tableName: 'notes',
        timestamps: false
    });

    return notes;
};
