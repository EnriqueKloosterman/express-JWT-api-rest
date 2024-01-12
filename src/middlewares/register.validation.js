import { body, validationResult } from "express-validator";

export const registerValiation = (req, res, next) =>[ 
    body('name', 'El nombre debe tener al menos 3 letras')
        .trim()
        .notEmpty()
        .isLength({ min: 3 }),
    body('email', 'debes ingresar un formato de mail valido')
        .trim()
        .notEmpty()
        .isEmail()
        .normalizeEmail(),
    body('password', 'la contraseña debe tener al menos 8 caracteres')
        .trim() 
        .notEmpty()
        .isLength({ min: 8 }),
        
    next()
] ;

// export const registerValiation = [
//     body('name', 'El nombre debe tener al menos 3 letras')
//       .trim()
//       .notEmpty()
//       .isLength({ min: 3 }),
  
//     body('email', 'Debes ingresar un formato de correo electrónico válido')
//       .trim()
//       .notEmpty()
//       .isEmail()
//       .normalizeEmail(),
  
//     body('password', 'La contraseña debe tener al menos 8 caracteres')
//       .trim() 
//       .notEmpty()
//       .isLength({ min: 8 }),
  
//     (req, res, next) => {
//       const errors = validationResult(req);
//       if (!errors.isEmpty()) {
//         return res.status(400).json({ errors: errors.array() });
//       }
//       next();
//     }
//   ];

