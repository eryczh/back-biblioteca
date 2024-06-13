import { criarAvaliacao, listarAvaliacoes, listarAvaliacoesPorLivro, listarAvaliacoesPorUsuario, deletarAvaliacao, atualizarAvaliacao } from "../repository/avaliacaoRepository.js";
import { Router } from "express";
const avaliacaoController = Router();

// Criar uma nova avaliação
avaliacaoController.post('/avaliacao', async (req, resp) => {
    const avaliacao = req.body;
    try {
        const novaAvaliacao = await criarAvaliacao(avaliacao);
        resp.status(201).send(novaAvaliacao);
    } catch (error) {
        resp.status(500).send({ message: "Erro ao criar nova avaliação" });
    }
});

// Listar todas as avaliações
avaliacaoController.get('/avaliacao', async (req, resp) => {
    try {
        const avaliacoes = await listarAvaliacoes();
        resp.status(200).send(avaliacoes);
    } catch (error) {
        resp.status(500).send({ message: "Erro ao listar avaliações" });
    }
});

// Listar avaliações por livro
avaliacaoController.get('/avaliacao/livro/:livro_id', async (req, resp) => {
    const livro_id = req.params.livro_id;
    try {
        const avaliacoes = await listarAvaliacoesPorLivro(livro_id);
        resp.status(200).send(avaliacoes);
    } catch (error) {
        resp.status(500).send({ message: "Erro ao listar avaliações por livro" });
    }
});

// Listar avaliações por usuário
avaliacaoController.get('/avaliacao/usuario/:user_id', async (req, resp) => {
    const user_id = req.params.user_id;
    try {
        const avaliacoes = await listarAvaliacoesPorUsuario(user_id);
        resp.status(200).send(avaliacoes);
    } catch (error) {
        resp.status(500).send({ message: "Erro ao listar avaliações por usuário" });
    }
});

// Deletar uma avaliação
avaliacaoController.delete('/avaliacao/:id', async (req, resp) => {
    const id = req.params.id;
    try {
        const result = await deletarAvaliacao(id);
        resp.status(200).send({ affectedRows: result });
    } catch (error) {
        resp.status(500).send({ message: "Erro ao deletar avaliação" });
    }
});

// Atualizar uma avaliação
avaliacaoController.put('/avaliacao/:id', async (req, resp) => {
    const id = req.params.id;
    const avaliacao = req.body;
    try {
        const result = await atualizarAvaliacao(avaliacao, id);
        resp.status(200).send({ affectedRows: result });
    } catch (error) {
        resp.status(500).send({ message: "Erro ao atualizar avaliação" });
    }
});

export default avaliacaoController;
