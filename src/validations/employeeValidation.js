const { check, validationResult } = require('express-validator');

const validateEmployee = [
    check('first_name', 'First name is required').not().isEmpty(),
    check('last_name', 'Last name is required').not().isEmpty(),
    check('email', 'Valid email is required').isEmail(),
    check('salary', 'Salary must be at least 1000').isFloat({ min: 1000 }),
    check('date_of_joining', 'Valid date is required').isISO8601(),
    check('designation', 'Designation is required').not().isEmpty(),
    check('department', 'Department is required').not().isEmpty(),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

module.exports = { validateEmployee };
