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
                    type: 'input',
                    name: 'department',
                    message: 'What department does the role belong to?'
                }
            ])
            .then((answers) => {
                pool.query(`SELECT id FROM department where name = '${answers.department}'`, (err, res) => {
                    if (err) {
                        console.log(err);
                    } else {
                        const departmentId = res.rows[0].id;

                        pool.query(`INSERT INTO role(title, salary, department_id) VALUES ('${answers.title}', '${answers.salary}', ${departmentId})`, (err, res) => {
                            if (err) {
                                console.log(err);
                            } else {
                                console.log(`Added ${answers.title} to the database`);
                            }
                        })
                    }
                })
            })
    }

    addEmployee() {

    }

    updateEmployeeRole() {
        
    }
}

export default new Queries();