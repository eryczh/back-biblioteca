import 'dotenv/config';
import express from 'express';
import cors from 'cors';

import userController from './controller/userController.js';
import livroController from './controller/livroController.js';
import avaliacaoController from './controller/avaliacaoController.js';

const server = express();
server.use(cors());
server.use(express.json());

server.use(userController);
server.use(livroController);
server.use(avaliacaoController);

server.use('/storage/capa', express.static('storage/capa'));

let port = process.env.PORT;
server.listen(port, () => console.log("API SUBIU!"));
