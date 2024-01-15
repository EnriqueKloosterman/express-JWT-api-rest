import { User } from '../database/models/User.js'
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { generateToken } from '../utils/tokenManager.js';

export const register = async (req, res) => {
    const email = req.body.email;
    const userInDB = await User.findOne({ email: email});
    if (userInDB) {
        return res.status(400).json({
            message: 'El email ya esta registrado'
        });    
    } 
    try {
        const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            password: bcryptjs.hashSync(req.body.password, 10)
        })
        await newUser.save();
        return res.status(201).json({ ok: true })
    } catch (error) {
       console.log(error.code);
       return res.status(500).json({ error: 'server error' })
    }
};

export const login = async (req, res) =>{
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(404).json({
                message: 'El usuario no existe'
            });        
        }
        const passwordHashed = bcryptjs.compareSync(password, user.password);
        if (!passwordHashed) {
            return res.status(401).json({
                message: 'Contraseña incorrecta'
            });        
        }

        const { token, expiresIn } = generateToken(user.id); 

        return res.status(200).json({ token, expiresIn })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'server error' })
    }
};

export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        const user = users.map(user => {
            return {
                name: user.name,
                email: user.email
            }
        });
        return res.status(200).json({user});
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'server error' });
    }
};

export const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.uid).lean();
        if (!user) {
            return res.status(404).json({ error: 'user not found' });
        }
        const { name, email } = user;
        return res.status(200).json({name, email});
    } catch (error) {
        return res.status(500).json({ error: 'server error' });
    }
}