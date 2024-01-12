// external imports
import express from "express";;
// internal imports
import {getMessage, handlePrivateMsg, singleDownloader, setDisappearingMsg, unsetDisappearingMsg} from '../controller/inboxController.mjs'
import fileUpload from "../middleware/users/fileUpload.mjs";

const inboxRouter = express.Router();


inboxRouter.post('/', getMessage);
inboxRouter.post('/privateMessage', fileUpload, handlePrivateMsg)
inboxRouter.get('/download/:fileName', singleDownloader);
inboxRouter.post('/setDisappearingMsg', setDisappearingMsg);
inboxRouter.post('/unsetDisappearingMsg', unsetDisappearingMsg);


export { inboxRouter }
