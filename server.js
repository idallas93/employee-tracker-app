const mysql = require("mysql");
const inquirer = require("inquirer");


// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "SirPoopsAlot",
  database: "employee_DB"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
  runSearch();
});

function readColleges() {
  connection.query("SELECT first_name FROM employees", function(err, res) {
    if (err) throw err;

    // Log all results of the SELECT statement
    console.log(res);
    connection.end();
  });
}

function runSearch() {
    inquirer
    .prompt({
      name: "action",
      type: "rawlist",
      message: "What would you like to do?",
      choices: [
        "Add departments",
        "Add roles",
        "Add employees",
        "View departments",
        "View roles",
        "View employees",
        "Update employee roles",
        "Update employee manager",
        "Delete roles",
        "Delete employees",
        "Delete dapartments",
        "View the total utilized budget of a department",
      ]
    })
    .then(function(answer) {
      switch (answer.action) {
      case "Add departments":
        addDepartments();
        break;

      case "Add roles":
        addRoles();
        break;

      case "Add employees":
        addEmployees();
        break;

      case "View departments":
        viewDepartments();
        break;

      case "View roles":
        viewRoles();
        break;

      case "View employees":
        viewEmployees();
        break;

      case "Update employee roles":
        updateEmployeeRoles();
        break;

      case "Update employee manager":
        updateEmployeeManager();
        break;

      case "Delete roles":
        deleteRoles();
        break;

      case "Delete employees":
        deleteEmployees();
        break;

      case "Delete Departments":
        deleteDepartments();
        break;

      case "View the total utilized budget of a department":
        viewBudget();
        break;
      }
    });
  }

  function addDepartments(){

  }

  function addRoles(){
      
  }

  function addEmployees(){

}

  function viewDepartments(){

  }

  function viewRoles() {

  }

  function viewEmployees() {

  }

  function updateEmployeeRoles(){

  }

  function updateEmployeeManager(){

  }

  function deleteRoles() {

  }

  function deleteEmployees(){

  }

  function deleteDepartments(){

  }

  function viewBudget(){

  }