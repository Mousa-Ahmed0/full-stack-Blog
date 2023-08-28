const Jwt = require('jsonwebtoken');
//verify Token
function verifyToken(req,res,next){
    const authToken=req.headers.authorization;
    if(authToken){
        const token=authToken.split(" ")[1];
        try {
            const decodeToken=Jwt.verify(token,process.env.SECRET_KEY);
            req.user=decodeToken;
            next();
        } catch (error) {
            return res.status(401).json({meassage:"Invalid token, access denied"});
        }
    }else{
        return res.status(401).json({meassage:"No token provided, access denied"});
    }
}

//if admin
function ifAdmin(req,res,next){
    verifyToken(req,res,()=>{
        if(req.user.isAdmin) 
            next()
        else
             return     res.status(403).json({meassage:"Not allwed,only admin"});

    })
}

//only user himself
function verifyTokenOnlyUser(req,res,next){
    verifyToken(req,res,()=>{
        if(req.user.id===req.params.id) 
            next()
        else
             return     res.status(403).json({meassage:"Not allwed,only user himself"});

    });
}

module.exports={
    verifyToken,
    ifAdmin,
    verifyTokenOnlyUser
}