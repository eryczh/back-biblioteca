import { userSave, userLists, removeUser} from "../repository/userRepository.js";

import { Router } from "express";
let server = Router();

server.post('/user', async (req, resp) => {
  let user = req.body;

  let userInsert = await userSave(user);
  resp.send(userInsert);
})

server.get('/user', async(req, resp) => {
  let userl = await userLists();
  resp.send(userl);
})

server.get('/user/login', async (req, resp) => {
  let userInsert = await userLogin();
  resp.send(userInsert);
})

server.delete('/user/:id', async(req, resp) => {
  let id = req.params.id;

  let remove = await removeUser(id);
  if(remove == 0)
    resp.status(404).send();
  else
    resp.status(202).send();
})

export default server;