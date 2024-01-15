import { Router } from "express";
import { getAllUsers, getUser, login, register } from "../controllers/auth.controller.js";
import { validationResults, registerValiation, loginValidation } from "../middlewares/validationsResults.js";

const router = Router();

router.post('/login', loginValidation, validationResults, login);
router.post('/register', registerValiation, validationResults, register )
router.get('/users', getAllUsers );
router.get('/users/:id', getUser );

export default router;