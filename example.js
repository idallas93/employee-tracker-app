// function addEmployeesLast() {
//         inquirer
//           .prompt({
//             name: "lastName",
//             type: "input",
//             message: "enter employee's last name",
//           })
//           .then(function (answer) {
//             connection.query(
//               `INSERT INTO employees (last_name) VALUES ("${answer.lastName}");`,
//               function (err, response) {
//                 console.log(response);
                
//               }
//             );
//           });
//       }

//  function addEmployeesTitle() {
//         inquirer
//           .prompt({
//             name: "employeeTitle",
//             type: "input",
//             message: "enter employee's title (engineering, finance, marketing, accounting, etc.",
//           })
//           .then(function (answer) {
//             connection.query(
//               `INSERT INTO role_table (title) VALUES ("${answer.employeeTitle}");`,
//               function (err, response) {
//                 console.log(response);
//                 runSearch();
//               }
//             );
//           });
//       }
