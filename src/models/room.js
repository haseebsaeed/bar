module.exports = (sequelize, DataTypes) => {
    const room = sequelize.define('Room', {
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
        tableName: 'Room',
        indexes: [
            {
                unique: true,
                fields: ['name']
            }
        ]
    });

    room.associate = function (models) {
        models.Room.hasMany(models.Room_Occupancy, {
            foreignKey: {
                name: 'room_id',
                allowNull: false
            },
            onDelete: 'cascade',
            onUpdate: 'cascade'
        });
    };

    return room;
};