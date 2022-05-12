module.exports = (sequelize, DataTypes) => {
    const user = sequelize.define('User', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
    }, {
        timestamps: false,
        freezeTableName: true,
        tableName: 'User'
    });

    user.associate = function (models) {
        models.User.hasMany(models.Room_Occupancy, {
            foreignKey: {
                name: 'user_id',
                allowNull: false
            },
            onDelete: 'cascade',
            onUpdate: 'cascade'
        });
    };

    return user;
};