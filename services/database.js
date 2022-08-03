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

            return resolve(records);
        });
    });
}

// Returns all records, or empty array if not found
exports.findAll = () => {
    return new Promise((resolve, reject) => {
        db.find({}, (err, records) => {
            if (err) {
                reject(err);
            }

            resolve(records);
        });
    });
}

// Returns Records with the matching criteria, or null if not found
exports.findOneWithProjection = (query, projection) => {
    return new Promise((resolve, reject) => {
        db.findOne(query).projection(projection).exec((err, record) => {
            if (err) {
                reject(err);
            }
            
            resolve(record);
        });
    });
}

// Returns Records with the matching criteria, or empty array if not found
exports.findWithProjection = (query, projection) => {
    return new Promise((resolve, reject) => {
        db.findOne(query).projection(projection).exec((err, records) => {
            if (err) {
                reject(err);
            }

            resolve(records);
        });
    });
}