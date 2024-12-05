import inquirer from "inquirer";
import { pool } from "./connection.js";

class Db {
    
    async query(text) {
        try {
            let response = await pool.query(text);
            let array = await response.rows;
            return array;
        } catch (error) {
            console.error("There was a problem querying the database:", error);
            process.exit(1);
        }
    }

    viewDepartments() {
        return this.query('SELECT * FROM department;');
    }

    viewRoles() {
        return this.query('SELECT r.id, title, name as department, salary FROM role r INNER JOIN department d on d.id = r.department_id;');
    }

    viewEmployees() {
        return this.query('SELECT e.id, first_name, last_name, title, r.department_id as department, salary, manager_id as manager FROM employee e INNER JOIN role r on e.role_id = r.id;');
    }

    addDepartment(name) {
        return this.query(`INSERT INTO department (name) VALUES ('${name}');`);
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
                    type: 'list',
                    name: 'department',
                    message: 'Which department does the role belong to?',
                    choices: [

                    ]
                }
            ])
            .then((answers) => {
                pool.query(`SELECT id FROM department where name = '${answers.department}'`, (err, res) => {
                    if (err) {
                        console.log(err);
                        process.exit(1);
                    } else {
                        const departmentId = res.rows[0].id;

                        pool.query(`INSERT INTO role(title, salary, department_id) VALUES ('${answers.title}', '${answers.salary}', ${departmentId})`, (err, res) => {
                            if (err) {
                                console.log(err);
                                process.exit(1);
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
                    ('${answers.firstName}', '${answers.lastName}', '${answers.role}', ${answers.manager = 'None' ? null : `${answers.manager}`})`, (err, res) => {
                        if (err) {
                            console.log(err);
                            process.exit(1);
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
                        process.exit(1);
                    } else {
                        const roleId = res.rows[0].id

                        pool.query(`UPDATE employee SET role_id = '${roleId}' where name = '${answers.employee}'`, (err, res) => {
                            if (err) {
                                console.log(err);
                                process.exit(1);
                            } else {
                                console.log(`Updated employee's role`);
                            }
                        })
                    }
                })
            })
    }
}

export default new Db();