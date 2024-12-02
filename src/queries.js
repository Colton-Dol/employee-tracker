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
                    message: 'Which department does the role belong to?'
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
                    choices: [
                        
                    ]
                },
                {
                    type: 'list',
                    name: 'manager',
                    message: `Who is the employee's manager?`,
                    choices: [
                        'None',

                    ]
                }
            ])
            .then((answers) => {
                pool.query(`INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES
                    ('${answers.firstName}', '${answers.lastName}', '${answers.role}', '${answers.manager}')`, (err, res) => {
                        if (err) {
                            console.log(err);
                        } else {
                            console.log(`Added ${answers.firstName} ${answers.lastName} to the database`);
                        }
                    })
            })
    }

    updateEmployeeRole() {
        inquirer
            .prompt([
                {
                    type: 'list',
                    name: 'employee',
                    message: `Which employee's role do you want to update?`,
                    choices: [

                    ]
                },
                {
                    type: 'list',
                    name: 'role',
                    message: 'Which role do you want to assign to the selected employee?',
                    choices: [

                    ]
                }
            ])
            .then((answers) => {
                pool.query(`SELECT id FROM role where title = '${answers.role}'`, (err, res) => {
                    if (err) {
                        console.log(err);
                    } else {
                        const roleId = res.rows[0].id

                        pool.query(`UPDATE employee SET role_id = '${roleId}' where name = '${answers.employee}'`, (err, res) => {
                            if (err) {
                                console.log(err);
                            } else {
                                console.log(`Updated employee's role`);
                            }
                        })
                    }
                })
            })
    }
}

export default new Queries();