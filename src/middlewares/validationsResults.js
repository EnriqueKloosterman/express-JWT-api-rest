import { validationResult } from "express-validator";
import { body } from "express-validator";

export const validationResults = (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    next();
}

export const registerValiation = [
    body('name', 'El nombre debe tener al menos 3 letras')
      .trim()
      .notEmpty()
      .isLength({ min: 3 }),
  
    body('email', 'Debes ingresar un formato de correo electrónico válido')
      .trim()
      .notEmpty()
      .isEmail()
      .normalizeEmail(),
  
    body('password', 'La contraseña debe tener al menos 8 caracteres')
      .trim() 
      .notEmpty()
      .isLength({ min: 8 }),
  
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next();
    }
  ];
  
  export const loginValidation = [
    body('email', 'Debes ingresar un formato de correo electrónico válido')
      .trim()
      .notEmpty()
      .isEmail()
      .normalizeEmail(),
    body('password', 'La contraseña debe tener al menos 8 caracteres')
      .trim()
      .notEmpty()
      .isLength({ min: 8 }),
      
      (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
        next();
      }
  ];

  export const updateValiation = [
    body('name', 'El nombre debe tener al menos 3 letras')
      .if(body('name').exists())
      .isLength({ min: 3 }),
    body('email', 'Debes ingresar un formato de correo electrónico válido')
      .if(body('email').exists())
      .trim()
      .isEmail()
      .normalizeEmail(),
    
    (req, res, next) => {
      const errors = validationResult(req);
      if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next();
    }      
  ];