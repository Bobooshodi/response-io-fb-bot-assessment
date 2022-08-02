const axios = require('axios').default;

const { insertMany } = require('../services/database');
const { logger } = require('../../services/logger');

exports.seedDatabaseData = async () => {
    try {
        const dummyData = (await axios.get(process.env.DUMMY_DATA_ENDPOINT)).data;
        
        const res = await insertMany(dummyData);

        logger.info('Seeding completed Successfully');
        return true;
    } catch (e) {
        console.error(e);
        return false;
    }
}