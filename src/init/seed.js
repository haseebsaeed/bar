async function insertDummyData(models) {
    //inserting seed data
    models.Room.bulkCreate([
        { id: 1, name: 'Room A' },
        { id: 2, name: 'Room B' },
        { id: 3, name: 'Room C' },
    ], { ignoreDuplicates: true })

    models.User.bulkCreate([
        { id: 1, name: 'Daenerys Targaryen' },
        { id: 2, name: 'Jon Snow' },
        { id: 3, name: 'Arya Stark' },
    ], { ignoreDuplicates: true })

}

module.exports = {
    insertDummyData
}