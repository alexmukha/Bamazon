var mysql = require("mysql");
var inquirer = require("inquirer");

const db = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "mybootcamp19",
  database: "bamazon"
});

db.connect(function (err) {
    if (err) throw err;
    var dbcon = (db.config);
    console.log("Successfuly connected to Database:'" + dbcon.database + "' as '"+dbcon.user+"'@'" + dbcon.host + ":" + dbcon.port + "'\n");
    Manage();
  });
  

function Manage() {
    inquirer.prompt({
    name: "action",
    type: "list",
    choices: ['\tView Products for Sale',
            '\tView Low Inventory',
            '\tUpdate Inventory',
            '\tAdd New Product',
            '\tExit'],
    })
    .then(function(inqResp) {
        console.log(inqResp.action);
        switch (inqResp.action) {
            case '\tView Products for Sale':
                db.query("SELECT id, product_name, department_name, price, stock_quantity FROM products", function(err, res) {
                    if (err) {
                        throw err;
                    }
                    console.log('Current Inventory')
                    console.table(res);
                    Manage();
                });
                break;

            case '\tView Low Inventory':
            db.query("SELECT * FROM products WHERE stock_quantity < 5 ORDER BY stock_quantity ASC", function(err, res) {
                    if (err) {
                        throw err;
                    }
                    console.log('Low inventory')
                    console.table(res);
                    Manage();
                });
                break;

            case '\tUpdate Inventory':
                updateProduct();
                break;

            case '\tAdd New Product':
                addProduct();
                break;

            case '\tExit':

            // exit();
            console.log("Logged out");
            process.exit();
            break;
            }
    
    });
}

function updateProduct() {
    inquirer.prompt({
    message: 'Please enter the "ID" of the product you want to add to inventory: ',
    type: "input",
    name: "selected"
    })
    .then(function(inqResp) {
        qtyAdd(inqResp.selected);
    });
}

function qtyAdd(selected) {
    inquirer.prompt({
        message: "Please enter Qiantity: ",
        type: "input",
        name: "qiantity"
    })
    .then(function(inqResp) {
        qtyUpdate(selected, inqResp.qiantity);
    });
}
function qtyUpdate(selected, qiantity) {
    db.query("UPDATE products SET stock_quantity=stock_quantity+" + qiantity + " WHERE id=" + selected, function(err, res) {
        if (err) {
            throw err;
        }
        db.query("SELECT id, product_name, department_name, price, stock_quantity FROM products", function(err, res) {
            console.log('Current Inventory')
            console.table(res);
            Manage();
        });
    });
}
function addProduct() {
    inquirer.prompt({
        message: "Please enter the name of the new product:",
        type: "input",
        name: "product_name"
    })
    .then(function(inqResp) {
        product_name = inqResp.product_name;
        db.query("SELECT department_name FROM products GROUP BY department_name", function(err, res) {
            var departments = res.map(obj => obj.department_name);
             inquirer.prompt({
                message: "Please enter the name of the Department: ",
                type: "input",
                name: "action"
             })
            .then(function(inqResp) {
                // Get the price of the new product
                var dept = inqResp.action; 
                inquirer.prompt({
                    message: "Please enter the price of the '" + product_name + "' in the '" + dept + "' department:",
                    type: "input",
                    name: "price"
                })
                .then(function(inqResp) {
                    price = inqResp.price;
                    inquirer.prompt({
                            message: "Please enter the quantity of '" + product_name + "' on hand: ",
                            type: "input",
                            name: "units"
                    })
                    .then(function(inqResp) {
                       units = inqResp.units;
                        // db.query("SELECT COUNT(*) as numRecords FROM products", function(err, res) {
                            // Don't really need this, but was just curious about how to get number of records in a table
                            // in case the ID field was NOT auto-generated
                            // var numRecords = res[0].numRecords;

                            db.query("INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ('"+product_name+"', '"+dept+"', '"+price+"', '"+units+"')", function(err, res) {
                                    if (err) {
                                    console.log(err);
                                    throw err;
                                }
                                db.query("SELECT id, product_name, department_name, price, stock_quantity FROM products", function(err, res) {
                                    console.log('Current Inventory')
                                    console.table(res);
                                    Manage();
                                });
                            });
                        // });
                    });
                });
            });
        });
    });
}
