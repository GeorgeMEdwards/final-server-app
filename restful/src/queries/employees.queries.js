/**
 * Tables follow syntax:
 * - CREATE TABLE <table_name>(<column_name> <data_type> <options>, ...)
 * 
 */
exports.CREATE_EMPLOYEES_TABLE = `CREATE TABLE IF NOT EXISTS employees(
  employee_id int NOT NULL AUTO_INCREMENT,
  user_id int NOT NULL,
  employee_name varchar(255) NOT NULL,
  employee_des varchar(255) NOT NULL,
  employee_city varchar(255) NOT NULL,
  PRIMARY KEY (employee_id),
  FOREIGN KEY (user_id) REFERENCES user(user_id)
        ON UPDATE CASCADE
        ON DELETE CASCADE 
)`;

// Get every adventure
exports.ALL_EMPLOYEES = (userId) => `SELECT * FROM employees Where user_id = ${userId}`;

// Get a single adventure by id
exports.SINGLE_EMPLOYEE = (userId, employeeId) =>
  `SELECT * FROM employees WHERE user_id = ${userId} AND employee_id = ${employeeId}`;

/**
 * Insert follows syntax:
 * - INSERT INTO <table_name>(<col_name1>, <col_name2>, <col_name3>, ...)
 *    VALUES(<value1>, <value2>, <value3>, ...)
 *
 * Create a new adventure in `employees` table where
 * - column names match the order the are in the table
 * - `?` allow us to use params in our controllers
 */
exports.INSERT_EMPLOYEE = (userId, employeeName,  employee_des,  employee_city) =>
  `INSERT INTO employees (user_id, employee_name,  employee_des,  employee_city) VALUES (${userId}, ${employeeName}, ${ employee_des}, ${ employee_city})`;

/**
 * Update follows syntax:
 * - UPDATE <table_name> SET <colum_name> = '<new_value>' WHERE <colum_name> = '<old_value>'
 *
 * NOTE: omitting `WHERE` will result in updating every existing entry.
 */
exports.UPDATE_EMPLOYEE = (userId, employeeId, newValues) =>
  `UPDATE employees SET ${newValues} Where user_id = ${userId} AND employee_id = ${employeeId}`;

// Delete a adventure by id
exports.DELETE_EMPLOYEE = (userId, employeeId) =>
  `DELETE FROM employees WHERE user_id = ${userId} AND employee_id = ${employeeId}`;