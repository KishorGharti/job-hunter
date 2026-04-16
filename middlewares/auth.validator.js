import { body, validationResult } from "express-validator";

export const registerValidator = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required"),

  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email format")
    .normalizeEmail(),

  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isStrongPassword()
    .withMessage(
      "Password must contain at least 8 characters, 1 uppercase, 1 lowercase, 1 number, and 1 symbol"
    ),

    body("phone")
    .notEmpty()
    .withMessage("Phone number is required")
    .matches(/^(?:\+61|0)[2-478](?:[ -]?\d){8}$/)
    .withMessage("Invalid Australian phone number"),


  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }

    next();
  }
];