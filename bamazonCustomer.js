var mysql = require("mysql");
var inquirer = require("inquirer");

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "shurik",
  database: "bamazon"
});

connection.connect(function(err) {
    if (err) throw err;
    // runSearch();
    console.log(connection);
  });

