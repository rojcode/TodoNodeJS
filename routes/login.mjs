import express from 'express';
import chalk from 'chalk';
import path from 'path';
import { fileURLToPath } from 'url';
import __controller from '../controllers/user.mjs';

const __ex = express();
const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

__ex.use(express.static(path.join(__dirname, 'public')));

const __routerLogin = express.Router();



__routerLogin.get('/login',(req,res)=>{
    if(req.session.user){
        res.redirect('/');
    }else{
        res.render('login',{});
    }
})




__routerLogin.get('/signup',(req,res)=>{
    res.render('signup',{});
})

__routerLogin.post('/signup/create',__controller.createUser);
__routerLogin.post('/login/check',__controller.loginUser);





export default __routerLogin;