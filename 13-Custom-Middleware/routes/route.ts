// routes/auth.ts
import express from 'express';
import { handleAuthentication } from '../controllers/signUp';
import { handleLogin } from '../controllers/login';

const data  = require("../urls.json");
export const router = express.Router();
interface URL {
    originalURL: string;
    shortURL: string;
    createdBy: string;
  }
router.post('/signup', handleAuthentication);
router.post('/login', handleLogin);
router.get("/api/:url",(req,res)=>{
   const url = req.params.url;
   const findURL = data.find((r:URL) => r.shortURL=url);
   if(findURL){
       return res.redirect(findURL.originalURL);
    }
    else{
        return res.redirect("/");
   }
})

// router.post("/admin/users",handleGetUsers)