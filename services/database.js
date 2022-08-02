const Datastore = require('nedb');
db = new Datastore();

exports.insertOne = (record) => {
    return new Promise((resolve, reject) => {
        db.insert(record, (err, insertedRecord) => {
            if (err) {
                reject(err);
            }

            resolve(insertedRecord);
        });
    });
}

exports.insertMany = (records) => {
    return new Promise((resolve, reject) => {
        db.insert(records, (err, insertedRecords) => {
            if (err) {
                reject(err);
            }

            resolve(insertedRecords);
        });
    });
}

// Returns Records with the matching criteria, or null if not found
exports.findOne = (query) => {
    return new Promise((resolve, reject) => {
        db.findOne(query, (err, record) => {
            if (err) {
                reject(err);
            }

            resolve(record);
        });
    });
}

// Returns Records with the matching criteria, or empty array if not found
exports.find = (query) => {
    return new Promise((resolve, reject) => {
        db.findOne(query, (err, records) => {
            if (err) {
                reject(err);
            }

            resolve(records);
        });
    });
}

// Returns all records, or empty array if not found
exports.findAll = () => {
    return new Promise((resolve, reject) => {
        db.findOne({}, (err, records) => {
            if (err) {
                reject(err);
            }

            resolve(records);
        });
    });
}