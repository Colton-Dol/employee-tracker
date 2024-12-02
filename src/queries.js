import inquirer from "inquirer";
import { pool } from "./connection.js";

class Queries {
    
    viewDepartments() {
        pool.query('SELECT * FROM department', (err, res) => {
            if (err) {
                console.log(err);
            } else {
                console.log(res.rows);
            }
        })
    }

    viewRoles() {
        pool.query('SELECT * FROM role', (err, res) => {
            if (err) {
                console.log(err);
            } else {
                console.log(res.rows);
            }
        })
    }

    viewEmployees() {
        pool.query('SELECT * FROM employee', (err, res) => {
            if (err) {
                console.log(err);
            } else {
                console.log(res.rows);
            }
        })
    }

    addDepartment() {
        inquirer
            .prompt([
                {
                    type: 'input',
                    name: 'department',
                    message: 'What is the name of the department?'
                }
            ])
            .then((answers) => {
                pool.query(`INSERT INTO department(name) VALUES ('${answers.department}')`, (err, res) => {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log(`Added ${answers.department} to the database`);
                    }
                })
            })
    }

    addRole() {

    }

    addEmployee() {

    }

    updateEmployeeRole() {
        
    }
}

export default new Queries();