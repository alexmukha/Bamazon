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
    supervisor();
  });
  

  function supervisor(){
    inquirer.prompt({
        message: "Select an action from the list below",
        type: "list",
        choices: ["\tView Product Sales By Department", 
        "\tCreate New Department", 
        "\tExit"],
        name: "onlyprompt"

        }).then(function(inqRes){

        switch(inqRes.onlyprompt){
            case "\tView Product Sales By Department":
                viewProducts();
            break;

            case "\tCreate New Department":
                newDepartment();
            break;
            
            case "\tExit":
            console.log("Logged out");
            process.exit();
            break;
             
        };
    });
};



function viewProducts(){
    process.exit();
};

function newDepartment(){
    process.exit();
};