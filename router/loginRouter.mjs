// external imports
import express from "express";
import { promises as fsPromises } from 'fs';

// internal imports

import { login, logout } from "../controller/loginController.mjs";

import path from 'path';
import { fileURLToPath } from "url";

const loginRouter = express.Router();


//process 
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
loginRouter.get('/getImage/:user', async function(req, res, next) {
  let filePath = path.join(__dirname, `../public/uploads/avatars/${decodeURIComponent(req.params.user)}.png`);
  try {
    await fsPromises.stat(filePath);
    res.sendFile(filePath);
  } catch (err) {
    if (err.code === 'ENOENT') {
      filePath = path.join(__dirname, '../public/uploads/avatars/nophoto.png');
      console.log('nophoto')
      res.sendFile(filePath);
    } else {
      console.error('Error checking for user photo:', err);
    }
  }
})
loginRouter.post('/', login)

// logout
loginRouter.delete('/', logout)
export {loginRouter}

