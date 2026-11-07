const { body, validationResult ,param, query} = require("express-validator");

const validatePatient = [
  body('name')
    .notEmpty()
    .withMessage("name is requires")
    .isLength({min: 3})
    .withMessage("Name must be at least up to three characters"),

   body('age')
      .notEmpty()
      .withMessage("age is required")
      .isInt({min: 1})
      .withMessage("Age must be a valid number"),

  body('gender')
      .notEmpty()
      .withMessage('gender is requires')
      .isIn(['male','female'])
      .withMessage("Gender must be male or female"),

    body("phone")
        .notEmpty()
        .withMessage("Phone number is required")
        .isLength({ min: 11, max: 11 })
        .withMessage("Phone number must be exactly 11 digits")
        .isNumeric()
        .withMessage("Phone number must contain only digits"),

    body("address")
        .notEmpty()
        .withMessage("Address is required"),

    body("medical_history")
        .notEmpty()
        .withMessage("Medical history is required")
]

const validatePatientId = [
    param("id")
        .notEmpty()
        .withMessage("Patient ID is required")
        .isInt({ min: 1 })
        .withMessage("Patient ID must be a valid number")
]

const validatePatientGender = [
    query('gender')
        .optional()
        .isIn(['male', 'female'])
        .withMessage("Gender must be male or female")
]


const checkValidation = (req, res, next) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        })
    }
    next();
}

module.exports = {validatePatient, checkValidation,validatePatientId,validatePatientGender};