const connection = require("../config/connection.js");

const questionMarks = (num) => {
    let arr = [];
    for (let i = 0; i < num; i++) {
        arr.push("?")
    }
    return arr.toString();
}

const objToSql = (obj) => {
    let arr = [];

    for (let key in obj) {
        let value = obj[key];

        if (Object.hasOwnProperty.call(obj, key)) {
            if (typeof value === "string" && value.indexOf(" ") >= 0) {
                value = "'" + value + "'";
            }
            arr.push(key + "=" + value);
        }
    }

    return arr.toString();
}

const orm = {
    selectAll: function (table, cb) {
        let qs = "SELECT * FROM " + table + ";"

        console.log(qs);

        connection.query(qs, function (err, result) {
            if (err) {
                throw err
            }
            cb(result);
        })
    },
    insertOne: function (table, cols, vals, cb) {
        let qs = "INSERT INTO " + table;
        qs += " (" + cols.toString() + ") ";
        qs += "VALUES (" + questionMarks(vals.length) + ") ";

        console.log(qs);

        connection.query(qs, vals, function (err, result) {
            if (err) {
                throw err
            }
            cb(result);
        })
    },
    updateOne: function (table, obj, condition, cb) {
        let qs = "UPDATE " + table;
        qs += " SET " + objToSql(obj);
        qs += " WHERE " + condition;

        console.log(qs);

        connection.query(qs, function (err, result) {
            if (err) {
                throw err
            }
            cb(result);
        })
    }
}

module.exports = orm;