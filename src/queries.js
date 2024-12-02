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

    }

    addRole() {

    }

    addEmployee() {

    }

    updateEmployeeRole() {
        
    }
}

export default new Queries();