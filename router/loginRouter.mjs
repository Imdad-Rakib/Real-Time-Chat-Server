// external imports
import express from "express";

// internal imports

import { login, logout } from "../controller/loginController.mjs";

import path from 'path';
import { fileURLToPath } from "url";

const loginRouter = express.Router();


//process 
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
loginRouter.get('/getImage/:user', function(req, res, next) {
  const Path = path.join(__dirname, `../public/uploads/avatars/${decodeURIComponent(req.params.user)}.png`);
  res.sendFile(Path);
})
loginRouter.post('/', login)

// logout
loginRouter.delete('/', logout)
export {loginRouter}

