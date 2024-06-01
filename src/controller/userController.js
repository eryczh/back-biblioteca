import { userSave, userLists, removeUser, userLogin, updateUserPassword} from "../repository/userRepository.js";

import { Router } from "express";
let server = Router();

server.post('/user', async (req, resp) => {
  let user = req.body;

  let userInsert = await userSave(user);
  resp.send(userInsert);
})

server.post('/user/login', async (req, resp) => {
  let { email, password } = req.body;
  let user = await userLogin(email, password);

  if (user.length === 0) {
    resp.status(401).send({ message: "Email ou senha incorretos"});
  } else {
    resp.send({ loggedIn: true, user: user[0]});
  }
});

server.post('/user/register', async (req, resp) => {
  let user = req.body;
  try {
    let userInsert = await userSave(user);
    resp.status(201).send(userInsert);
  } catch (error) {
    resp.status(500).send({message: "Erro ao criar user"});
  }
});

server.put('/user/password', async (req, resp) => {
  let { email, newPassword } = req.body;

  try {
    let rowsUpdated = await updateUserPassword(email, newPassword);
    if (rowsUpdated === 0) {
      resp.status(404).send({ message: "Usuário não encontrado" });
    } else {
      resp.status(200).send({ message: "Senha atualizada com sucesso" });
    }
  } catch (error) {
    console.error(error); // Adicionando log para debug
    resp.status(500).send({ message: "Erro ao atualizar a senha" });
  }
});

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