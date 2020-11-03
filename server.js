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
  database: "employee_DB",
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
  runSearch();
});

function readColleges() {
  connection.query("SELECT first_name FROM employees", function (err, res) {
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
      ],
    })
    .then(function (answer) {
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

function addDepartments() {
  inquirer
    .prompt({
      name: "departments",
      type: "confirm",
      message: "Would you like to add a department?",
    })
    .then(function (answer) {
      if (answer.departments === true) {
        inquirer
          .prompt({
            name: "departmentInput",
            type: "input",
            message: "enter department name",
          })
          .then(function (answer) {
            connection.query(
              `INSERT INTO department (name) VALUES ("${answer.departmentInput}");`, function (err, response){
                  console.log(response)
                  runSearch()
            })
          });
      }
    });
}
 
function addRoles() {}

function addEmployees() {}

function viewDepartments() {
      var query = "SELECT employees.id, employees.first_name, employees.last_name, department.name AS department, role_table.title, role_table.salary FROM employees INNER JOIN role_table ON employees.role_id = role_table.role_id INNER JOIN department ON role_table.department_id = department.department_id";
      connection.query(query, function (err, response){console.log(response)
        runSearch()
      });
}

function viewRoles() {}

function viewEmployees() {
    var query = "SELECT employees.id, employees.first_name, employees.last_name, department.name AS department, role_table.title, role_table.salary FROM employees INNER JOIN role_table ON employees.role_id = role_table.role_id INNER JOIN department ON role_table.department_id = department.department_id";
    connection.query(query, function (err, response){console.table(response)
      runSearch()
    });
  }

function updateEmployeeRoles() {}

function updateEmployeeManager() {}

function deleteRoles() {}

function deleteEmployees() {
    var query = 'SELECT CONCAT(first_name , " ", last_name) AS name, id AS value FROM employee_DB.employees;'
    connection.query(query, function (err, response){console.table(response)
        inquirer
        .prompt({
          name: "delete",
          type: "list",
          choices: response,
          message: "who would you like to delete"
        })
        .then(function (answer) {
          let deleteID = answer.delete

          connection.query(
            "DELETE FROM employees WHERE ?",
            {
              id: deleteID
            },
            function(err, res) {
              if (err) throw err;
              console.log(res.affectedRows + " employee deleted!\n");
              // Call readProducts AFTER the DELETE completes
              runSearch()
            }
          );
        });
    });

  
}

function deleteDepartments() {}

function viewBudget() {}
