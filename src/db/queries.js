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

    findDepartments() {
        return this.query('SELECT name, id as value FROM department ORDER BY name;')
    }

    viewDepartments() {
        return this.query('SELECT * FROM department ORDER BY name;');
    }

    findRoles() {
        return this.query('SELECT title as name, id as value FROM role;');
    }

    viewRoles() {
        return this.query('SELECT r.id, title, name as department, salary FROM role r INNER JOIN department d on d.id = r.department_id ORDER BY id;');
    }

    findEmployees() {
        return this.query(`SELECT CONCAT(first_name, ' ', last_name) AS name, id as value FROM employee;`);
    }

    viewEmployees() {
        return this.query('SELECT e.id, first_name, last_name, title, r.department_id as department, salary, manager_id as manager FROM employee e INNER JOIN role r on e.role_id = r.id ORDER BY e.id;');
    }

    addDepartment(name) {
        return this.query(`INSERT INTO department (name) VALUES ('${name}');`);
    }

    addRole(answers) {
        return this.query(`INSERT INTO role (title, salary, department_id) VALUES ('${answers.title}', ${answers.salary}, ${answers.department});`);
    }

    addEmployee(answers) {
        return this.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES 
            ('${answers.firstName}', '${answers.lastName}', ${answers.role}, ${answers.manager})`);
    }

    updateEmployeeRole(answers) {
        return this.query(`UPDATE employee SET role_id = '${answers.role}' where id = ${answers.employee}`);
    }   
}

export default new Db();