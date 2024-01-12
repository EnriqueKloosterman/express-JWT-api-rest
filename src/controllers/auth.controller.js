import { User } from '../database/models/User.js'
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

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
        const passwordIsValid = bcryptjs.compareSync(password, user.password);
        if (!passwordIsValid) {
            return res.status(401).json({
                message: 'Contraseña incorrecta'
            });        
        }

        const token = jwt.sign({ uid: user.id }, process.env.JWT_SECRET) 

        return res.status(200).json({ token })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'server error' })
    }
}