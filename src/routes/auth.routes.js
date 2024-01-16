import { Router } from "express";
import { getAllUsers, getUser, login, register } from "../controllers/auth.controller.js";
import { validationResults, registerValiation, loginValidation } from "../middlewares/validationsResults.js";
import { requireToken } from "../middlewares/authRequired.js";

const router = Router();

router.post('/login', loginValidation, validationResults, login);
router.post('/register', registerValiation, validationResults, register )
router.get('/users', requireToken, getAllUsers );
router.get('/profile', requireToken, getUser );

export default router;