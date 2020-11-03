DROP DATABASE IF EXISTS employee_DB;
CREATE DATABASE employee_DB;

USE employee_DB;

CREATE TABLE employees(
	id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
	last_name VARCHAR(30) NOT NULL,
    role_id INT (30) NOT NULL,
	manager_id INT (30) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE role (
	role_id INT (30) NOT NULL,
    title VARCHAR(30) NOT NULL,
	salary decimal NOT NULL,
    department_id INT (30) NOT NULL,
    PRIMARY KEY (role_id)
);

CREATE TABLE deparment (
	department_id INT (30) NOT NULL,
	name VARCHAR(30) NOT NULL,
    PRIMARY KEY (department_id)
);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
values ("Isaac", "Dallas", 1, 50);

SELECT * FROM employees