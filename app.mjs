// externel import
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import { Server } from 'socket.io';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors'
import { createServer } from 'http';

// internal import
import { notFoundHandler, errorHandler } from './middleware/common/errorHandler.mjs';
import { loginRouter} from './router/loginRouter.mjs';
import { usersRouter } from './router/usersRouter.mjs';
import { conversationsRouter } from './router/conversationsRouter.mjs';
import { inboxRouter } from './router/inboxRouter.mjs';
import { handleSocketConnections } from './socketIO/eventListeners.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({path: `${__dirname}/.env`});

const app = express();
const server = createServer(app);



mongoose
    .connect(process.env.MONGO_CONNECTION_STRING, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log('Database connection succesfull'))
    .catch(err => console.log(err));


// req parser

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(
    cors({ 
        origin: '*',
        credentials: true 
    })
)


const io = new Server(server, {
    timeout: 10000
});
io.on('connection', (socket) => {
    handleSocketConnections(socket);
})


//set static folder
app.use(express.static(path.join(__dirname, 'public')));


//parse cookies

app.use(cookieParser(process.env.COOKIE_SECRET));

//routing setup

app.use('/', loginRouter);
app.use('/conversations', conversationsRouter);
app.use('/users', usersRouter);
app.use('/inbox', inboxRouter);

//404 not found handler
app.use(notFoundHandler)

// common error handler
app.use(errorHandler)

server.listen(process.env.PORT, ()=>{
    console.log(`listening to port ${process.env.PORT}`)
})

export {io}