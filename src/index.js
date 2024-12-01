import inquirer from "inquirer";
import Queries from "./queries.js";
import { connectToDb } from "./connection.js";

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
            Queries.viewDepartments();
        } else if (answers.action === 'View All Roles') {

        } else if (answers.action === 'View All Employees') {
            
        } else if (answers.action === 'Add Department') {

        } else if (answers.action === 'Add Role') {

        } else if (answers.action === 'Add Employee') {

        } else if (answers.action === 'Update Employee Role') {

        } else {
            process.exit(1);
        }
        if (answers.action !== 'Quit') {
            performActions();
        }
    })
}

performActions();