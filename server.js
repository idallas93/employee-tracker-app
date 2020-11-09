// npm downloads/ dependencies
const figlet = require('figlet');
const mysql = require('mysql');
const inquirer = require('inquirer');

// MySQL connection
// ======================================================================
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
    runApp();
});


const runApp = () => {
  // display program name
    figlet('Potatoe Match\nEmployee\nSummary', function (err, data) {
        if (err) {
            console.log('error');
            console.dir(err);
            return;
        }
        // Description of program
        console.log(data + '\n Add, view, or updated a new department, role or employee')
        initialPrompt();
    });
};

// Initial prompt
function initialPrompt() {
    inquirer
        .prompt([
            {
                name: 'select',
                message: 'Please make a selection',
                type: 'rawlist',
                choices: [
                    "Add new department, role or employee",
                    "View existing departments, roles or employees",
                    "Update existing departments, roles or employees",
                    "Exit"
                ]
            }
        ])
        .then(function (answer) {
            switch (answer.select) {
                case "Add new department, role or employee":
                    addNew();
                    break;

                case "View existing departments, roles or employees":
                   printAll();
                    break;

                case "Update existing departments, roles or employees":
                    update();
                    break;

                case "Exit":
                    endApp();
                    break;
            };
        });
};

// End the app
function endApp() {
    /* Use SIGTERM to end the program without killing any running or pending requests. https://flaviocopes.com/node-terminate-program/ */
    process.on('SIGTERM', () => {
        server.close(() => {
            console.log('Process terminated')
        });
    });
};

function addNew() {
    inquirer
        .prompt({
            name: "addNew",
            message: "Make a selection",
            type: "rawlist",
            choices: [
                "Add new department",
                "Add new role",
                "Add new employee",
                "Return to main menu",
                "Exit"
            ]
        })
        .then(function (answer) {
            switch (answer.addNew) {
                case "Add new department":
                    newDepartment();
                    break;
                case "Add new role":
                    newRole();
                    break;
                case "Add new employee":
                    newEmployee();
                    break;
                case "Return to main menu":
                    runApp();
                    break;
                case "Exit":
                    endApp();
                    break;
            };
        });
};

// define function for new department prompt 
function newDepartment() {
    inquirer
        .prompt([
            {
                name: "newDepartment",
                message: "What is the name of the new department?",
                type: "input"
            },
            {
                name: "next",
                message: "Is there anything else you would like to do?",
                type: "rawlist",
                choices: ["Add another department", "Return to main menu", "Exit"]
            }
        ]).then(function (answer) {
            switch (answer.next) {
                case "Add another department":
                    newDepartment();
                    saveDepartment(answer)
                    break;
                case "Return to main menu":
                    initialPrompt();
                    saveDepartment(answer)
                    break;
                case "Exit":
                    endApp();
                    saveDepartment(answer)
                    break;
            };
        });
};

// define function to save department answer
function saveDepartment(answer) {
    let departmentName = `INSERT INTO department (name) VALUES ('${answer.newDepartment}')`;
    connection.query(departmentName, function (err, res) {
        if (err) throw err;
    })
};

// new role function
function newRole() {
    inquirer
        .prompt([
            {
                name: "newRole",
                message: "What is the title of the new employee role?",
                type: "input"
            },
            {
                name: "newSalary",
                message: "What is the salary of the new employee role?",
                type: "input"
            },
            {
                name: "next",
                message: "Is there anyting else you would like to do?",
                type: "rawlist",
                choices: ["Add another role", "Update current employee's role", "Return to main menu", "Exit"]
            }
        ]).then(function (answer) {
            switch (answer.next) {
                case "Add another role.":
                    newRole();
                    saveRole(answer);
                    break;
                case "Return to main menu":
                    runApp();
                    saveRole(answer);
                    break;
                case "Exit":
                    endApp();
                    saveRole(answer);
                    break;
            };
        });
};

// Save role
function saveRole(answer) {
    let departmentName = `INSERT INTO role (title, salary) VALUES ('${answer.newRole}', '${answer.newSalary}')`;
    connection.query(departmentName, function (err, res) {
        if (err) throw err;
    });
};

// Add a new employee 
function newEmployee() {
    inquirer
        .prompt([
            {
                name: "employeeFirstName",
                message: "What is the first name of the new Employee?",
                type: "input"
            },
            {
                name: "employeeLastName",
                message: "What is the last name of the new Employee?",
                type: "input"
            },
            {
                name: "next",
                message: "Is there anyting else you would like to do?",
                type: "rawlist",
                choices: ["Add another employee", "Return to main menu", "Exit"]
            }
            // Ask the user if they would like to do more
        ]).then(function (answer) {
            switch (answer.next) {
                case "Add another employee":
                    newEmployee();
                    saveEmployee(answer);
                    break;
                case "Return to main menu":
                    initialPrompt();
                    saveEmployee(answer);
                    break;
                case "Exit":
                    endApp();
                    saveEmployee(answer);
                    break;
            };
        });
};

// Save employee
function saveEmployee(answer) {
    let departmentName = `INSERT INTO employee (first_name, last_name) VALUES ('${answer.employeeFirstName}', '${answer.employeeLastName}')`;
    connection.query(departmentName, function (err, res) {
        if (err) throw err;
    });
};

// View stored information
// ===============================================================================
function printAll() {
    inquirer
        .prompt([
            // Gather answers
            {
                name: "printData",
                message: "What would you like to view?",
                type: "rawlist",
                choices: ["Current departments", "Current employee roles", "Current employees", "Company Overview", "Return to main menu", "Exit"]
            },
        ])
        // Route the user depending on answer
        .then(function (answer) {
            switch (answer.printData) {
                case "Current departments":
                    departmentSearch();
                    break;
                case "Current employee roles":
                    searchRole();
                    break;
                case "Current employees":
                    employeeSearch();
                    break;
                case "Company Overview":
                    allInformation()
                    break;
                case "Return to main menu":
                    runApp();
                    break;
                case "Exit":
                    endApp();
                    break;
            };
        });
};
// define search functions for the application
function departmentSearch() {
    console.log("\n===========================================\nAll Departments:\n")
    connection.query("SELECT * FROM department", function (err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            console.log("Name: " + res[i].name + " | Department ID: " + res[i].id);
        };
        console.log("\n===========================================\n")
       printAll();
    });
};

function searchRole() {
    console.log("\n===========================================\nAll Roles:\n")
    connection.query("SELECT * FROM role", function (err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            console.log("Title: " + res[i].title + " | Salary: " + res[i].salary + " | Department ID: " + res[i].department_id);
        };
        console.log("\n===========================================\n")
       printAll();
    });
};

function employeeSearch() {
    console.log("\n===========================================\nAll Employees:\n")
    connection.query("SELECT * FROM employee", function (err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            console.log("Name: " + res[i].first_name + " " + res[i].last_name + " | Employee ID: " + res[i].id);
        };
        console.log("\n===========================================\n")
       printAll();
    });
};

// View all information
function allInformation() {
    console.log("\n===========================================\nAll Company Data:\n")
    connection.query("SELECT r.title, e.role_id, e.first_name, e.last_name, r.salary, e.manager_id FROM department d JOIN role r ON d.id = r.department_id JOIN employee e ON e.role_id = r.id", function (err, res) {
        for (let i = 0; i < res.length; i++) {
            console.log("Name: " + res[i].first_name + " " + res[i].last_name + " | Title: " + res[i].title + " | Employee ID: " + res[i].role_id + " | Salary: " + res[i].salary + " | Manager ID: " + res[i].manager_id);
        };
        console.log("\n===========================================\n")
       printAll();
        if (err) throw (err)
    });
};

// Delete / update functions
function update() {
    inquirer
        .prompt([
            {
                name: 'select',
                message: 'What would you like to do?',
                type: 'rawlist',
                choices: [
                    "Delete department",
                    "Delete or update role",
                    "Delete or update employee",
                    "Return",
                    "Exit"
                ]
            }
        ])
        .then(function (answer) {
            switch (answer.select) {
                case "Delete department":
                    updateDepartment();
                    break;

                case "Delete or update role":
                    updateRole();
                    break;

                case "Delete or update employee":
                    updateEmployee();
                    break;

                case "Return":
                    runApp();
                    break;

                case "Exit":
                    endApp();
                    break;
            };
        });
};

function updateDepartment() {
    inquirer
        .prompt([
            {
                name: 'select',
                message: 'What would you like to do?',
                type: 'rawlist',
                choices: ["View current departments and ID numbers",
                    "Delete a department by ID number",
                    "Return to the delete menu",
                    "Return",
                    "Exit"
                ]
            }
        ]).then(function (answer) {
            switch (answer.select) {
                case "View current departments and ID numbers":
                    renderDept();
                    break;
                case "Delete a department by ID number":
                    deleteDepartment()
                    break;
                case "Return to the update menu":
                    update()
                    break;
                case "Return":
                    runApp();
                    break;
                case "Exit":
                    endApp();
                    break;
            }
        });
};


function deleteDepartment() {
    inquirer
        .prompt([
            {
                name: "id",
                message: "What is the ID number of the department you would like to delete?",
                type: "input",
            },
            {
                name: "confirm",
                message: "Are you sure you would like to delete this department?",
                type: "confirm"
            }
        ])
        .then(function (answer) {
            if (answer.confirm) {
                removeDept(answer);
            } else {
                updateDepartment();
            }
        })
};

function removeDept(answer) {
    let departmentID = `DELETE FROM department WHERE id='${answer.id}' LIMIT 1`;
    connection.query(departmentID, function (err, res) {
        if (err) throw err;
        updateDepartment();
    });
};

function renderDept() {
    console.log("\n===========================================\nAll Departments:\n")
    connection.query("SELECT * FROM department", function (err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            console.log("Name: " + res[i].name + " | Department ID: " + res[i].id);
        };
        console.log("\n===========================================\n")
        updateDepartment();
    });
};

function updateRole() {
    inquirer
        .prompt([
            {
                name: 'select',
                message: 'What would you like to do?',
                type: 'rawlist',
                choices: ["View current roles, departments and ID numbers",
                    "Delete a role by ID number",
                    "Assign role to department by ID number",
                    "Return to the delete menu",
                    "Return",
                    "Exit"
                ]
            }
        ]).then(function (answer) {
            switch (answer.select) {
                case "View current roles, departments and ID numbers":
                    renderRoles();
                    break;
                case "Delete a role by ID number":
                    deleteRole();
                    break;
                case "Assign role to department by ID number":
                    assignRole();
                    break;
                case "Return to the update menu":
                    update();
                    break;
                case "Return":
                    runApp();
                    break;
                case "Exit":
                    endApp();
                    break;
            }
        });
};


function deleteRole() {
    inquirer
        .prompt([
            {
                name: "id",
                message: "What is the ID number of the role you would like to delete?",
                type: "input",
            },
            {
                name: "confirm",
                message: "Are you sure you would like to delete this role?",
                type: "confirm"
            }
        ])
        .then(function (answer) {
            if (answer.confirm) {
                removeRole(answer);
                updateRole();
            } else {
                updateRole();
            }
        })
};

function removeRole(answer) {
    let roleID = `DELETE FROM role WHERE id='${answer.id}' LIMIT 1`;
    connection.query(roleID, function (err, res) {
        if (err) throw err;
    });
};

function assignRole() {
    inquirer
        .prompt([
            {
                type: "input",
                message: "What is the ID number for the department you would like to assign?",
                name: "deptID"
            },
            {
                type: "input",
                message: "What is the ID number for the role you are assigning?",
                name: "id"
            }
        ]).then(function (answer) {
            saveDeptRole(answer);

        });
};

function saveDeptRole(answer) {
    let departmentID = `UPDATE role SET department_id = '${answer.deptID}' WHERE id='${answer.id}'`;
    connection.query(departmentID, function (err, res) {
        if (err) throw err;
        console.log("Role's department successfully updated!")
        updateRole();
    });
};

function renderRoles() {
    console.log("\n===========================================\nAll Roles:\n")
    connection.query("SELECT * FROM role", function (err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            console.log("Title: " + res[i].title + " | " + res[i].id);
        };
        console.log("\n===========================================\n")
        updateRole();
    });
};


function updateEmployee() {
    inquirer
        .prompt([
            {
                name: 'select',
                message: 'What would you like to do?',
                type: 'rawlist',
                choices: [
                    "View current employees and ID numbers",
                    "Delete an employee by ID number",
                    "Assign an employee's role by ID number",
                    "Return to the delete menu",
                    "Return",
                    "Exit"
                ]
            }
        ]).then(function (answer) {
            switch (answer.select) {
                case "View current employees and ID numbers":
                    renderEmployees();
                    break;
                case "Delete an employee by ID number":
                    deleteEmployee();
                    break;
                case "Assign an employee's role by ID number":
                    findRoleID()
                    break;
                case "Return to the update menu":
                    update()
                    break;
                case "Return":
                    runApp();
                    break;
                case "Exit":
                    endApp();
                    break;
            }
        });
};


function deleteEmployee() {
    inquirer
        .prompt([
            {
                name: "id",
                message: "What is the ID number of the employee you would like to delete?",
                type: "input",
            },
            {
                name: "confirm",
                message: `Are you sure you would like to delete this employee?`,
                type: "confirm"
            }
        ])
        .then(function (answer) {
            if (answer.confirm) {
                removeEmployee(answer);
                updateEmployee();
            } else {
                updateEmployee();
            }
        });
};

function removeEmployee(answer) {
    let employeeID = `DELETE FROM employee WHERE id='${answer.id}' LIMIT 1`;
    connection.query(employeeID, function (err, res) {
        if (err) throw err;
    });
};

function findRoleID() {
    inquirer
        .prompt([
            {
                name: 'select',
                type: 'rawlist',
                choices: [
                    "View current roles and ID numbers",
                    "Assign an employee's role by ID number",
                    "Return to the update menu",
                    "Return",
                    "Exit"
                ]
            }
        ])
        .then(function (answer) {
            switch (answer.select) {
                case "View current roles and ID numbers":
                    renderRoles();
                    break;
                case "Assign an employee's role by ID number":
                    assignEmployee();
                    break;
                case "Return to the update menu":
                    update()
                    break;
                case "Return":
                    runApp();
                    break;
                case "Exit":
                    endApp();
                    break;
            }
        });
};

function assignEmployee() {
    inquirer
        .prompt([
            {
                type: "input",
                message: "What is the ID number for the role you would like to assign?",
                name: "roleID"
            },
            {
                type: "input",
                message: "What is the ID number for the employee whose role you are assigning?",
                name: "id"
            }
        ]).then(function (answer) {
            saveEmRole(answer);

        })
};

function saveEmRole(answer) {
    let employeeID = `UPDATE employee SET role_id = '${answer.roleID}' WHERE id='${answer.id}'`;
    connection.query(employeeID, function (err, res) {
        if (err) throw err;
        console.log("Employee's role successfully updated!")
        updateEmployee()
    });
}

function renderRoles() {
    console.log("\n===========================================\nAll Roles:\n")
    connection.query("SELECT * FROM role", function (err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            console.log("ID: " + res[i].id + " | " + "Title: " + res[i].title);
        };
        console.log("\n===========================================\n")
        findRoleID();
    });
}

function renderEmployees() {
    console.log("\n===========================================\nAll Employees:\n")
    connection.query("SELECT * FROM employee", function (err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            console.log("Name: " + res[i].first_name + " " + res[i].last_name + " | Employee ID: " + res[i].id);
        };
        console.log("\n===========================================\n")
        updateEmployee();
    });
};