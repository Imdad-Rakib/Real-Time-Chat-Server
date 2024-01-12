// external imports
import express from "express";

// internal imports

import { addUser, checkEmail, processEmail, passwordRecovery,  updatePassword, verifyPassOtp, searchUser, activeChats } from "../controller/usersController.mjs";


const usersRouter = express.Router();


//add user
usersRouter.put('/updatePassword', updatePassword)
usersRouter.post('/validateEmail', checkEmail, processEmail);
usersRouter.post('/addUser', addUser);
usersRouter.post('/forgotPassword', passwordRecovery);
usersRouter.post('/verifyPassOtp', verifyPassOtp);
usersRouter.post('/searchUser', searchUser);
usersRouter.post('/activeChats', activeChats);


export { usersRouter,  updatePassword }

