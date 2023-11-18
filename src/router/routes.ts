import express from "express";
import {getAllUsers, login, register} from "../controllers/auth-controller";
import {authenticated} from "../middleware/authentication";

const router  = express.Router();

router.post('/login', login)
router.post('/register', register)

// TODO add authoriztion and authentication
router.get('/users', authenticated, getAllUsers);


export default router;