// employeeResolvers.js
const Employee = require('../models/Employee'); 
const { body } = require('express-validator');

const employeeValidation = [
  body('email').isEmail().withMessage('Email must be valid'),
  body('first_name').notEmpty().withMessage('First name is required'),
  body('last_name').notEmpty().withMessage('Last name is required'),
  body('salary').isFloat({ min: 0 }).withMessage('Salary must be a positive number'),
];

const employeeResolvers = {
  Query: {
    getAllEmployees: async () => {
      return await Employee.find();
    },
    searchEmployeeById: async (_, { eid }) => {
      return await Employee.findById(eid);
    },
    searchEmployeeByDesignationOrDepartment: async (_, { designation, department }) => {
      return await Employee.find({
        $or: [
          { designation: designation },
          { department: department },
        ],
      });
    },
  },
  Mutation: {
    addEmployee: async (_, { first_name, last_name, email, gender, designation, salary, date_of_joining, department, employee_photo }, { req }) => {

      await Promise.all(employeeValidation.map(validation => validation.run(req)));

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        throw new Error(errors.array().map(err => err.msg).join(', '));
      }

      const newEmployee = new Employee({
        first_name,
        last_name,
        email,
        gender,
        designation,
        salary,
        date_of_joining,
        department,
        employee_photo,
      });

      return await newEmployee.save();
    },
    updateEmployeeById: async (_, { eid, first_name, last_name, email, gender, designation, salary, date_of_joining, department, employee_photo }) => {
      return await Employee.findByIdAndUpdate(
        eid,
        { first_name, last_name, email, gender, designation, salary, date_of_joining, department, employee_photo },
        { new: true }
      );
    },
    deleteEmployeeById: async (_, { eid }) => {
      await Employee.findByIdAndDelete(eid);
      return `Employee with ID ${eid} deleted successfully.`;
    },
  },
};

module.exports = employeeResolvers;
