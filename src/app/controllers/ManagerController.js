const postModel = require('../models/Post');
const accModel = require('../models/BlogAcc');
const userModel = require('../models/BlogUser');
const comModel = require('../models/Comment');
const bcrypt = require('bcrypt');
class ManagerController{
    postManager(req,res,next){
        postModel.find({}).exec()
        .then(posts=>{
            posts = posts.map(post=>post.toObject());
            if(posts.length > 0){
                res.render('postManager',{posts});
            }
            else{
                res.render('postManager',{posts,empty:1});
            }
            
        })
     
    }
    postAdd(req,res,next){
        console.log('Access postAdd');
        res.render('postAdd');
    }
    postAddProcess(req,res,next){
        console.log('name:',req.body.postname);
        console.log('desc:',req.body.postdesc);
        console.log('purport:',req.body.postpurport);
        console.log('file: ',req.file);
        postModel.findOne({name: req.body.postname}).exec()
        .then(post=>{
            if(post != null){
                console.log('400 find');
                console.log(post);
                res.status(400).json();
            }
            else{
                console.log('200 find');
                const newpost = new postModel({
                    name:req.body.postname,
                    desc:req.body.postdesc,
                    purport:req.body.postpurport,
                    img:'/img/'+req.file.filename,
                })
                newpost.save()
                .then((data)=>{
                    if(data){
                        console.log('200 save');
                        res.status(200).json();
                    }
                    else{
                        console.log('400 save');
                        res.status(400).json();
                    }
                   
                })
                .catch(()=>{
                    console.log('500 create');
                    res.status(500).json();
                })
               
            }
        })
        .catch(()=>{
            console.log('500 find');
            res.status(500).json();
        })

    }
    postDelete(req,res,next){
        console.log('postid for delete:',req.body.postid);
        postModel.findByIdAndDelete(req.body.postid).exec()
        .then(post=>{
            if(post != null){
                console.log('200 delete ok');
                postModel.find({}).exec()
                .then(data=>{
                    if(data.length > 0){
                        console.log('data lenght:',data.length);
                        console.log('data for table - ok');
                        data = data.map(item=>item.toObject());
                        res.status(200).json(data);
                    }
                    else{
                        console.log('data for table - empty');
                        console.log('data lenght:',data.length);
                        console.log(data);
                        res.status(200).json({empty: 1});
                    }
                })
                .catch(()=>{
                    console.log('500 post');
                    res.status(500).json();
                })
            }
            else{
                console.log('400 find');
                res.status(400).json();
            }
        })
        .catch(()=>{
            console.log('500 find');
            res.status(500).json();
        })
        
    }
  
    postUpdate(req,res,next){
        console.log(req.body.postid);
        postModel.findById(req.body.postid).exec()
        .then(data=>{
            if(data){
                console.log('200 ok');
                res.status(200).json(data);
            }
            else{
                console.log('400 data');
                res.status(400).json();
            }
        })
        .catch(()=>{
            console.log('500 find');
            res.status(500).json();
        })
    }
    postUpdateProcess(req,res,next){
       console.log(req.body);
       if(!req.file){
           postModel.findByIdAndUpdate(req.body.postid,{
               name:req.body.postname,
               desc:req.body.postdesc,
               purport:req.body.postpurport,
           }).exec()
           .then(post=>{
               if(post){
                   console.log('200 update ok');
                   res.status(200).json();
               }
               else{
                console.log('400 update ok');
                res.status(400).json();
               }
           })
           .catch(()=>{
               console.log('500 update');
               res.status(500).json();
           })           
       }
       else{
            postModel.findByIdAndUpdate(req.body.postid,{
                name:req.body.postname,
                desc:req.body.postdesc,
                purport:req.body.postpurport,
                img:'/img/'+req.file.filename,
            }).exec()
            .then(post=>{
                if(post){
                    console.log('200 update ok');
                    res.status(200).json();
                }
                else{
                console.log('400 update ok');
                res.status(400).json();
                }
            })
            .catch(()=>{
                console.log('500 update');
                res.status(500).json();
            })  
       }
    }
    accountManager(req,res,next){
        res.render('accountManager');
    }
    accountManagerLoad(req,res,next){
        var empty = 0;
        accModel.find({}).exec()

        .then(accs=>{
            if(accs){
                console.log('200 acc');
                accs = accs.map(acc=>acc.toObject());
                userModel.find({}).exec()
                .then(users=>{
                    if(users){
                        console.log('200 user');
                        users = users.map(user=>user.toObject());
                        const data = {
                            accs,
                            users
                        }
                        res.status(200).json(data);
                    }
                    else{
                        console.log('400 user');
                   
                        res.status(400).json();
                    }
                })
                .catch((err)=>{
                    console.log('500 user - error: ',err);
                    res.status(500).json();
                })
            }
            else{
                console.log('400 acc');
                res.status(400).json();
            }
            
           
        })
        .catch(()=>{
            console.log('500 acc');

        })
       
        
    }
    accountAdd(req,res,next){
        res.render('accAdd');
    }
    accountAddProcess(req,res,next){
        console.log('data for account add: ',req.body);
        accModel.findById(req.body.username).exec()
        .then(acc=>{
            if(acc != null){
                console.log('400 find');
                console.log('dup acc: ',acc);
                res.status(400).json();
            }
            else{
                console.log('200 find');
                const bcryptpassword = bcrypt.hashSync(req.body.password, 10);
                    const newacc = new accModel({
                        _id: req.body.username,
                        password: bcryptpassword,
                    })
                newacc.save()
                .then((data)=>{
                    if(data){
                        console.log('200 create acc');
                        const newuser = new userModel({
                            _id:req.body.username,
                            name:req.body.name,
                            role:req.body.role,
                        })
                        newuser.save()
                        .then(user=>{
                            if(user){
                                console.log('200 create user');
                                console.log('create successfully');
                                res.status(200).json();
                            }
                            else{
                                console.log('400 create user');
                            
                                res.status(400).json();
                            }
                        })
                        .catch(()=>{
                            console.log('500 user');
                            res.status(500).json();
                        })
                    }
                    else{
                        console.log('400 create acc');
                        res.status(400).json();
                    }
                   
                })
                .catch((err)=>{
                    console.log('500 create acc: ',err);
                    res.status(500).json();
                })
               
            }
        })
        .catch((err)=>{
            console.log('500 find: ',err);
            res.status(500).json();
        })
    }
    accountDelete(req,res,next){
        console.log('accid for delete:',req.body.accid);
        accModel.findByIdAndDelete(req.body.accid).exec()
        .then(acc=>{
            if(acc != null){
                console.log('200 delete acc: ',acc);
                userModel.findByIdAndDelete(req.body.accid).exec()
                .then(user=>{
                    if(user != null){
                        console.log('200 delete user: ',user);

                        userModel.find({}).exec()
                        .then(data=>{
                            if(data.length > 0){
                                console.log('data lenght:',data.length);
                                console.log('data for acc table - ok');
                                data = data.map(item=>item.toObject());
                                console.log('data not empty: ',data);
                                res.status(200).json(data);
                            }
                            else{
                                console.log('data for acc table - empty');
                                console.log('data lenght:',data.length);
                                console.log(data);
                                res.status(200).json({empty: 1});
                            }
                        })
                        .catch(()=>{
                            console.log('500 post acc');
                            res.status(500).json();
                        })
                    }
                    else{
                        console.log('400 delete user: ',user);
                        res.status(400).json();
                    }
                   
                })
                .catch(()=>{
                    console.log('500 delete user');
                    res.status(500).json();
                })
                
            }
            else{
                console.log('404 delete acc: ',acc);
                res.status(404).json();
            }
        })
        .catch(()=>{
            console.log('500 delete acc');
            res.status(500).json();
        })
    }
    accountUpdate(req,res,next){
        console.log(req.body.accid);
        userModel.findById(req.body.accid).exec()
        .then(user=>{
            if(user){
                console.log('200 user');
                res.status(200).json(user);
            }
            else{
                console.log('400 user');
                res.status(400).json();
            }
        })
        .catch(()=>{
            console.log('500 user');
            res.status(500).json();
        })
    }
    accountUpdateProcess(req,res,next){
        console.log('post',req.body);
        userModel.findByIdAndUpdate(req.body.username,{
            _id:req.body.username,
            name:req.body.name,
            role:req.body.role,
        }).exec()
        .then(user=>{
            if(user){
                console.log('200 user');
                accModel.findByIdAndUpdate(req.body.username,{
                    _id:req.body.username,
                }).exec()
                .then(acc=>{
                    if(acc){

                        console.log('200 acc');
                        res.status(200).json();
                    }
                    else{
                        console.log('400 acc');
                        res.status(400).json();
                    }
                })
                .catch(()=>{
                    console.log('500 acc');
                    res.status(500).json();
                })
            }
            else{
                console.log('400 user');
                res.status(400).json();
            }
        })
        .catch(()=>{
            console.log('500 user');
            res.status(500).json();
        })        
    }

    commentManager(req,res,next){
        comModel.find({}).exec()
        .then(com=>{
            if(com){
                console.log('200 com');
                com = com.map(com=>com.toObject());
                if(com.length > 0){
                    res.render('commentManager',{com,empty:0});
                }
                else{
                    res.render('commentManager',{com,empty:1});
                }
             
            }
            else{
                console.log('400 com');
                res.status(400).json();
            }
        })
        .catch(()=>{
            console.log('500 com');
            res.status(500).json();
        })
       
    }

    comDelete(req,res,next){
        console.log(req.body.comid);
        comModel.findByIdAndDelete(req.body.comid).exec()
        .then(com=>{
            if(com){
                console.log('200 com');
                comModel.find({}).exec()
                .then(data=>{
                    if(data.length > 0){
                        res.status(200).json({data,empty:0});
                    }
                    else{
                        res.status(200).json({empty:1});
                    }
                })
                .catch(()=>{
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
 

}

module.exports = new ManagerController;