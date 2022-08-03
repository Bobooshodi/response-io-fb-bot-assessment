const Datastore = require('nedb');

const { findOneWithProjection } = require('../services/database');

db = new Datastore();

exports.playground = async (req, res) => {
    try {
        const result = await findOneWithProjection({ sku: 43900 }, { description: 1 });

        res.send(result);
    } catch (e) {
        console.error(e);
    }
}