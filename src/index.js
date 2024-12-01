import inquirer from "inquirer"
import { connectToDb } from "./connection.js"

await connectToDb();

inquirer
    .prompt([
        {
            type: 'list',
            name: 'action',
            message: 'What would you like to do?',
            choices: [
                
            ]
        }
    ])