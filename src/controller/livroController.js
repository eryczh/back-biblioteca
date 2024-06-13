import express from 'express';
import multer from 'multer';
import { addLivros, listLivros, listPerId, deleteLivro, alterLivro, alterCapaLivro } from '../repository/livroRepository.js';

const livroController = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'storage/capa'); 
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + '-' + file.originalname); // Nome único para o arquivo
    }
});

const upload = multer({ storage: storage });


livroController.post('/livros', upload.single('foto'), async (req, res) => {
    const livro = req.body;
    if (req.file) {
        
        livro.foto = `capa/${req.file.filename}`;
        console.log("Caminho da imagem salva:", livro.foto);
    }
    try {
        const novoLivro = await addLivros(livro);
        res.status(201).send(novoLivro);
    } catch (error) {
        res.status(500).send({ message: "Erro ao adicionar um novo livro" });
    }
});


livroController.get('/livros', async (req, res) => {
    try {
        const livros = await listLivros();
        res.status(200).send(livros);
    } catch (error) {
        res.status(500).send({ message: "Erro ao listar os livros" });
    }
});

livroController.get('/livros/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const livro = await listPerId(id);
        if (!livro) {
            res.status(404).send({ message: "Livro não encontrado" });
        } else {
            res.status(200).send(livro);
        }
    } catch (error) {
        res.status(500).send({ message: "Erro ao obter o livro" });
    }
});


livroController.delete('/livros/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const result = await deleteLivro(id);
        if (result === 0) {
            res.status(404).send({ message: "Livro não encontrado" });
        } else {
            res.status(200).send({ message: "Livro deletado com sucesso" });
        }
    } catch (error) {
        res.status(500).send({ message: "Erro ao deletar o livro" });
    }
});


livroController.put('/livros/:id', async (req, res) => {
    const id = req.params.id;
    const livro = req.body;
    try {
        const result = await alterLivro(livro, id);
        if (result === 0) {
            res.status(404).send({ message: "Livro não encontrado" });
        } else {
            res.status(200).send({ message: "Livro atualizado com sucesso" });
        }
    } catch (error) {
        res.status(500).send({ message: "Erro ao atualizar o livro" });
    }
});

livroController.put('/livros/capa/:id', upload.single('foto'), async (req, res) => {
    const id = req.params.id;
    if (!req.file) {
        return res.status(400).send({ message: "Capa não enviada" });
    }
    const caminho = `capa/${req.file.filename}`;
    try {
        const result = await alterCapaLivro(id, caminho);
        if (result === 0) {
            res.status(404).send({ message: "Livro não encontrado" });
        } else {
            res.status(200).send({ message: "Capa do livro atualizada com sucesso" });
        }
    } catch (error) {
        res.status(500).send({ message: "Erro ao atualizar a capa do livro" });
    }
});


//livroController.put('/livros/capa/:id', upload.single('foto'), async (req, resp) => {
//    let id = req.params.id;
//    let capa = req.files.path;
//
//    let linhasAfetadas = await alterCapaLivro(id, capa);
//    if (linhasAfetadas == 0)
//        resp.status(404).send();
//    else 
//        resp.status(202).send();
//});


export default livroController;
