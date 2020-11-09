# Employee Tracker

## example video 

**[example-video](https://youtu.be/697FVSI7Tyw)**

This employee tracker is a solution for managing a company's employees using node, inquirer, and MySQL.

## example images  

## Home console app
![Employee Tracker App Example1](./example1.png)
## App after adding a few employees
![Employee Tracker App Example2](./example2.png)

## Schema 

The schema designed for the application includes the following:

  * **id** - INT PRIMARY KEY
  * **name** - VARCHAR(30) to hold department name

* **role**:

  * **id** - INT PRIMARY KEY
  * **title** -  VARCHAR(30) to hold role title
  * **salary** -  DECIMAL to hold role salary
  * **department_id** -  INT to hold reference to department role belongs to

* **employee**:

  * **id** - INT PRIMARY KEY
  * **first_name** - VARCHAR(30) to hold employee first name
  * **last_name** - VARCHAR(30) to hold employee last name
  * **role_id** - INT to hold reference to role employee has
  * **manager_id** - INT to hold reference to another employee that manages the employee being Created. This field may be null if the employee has no manager
  
## Command line application 

The command line application allows the user to:

  * Add departments, roles, employees

  * View departments, roles, employees

  * Update employee roles

  * Update employee managers

  * View employees by manager

  * Delete departments, roles, and employees

