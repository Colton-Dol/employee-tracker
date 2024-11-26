import inquirer from "inquirer"

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