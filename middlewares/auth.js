var jwt = require('jsonwebtoken');

module.exports = {
    verifyToken: async (req, res, next) => {
        const token = req.headers.authorization;
        try {
            if(token){
                const payload = await jwt.verify(token, process.env.JSONSECRET);
                req.user = payload;
                next()
            }else{
                return res.json({error:'Token required!'})
            }
        } catch (error) {
            next(error);
        }
    }
}