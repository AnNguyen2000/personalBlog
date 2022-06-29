const express = require('express');
const route = express.Router();
const ManagerController = require('../app/controllers/ManagerController');
const middleware = require('../config/middleware');
const upload = require('../config/multer');
route.get('/post',ManagerController.postManager);
route.get('/post/add',ManagerController.postAdd);
route.post('/post/add/process',upload.single('postimg'),ManagerController.postAddProcess);
route.post('/post/delete',ManagerController.postDelete);
route.post('/post/update',ManagerController.postUpdate);
route.post('/post/update/process',upload.single('postimg'),ManagerController.postUpdateProcess)
route.get('/account',ManagerController.accountManager);
route.get('/account/load',ManagerController.accountManagerLoad);
route.get('/account/add',ManagerController.accountAdd);
route.post('/account/add/process',ManagerController.accountAddProcess);
route.post('/account/delete',ManagerController.accountDelete);
route.post('/account/update',ManagerController.accountUpdate);
route.post('/account/update/process',ManagerController.accountUpdateProcess)
route.get('/comment',ManagerController.commentManager);
route.post('/comment/delete',ManagerController.comDelete);
module.exports = route;