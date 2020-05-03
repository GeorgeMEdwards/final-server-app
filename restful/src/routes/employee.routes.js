const express = require('express');
const {
  getAllEmployees,
  createEmployee,
  getEmployee,
  updateEmployee,
  deleteEmployee,
} = require('../controllers/employee.controller');
const canAccess = require('../middleware/auth.middleware');

const employeeRoutes = express.Router();

/**
 * Express routes for Employees.
 *
 * RESTful endpoints make for easily adding to existing API features.
 */

/**
 * Routes for all employees. Evaluates to `/employee/`.
 */
employeeRoutes.get('/', canAccess, getAllEmployees).post('/', canAccess, createEmployee);

/**
 * Routes for a employee by id. Evalutes to `/employees/:employeeId`.
 */
employeeRoutes
  .get('/:employeeId', canAccess, getEmployee) // GET http://locahost:3000/employees/1
  .put('/:employeeId', canAccess, updateEmployee)
  .delete('/:employeeId', canAccess, deleteEmployee);

module.exports = employeeRoutes;