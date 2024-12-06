# Employee Tracker

## Description

This program runs on node and allows you to interact with a database to keep track of your employees. You'll have access to various pieces of data, such as departments, role titles and salaries, and of course employees. You can keep track of their names, roles, departments, salaries, and managers.

## Installation

Firstly, make sure you have a postgres server up and running. If you don't have one, you can download one from [PostgreSQL](https://www.postgresql.org/download).
You'll also want to remove the .EXAMPLE from the .env.EXAMPLE and fill it in with your server information.
Once you have your server make sure to run `npm i` in your command line to install dependencies.
You'll want to run the schema in order to create the database and its tables. In order to run it, you'll either need to use either a client-side app or the command line.
To run it the command line, run `psql -U (insert user here)`. It will then prompt you for your password. Once you've done that, simply type in `\i src/db/schema.sql`.

## Usage

To use the program, simply run `npm start` in the command line and follow the prompts. You can also watch a tutorial video [here](https://drive.google.com/file/d/1G5FyZhOX89Zowj0Y9g5dcyZVvoiKBiiJ/view?usp=sharing).

## Credits

Huge thanks to Stanley Lewis for his code at the top of the schema to make it run better as well as to Christopher Kratz for helping me figure out how to display all the employees and their associated information as well as his help in figuring out how to get the options for managers when adding a new employee.