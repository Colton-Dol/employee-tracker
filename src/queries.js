import { pool } from "./connection.js";

class Queries {
    
    viewDepartments() {
        pool.query('SELECT * FROM department', (err, res) => {
            if (err) {
                console.log(err)
            } else {
                console.log(res.rows)
            }
        })
    }

    viewRoles() {

    }

    viewEmployees() {

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