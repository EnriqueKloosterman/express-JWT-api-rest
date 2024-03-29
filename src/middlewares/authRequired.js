import jwt from 'jsonwebtoken';

export const requireToken  = (req, res, next) => {
    try {
                let token = req.cookies.token;

                if(!token)
                    throw new Error('no token found');

                // token = token.split(' ')[1];
          
                const {uid} = jwt.verify(token, process.env.JWT_SECRET);

                req.uid = uid;


                next();
    } catch (error) {
        console.log(error);
        const TokenVerificationErrors = {
            "invalid signature": "La firma del JWT no es válida",
            "jwt expired": "JWT expirado",
            "invalid token": "Token no válido",
            "No Bearer": "Utiliza formato Bearer",
            "jwt malformed": "JWT formato no válido"
        }
        return res.status(401).send({ error: TokenVerificationErrors[error.message] });
    }
}