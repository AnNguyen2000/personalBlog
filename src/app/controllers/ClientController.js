const postModel = require('../models/Post');
const accModel = require('../models/BlogAcc');
const userModel = require('../models/BlogUser');
const comModel = require('../models/Comment');
const bcrypt = require("bcrypt");
class ClientController{
  
    client(req,res,next){
        var boss = 0;
        console.log('role number =',req.params.boss);
        boss = req.params.boss;
        postModel.find({}).exec()
        .then(posts=>{
           posts = posts.map(post =>post.toObject());
            res.render('index',{posts,boss});
        })

       
    }
    about(req,res,next){
        var boss = 0;
        console.log('role number =',req.params.boss);
        boss = req.params.boss;
        postModel.find({}).exec()
        .then(posts=>{
           posts = posts.map(post =>post.toObject());
            res.render('about',{posts,boss});
        })
    }
    contact(req,res,next){
        var boss = 0;
        console.log('role number =',req.params.boss);
        boss = req.params.boss;
        postModel.find({}).exec()
        .then(posts=>{
           posts = posts.map(post =>post.toObject());
            res.render('contact',{posts,boss});
        })
    }
    post(req,res,next){
        if(req.params){
            console.log('id:',req.params.id);
        }
        var boss = 0;
        console.log('role number =',req.params.boss);
        boss = req.params.boss;
        postModel.findById(req.params.id).exec()
        .then(posts=>{
            posts = posts.toObject();
            console.log(posts);
            comModel.find({post: req.params.id}).exec()
            .then(com=>{
                if(com){
                    com = com.map(com=>com.toObject())
                    postModel.find( { _id: { $nin: [posts._id] } } ).exec()
                    .then(more=>{
                        more = more.map(another=>another.toObject());
                        console.log('MORE:',more);
                        res.render('post',{posts,com,boss,more});
                    })
                    
                }
            })
            
        })
    }
    login(req,res,next){
        res.render('login');
    }
    logincheck(req,res,next){
        const error = req.flash('error')[0];
        res.render('login', {error});
    }
    logout(req,res,next){
        req.logout();
        res.redirect('/');
    }
    register(req,res,next){
        res.render('register');
    }
    registercheck(req,res,next){
            accModel.findById(req.body.username).exec()
            .then(dup=>{
                if(dup != null){
                    res.status(400).json();
                }
                else{
                    const bcryptpassword = bcrypt.hashSync(req.body.password, 10);
                    const newacc = new accModel({
                        _id: req.body.username,
                        password: bcryptpassword,
                    })
                    newacc.save()
                    .then(acc=>{
                        if(acc != null){
                            const newuser = new userModel({
                                _id:req.body.username,
                                name: req.body.name,
                                role:'user'
                            })
                            newuser.save()
                            .then(user=>{
                                if(user != null){
                                    console.log('register completed');
                                    res.status(200).json();
                                }
                                else{
                                    console.log('400 user');
                                    res.status(400).json();
                                }
                            })
                            .catch(()=>{
                                console.log('500 new user');
                                res.status(500).json();
                            })
                        }
                        else{
                            console.log('400 new acc');
                            res.status(400).json();
                        }
                    })
                    .catch(()=>{
                        console.log('500 new acc');
                        res.status(500).json();
                    })
                }
            })
            .catch(()=>{
                console.log('500 find');
                res.status(500).json() 
            })
        
        
    }
    comment(req,res,next){
        console.log('cmtpurport:',req.body.commentPurport);
        console.log('postid:',req.body.postid);
        if(req.user){
            console.log('user:',req.user);
            if(req.body.commentPurport){
                console.log('ok commpurport');
                postModel.findById(req.body.postid).exec()
                .then(post=>{
                    console.log('200 post');
                    post = post.toObject();
                    const newcom = new comModel({
                        userid: req.user._id,
                        post:req.body.postid,
                        postname:post.name,
                        name: req.user.name,
                        purport: req.body.commentPurport,
                    })
                    newcom.save()
                    .then(data=>{
                        if(data != null){
                            console.log('up comment completed');
                            comModel.find({post:req.body.postid}).exec()
                            .then(comdata =>{
                                comdata = comdata.map(com =>com.toObject())
                                res.status(200).json(comdata)})
                           
                        }
                        else{
                            console.log('up comment failed');
                            res.status(400).json();
                        }
                    })
                    .catch((err)=>{
                        console.log('500 newcomm: ',err);
                        res.status(500).json();
                    })
                })
                .catch(()=>{
                    console.log('500 post');
                    res.status(500).json();
                })
                
            }
            else{
                console.log('400 commpurport');
                res.status(400).json();
            }
        }
        else{
            console.log('Chưa đăng nhập');
            res.status(500).json();
        }
       
    }
    commentDelete(req,res,next){

    }
    commentCheck(req,res,next){
        console.log('comid: ',req.body.comid);
        console.log('user:',req.user);
        if(req.user){
            comModel.findById(req.body.comid).exec()
            .then(com=>{
                console.log('com: ',com);
                com = com.toObject();
                if(com){
                   
                    if(com.userid == req.user._id){
                        console.log('200 accept');
                        res.status(200).json(com);
                    }
                    else{
                        console.log('400 accept');
                        res.status(400).json();
                    }
                }
                else{
                    console.log('400 com');
                    res.status(400).json();
                }
            })
            .catch((err)=>{
                console.log('500 com: ',err);
                res.status(500).json();
            })
        }
        else{
            console.log('Chưa đăng nhập');
            res.status(404).json();
        }
    }
    commentDeleteClient(req,res,next){
        console.log(req.body.comid);
        comModel.findByIdAndDelete(req.body.comid).exec()
        .then(com=>{
            if(com){
                console.log('200 com');
                comModel.find({post:req.body.postid}).exec()
                .then(data=>{
                    data = data.map(data=>data.toObject());
                    if(data.length > 0){
                        console.log('200 find not empty');
                        res.status(200).json({data,empty:0});
                    }
                    else{
                        console.log('200 find empty');
                        res.status(200).json({data,empty:1});
                    }
                })
                .catch((err)=>{
                    console.log('500 find: ',err);
                    res.status(500).json();
                })
               
            }
            else{
                console.log('400 com');
                res.status(400).json();
            }
        })
        .catch((err)=>{
            console.log('500 com: ',err);
            res.status(500).json();
        })
    }
    commentUpdateClient(req,res,next){
        console.log(req.body.comid);
        comModel.findByIdAndUpdate(req.body.comid,{
            purport:req.body.purport,
        }).exec()
        .then(com=>{
            if(com){
                console.log('200 update');
                comModel.find({post:req.body.postid}).exec()
                .then(data=>{
                    data = data.map(data=>data.toObject());
                    if(data.length > 0){
                        console.log('200 find not empty');
                        res.status(200).json({data,empty:0});
                    }
                    else{
                        console.log('200 find empty');
                        res.status(200).json({data,empty:1});
                    }
                })
                .catch((err)=>{
                    console.log('500 find: ',err);
                    res.status(500).json();
                })
               
            }
            else{
                console.log('400 update');
                res.status(400).json();
            }
        })
        .catch(()=>{
            console.log('500 update');
            res.status(500).json();
        })
    }
    
}

module.exports = new ClientController;