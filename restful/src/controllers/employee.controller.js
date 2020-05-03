const escape = require('mysql').escape;
const connection = require('../db-config');
const {
  ALL_EMPLOYEES,
  SINGLE_EMPLOYEE,
  INSERT_EMPLOYEE,
  UPDATE_EMPLOYEE,
  DELETE_EMPLOYEE,
} = require('../queries/employees.queries');
const query = require('../utils/query');
const { serverError } = require('../utils/handlers');

/**
 * CRUD - Create, Read, Update, Delete
 * GET - Read
 * POST - Create
 * PUT - Update
 * DELETE - Delete
 */

// http://localhost:3000/employees
exports.getAllEmployees = async (req, res) => {
  // establish connection
  const con = await connection().catch((err) => {
    throw err;
  });

  // query all employees
  const employees = await query(con, ALL_EMPLOYEES(req.user.id), []).catch(
    serverError(res)
  );

  // [] === true, 0 === false
  if (!employees.length) {
    res.status(200).json({ msg: 'No employees available for this user.' });
  }
  res.json(employees);
};

// http://localhost:3000/employees/1
exports.getemployee = async (req, res) => {
  // establish connection
  const con = await connection().catch((err) => {
    throw err;
  });

  // query all employees
  const employee = await query(
    con,
    SINGLE_EMPLOYEE(req.user.id, req.params.employeeId)
  ).catch(serverError(res));

  if (!employee.length) {
    res.status(400).json({ msg: 'No employee available for this user.' });
  }
  res.json(employee);
};

// http://localhost:3000/employees
/**
 * POST request -
 * {
 *  name: 'An employee's name'
 * }
 */
exports.createEmployee = async (req, res) => {
  // verify valid token
  const user = req.user; 

  // take result of middleware check
  if (user.id) {
    // establish connection
    const con = await connection().catch((err) => {
      throw err;
    });

    // query add employee
    const employeeName = escape(req.body.employee_name);
    const result = await query(con, INSERT_EMPLOYEE(user.id, employeeName)).catch(
      serverError(res)
    );

    if (result.affectedRows !== 1) {
      res
        .status(500)
        .json({ msg: `Unable to add employee: ${req.body.employee_name}` });
    }
    res.json({ msg: 'Added employee successfully!' });
  }
};

/**
 * Build up values string.
 *
 */
const _buildValuesString = (req) => {
  const body = req.body;
  const values = Object.keys(body).map(
    // [employee_name, status].map()
    (key) => `${key} = ${escape(body[key])}` // 'New 1 employee name'
  );

  values.push(`created_date = NOW()`); // update current date and time
  values.join(', '); // make into a string
  return values;
};

// http://localhost:3000/employees/1
/**
 * PUT request -
 * {
 *  name: 'An employee's name',
 *  state: 'completed'
 * }
 */
exports.updateEmployee = async (req, res) => {
  // establish connection
  const con = await connection().catch((err) => {
    throw err;
  });
  const values = _buildValuesString(req);

  // query update Employee
  const result = await query(
    con,
    UPDATE_EMPLOYEE(req.user.id, req.params.employeeId, values)
  ).catch(serverError(res));

  if (result.affectedRows !== 1) {
    res
      .status(500)
      .json({ msg: `Unable to update employee: '${req.body.employee_name}'` });
  }
  res.json(result);
};

// http://localhost:3000/employees/1
exports.deleteEmployees = async (req, res) => {
  // establish connection
  const con = await connection().catch((err) => {
    throw err;
  });

  // query delete employee
  const result = await query(
    con,
    DELETE_Employee(req.user.id, req.params.employeeId)
  ).catch(serverError(res));

  if (result.affectedRows !== 1) {
    res
      .status(500)
      .json({ msg: `Unable to delete employee at: ${req.params.employeeId}` });
  }
  res.json({ msg: 'Deleted successfully.' });
};