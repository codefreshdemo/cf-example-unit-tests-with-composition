/**
 * Created by nikolai on 7/8/17.
 */
var mysql = require('mysql');

var connection = mysql.createConnection({
    host     : process.env.MYSQL_HOST,
    user     : process.env.MYSQL_USER,
    password : process.env.MYSQL_PASSWORD,
    database : process.env.MYSQL_DATABASE
});

var dbName = process.env.MYSQL_DATABASE;
console.log('STORAGE_CONNECTION_STRING=' + process.env.STORAGE_CONNECTION_STRING);

connection.connect(function(err) {
    if (err) throw err;

    console.log("Connected!");
    connection.query("CREATE DATABASE IF NOT EXISTS " + dbName, function (err, result) {
        if (err) throw err;
        console.log("Database created");

        var sql = "CREATE TABLE IF NOT EXISTS customers (id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), address VARCHAR(255))";
        connection.query(sql, function (err, result) {
            if (err) throw err;
            console.log("Table created");

            var sql = "INSERT INTO customers (name, address) VALUES ('Company Inc', 'Highway 37')";
            connection.query(sql, function (err, result) {
                if (err) throw err;
                console.log("1 record inserted");

                connection.query("SELECT * FROM customers", function (err, result, fields) {
                    if (err) throw err;
                    console.log(result);
                    connection.end();
                });
            });
        });
    });
});