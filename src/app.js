import 'dotenv/config'

import userController from './controller/userController.js';
import roupasController from './controller/roupasController.js';


import express from 'express';
import cors from 'cors';

const server = express();
server.use(cors());
server.use(express.json());

server.use(userController);
server.use(roupasController);

server.use('/storage/roupa', express.static('storage/roupa'));

let port = process.env.PORT;
server.listen(port, () => console.log("API SUBIU!"));


