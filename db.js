
var mysql = require("mysql");
var inquirer = require("inquirer");


var myModule = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "shurik",
  database: "bamazon"
});
