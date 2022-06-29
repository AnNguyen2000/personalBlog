class middleware{
    checkrole(req,res,next){
        req.params.boss = 0;
        if(req.user){
            if(req.user.role == 'user'){
                req.params.boss = 2;
                next();
            }
            else{
              req.params.boss = 1;
              next();
            }
        }else
        next()
    }

    checkadmin(req,res,next){
        if(req.user){
            if(req.user.role == 'admin'){
                next();
            }
            else{
                res.render('404');
            }
        }
        else{
            res.redirect('/login');
        }
        
    }
}
module.exports = new middleware;