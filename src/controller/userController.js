import { userSave, userLogin, userLists, removerUser, updateUserSenha } from "../repository/userRepository.js";
import { Router } from "express";

let server = Router();

server.post('/user/register', async (req, resp) => {
    let user = req.body;
    try {
        let userInsert = await userSave(user);
        resp.status(201).send(userInsert);
    } catch (error) {
        resp.status(500).send({message: "Erro ao criar novo usuario"});
    }
});

server.post('/user/login', async (req, resp) => {
    let { email, senha } = req.body;
    try {
        let user = await userLogin(email, senha);
        if (user.length === 0) {
            resp.status(401).send({ message: "Email ou senha inválidas" });
        } else {
            resp.send({ loggedIn: true, user: user[0] });
        }
    } catch (error) {
        resp.status(500).send({ message: "Erro ao realizar login" });
    }
});

server.put('/user/senha', async (req, resp) => {
    let { email, newSenha } = req.body;
    try {
        let rowsUpdated = await updateUserSenha(email, newSenha);
        if (rowsUpdated === 0) {
            resp.status(404).send({ message: "Usuário não encontrado" });
        } else {
            resp.status(200).send({ message: "Senha atualizada com sucesso" });
        }
    } catch (error) {
        console.error(error);
        resp.status(500).send({ message: "Erro ao atualizar a senha" });
    }
});

server.get('/user', async (req, resp) => {
    try {
        let userl = await userLists();
        resp.send(userl);
    } catch (error) {
        resp.status(500).send({ message: "Erro ao listar usuários" });
    }
});
 
server.delete('/user/:id', async (req, resp) => {
    let id = req.params.id;
    try {
        let remove = await removerUser(id);
        if (remove == 0) {
            resp.status(404).send({ message: "Usuário não encontrado" });
        } else {
            resp.status(202).send({ message: "Usuário removido com sucesso" });
        }
    } catch (error) {
        resp.status(500).send({ message: "Erro ao remover usuário" });
    }
});

export default server;
