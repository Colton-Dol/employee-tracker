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
            addNewDepartment();
        } else if (answers.action === 'Add Role') {
            addNewRole();
        } else if (answers.action === 'Add Employee') {
            addNewEmployee();
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

function addNewDepartment() {
    inquirer
            .prompt([
                {
                    type: 'input',
                    name: 'department',
                    message: 'What is the name of the department?'
                }
            ])
            .then((answers) => {
                Db.addDepartment(answers.department);
                console.log(`Added ${answers.department} to the database`);
            })
}

function addNewRole() {
    inquirer
            .prompt([
                {
                    type: 'input',
                    name: 'title',
                    message: 'What is the name of the role?'
                },
                {
                    type: 'input',
                    name: 'salary',
                    message: 'What is the salary of the role?'
                },
                {
                    type: 'list',
                    name: 'department',
                    message: 'Which department does the role belong to?',
                    choices: Db.findDepartments()
                }
            ])
            .then((answers) => {
                Db.addRole(answers);
                console.log(`Added ${answers.title} to the database`);
            })
}

function addNewEmployee() {
    inquirer
            .prompt([
                {
                    type: 'input',
                    name: 'firstName',
                    message: `What is the employee's first name?`
                },
                {
                    type: 'input',
                    name: 'lastName',
                    message: `What is the employee's last name?`
                },
                {
                    type: 'list',
                    name: 'role',
                    message: `What is the employee's role?`,
                    choices: Db.findRoles()
                },
                {
                    type: 'list',
                    name: 'manager',
                    message: `Who is the employee's manager?`,
                    choices: Db.findEmployees()
                }
            ])
            .then((answers) => {
                Db.addEmployee(answers);
                console.log(`Added ${answers.firstName} ${answers.lastName} to the database`);
            })
}

performActions();