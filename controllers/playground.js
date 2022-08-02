const Datastore = require('nedb');

db = new Datastore();

exports.playground = async (req, res) => {
    try {
        db.find({ sku: 43900 }, (err, record) => {
            if (err) {
                res.status(400).send(err);
            }
            console.log(record);
            res.status(200).send(record);
        });
    } catch (e) {
        console.error(e);
    }
}