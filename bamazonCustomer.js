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
  console.log("Successfuly connected to Database:'" + dbcon.database + "' at '" + dbcon.host + ":" + dbcon.port + "'. With '" + dbcon.user + "@" + dbcon.password + "'");
  products();
});


function products() {
  db.query("SELECT id, product_name, price FROM products WHERE stock_quantity > '0'", function (err, res) {
    if (err) {
      console.error(err);
    } else {
      console.table(res);
      purchase();
    }
  });
};

function purchase() {
  inquirer.prompt([
    {
      message: 'Please enter "ID" number of the Item you would like to purchase.',
      type: "input",
      name: "product"
    },
    {
      message: "Please enter quantity",
      type: "input",
      name: "quantity"
    }
  ])
    .then(function (CustResp) {
      // console.log("You have purchased "+res);
      var custQty = Number(CustResp.quantity);
      var itemId = CustResp.product;
      db.query("SELECT * FROM products WHERE id =" + itemId, function (err, res) {
        if (err) {
          console.error(err);
        } else {
          var invQty = Number(res[0].stock_quantity);
          var name = res[0].product_name;
          if (custQty > invQty) {
            console.log("We are sorry, we only have " + invQty + " of " + name + "(s) in inventory.");
            // return;
          }
          var price = Number(res[0].price);
          var sum = custQty * price;
          var newQty = invQty - custQty;
          console.log(
            "       Transaction complete.\n      Thank you for shopping\n       ===== BAMAZON ===== \n---------------------------------\n\""
            + name + "\"\n\t\t" + custQty + " @ \t$" + price +
            ".00\n=================================");
          console.log("TOTAL Charge: \t\t$" + sum + ".00");
          db.query("UPDATE products SET ? WHERE?",
            [
              {
                stock_quantity: newQty
              },
              {
                id: itemId
              }
            ],
            function (err, res) {
              if (err) {
                console.error(err);
              } else {
                // console.log("There are now " + newQty + " of " + name + "(s) left.");
              }
            });
          db.end();
        };
      });
    });
};
