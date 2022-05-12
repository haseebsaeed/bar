module.exports = (sequelize, DataTypes) => {
    const roomOccupancy = sequelize.define('Room_Occupancy', {
        date_occupied: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
    }, {
        timestamps: true,
        freezeTableName: true,
        tableName: 'Room_Occupancy',
    });

    return roomOccupancy;
};