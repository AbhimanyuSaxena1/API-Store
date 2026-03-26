import { Router } from "express";
import { 
  register ,
   login ,
    logout , 
    githubCallback  ,
    githubLogin
} from "../controllers/auth.controller.js";

const router = Router();

// user Auth 
router.post('/register', register);
router.post('/login', login);
router.get('/logout', logout);

// Github OAuth routes 
router.get('/github', githubLogin);
router.get('/github/callback', githubCallback);

export default router;