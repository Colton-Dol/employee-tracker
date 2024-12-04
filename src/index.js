import inquirer from "inquirer";
import Db from "./db/queries.js";
import { connectToDb } from "./db/connection.js";

await connectToDb();

const performActions = () => {
    inquirer
     .prompt([
        {
            type: 'list',
            name: 'action',
            message: 'What would you like to do?',
            choices: [
                'View All Departments',
                'View All Roles',
                'View All Employees',
                'Add Department',
                'Add Role',
                'Add Employee',
                'Update Employee Role',
                'Quit'
            ]
        }
    ])
    .then((answers) => {
        if (answers.action === 'View All Departments') {
            viewAllDepartments();
        } else if (answers.action === 'View All Roles') {
            viewAllRoles();
        } else if (answers.action === 'View All Employees') {
            viewAllEmployees();
        } else if (answers.action === 'Add Department') {
            Db.addDepartment();
        } else if (answers.action === 'Add Role') {
            Db.addRole();
        } else if (answers.action === 'Add Employee') {
            Db.addEmployee();
        } else if (answers.action === 'Update Employee Role') {
            Db.updateEmployeeRole();
        } else {
            process.exit(1);
        }
    })
}

function viewAllDepartments() {
    Db.viewDepartments().then((departments) => console.table(departments));
}

function viewAllRoles() {
    Db.viewRoles().then((roles) => console.table(roles));
}

function viewAllEmployees() {
    Db.viewEmployees().then((employees) => console.table(employees));
}

performActions();