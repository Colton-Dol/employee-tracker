/**
Must added to disconnect session to this database execempt this one.. 
Note: This script is ONLY for psql
**/

SELECT 'Database rebuild started...';
DROP DATABASE IF EXISTS temp;
CREATE DATABASE temp;

\c temp;

SELECT pg_terminate_backend(pg_stat_activity.pid)
FROM pg_stat_activity
WHERE pg_stat_activity.datname = 'course_db'
  AND pid <> pg_backend_pid();

/****/

DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;

\c employee_db;

CREATE TABLE department (
    id SERIAL PRIMARY KEY,
    name VARCHAR(30) UNIQUE NOT NULL
);