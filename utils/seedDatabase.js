const axios = require('axios').default;
const Datastore = require('nedb');

db = new Datastore();

exports.seedDatabaseData = async () => {
    try {
        const dummyData = (await axios.get(process.env.DUMMY_DATA_ENDPOINT)).data;
        
        await db.insert(dummyData);
        
        console.log('Seeding completed Successfully');
        return true;
    } catch (e) {
        console.error(e);
        return false;
    }
}