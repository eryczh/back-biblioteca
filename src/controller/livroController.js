import express from 'express';
import multer from 'multer';
import { addLivros, listLivros, listPerId, deleteLivro, alterLivro, alterCapaLivro } from '../repository/livroRepository.js';

const livroController = express.Router();

const upload = multer({ dest: 'storage/capa' });


livroController.post('/livros', upload.single('foto'), async (req, resp) => {
    let livro = req.body;
    let foto = req.file;
  
    livro.foto = foto ? foto.path : null;
  
    let insertLivro = await addLivros(livro);
    resp.send(insertLivro);
  }); 
  


  livroController.get('/livros', async (req, resp) => {
    let listLivro = await listLivros();
    console.log(listLivro);  
    resp.send(listLivro);
});


livroController.get('/livros/:id', async (req, resp) => {
    let id = req.params.id;
    
    let livroPerId = await listPerId(id);

    resp.send(livroPerId);
});


livroController.delete('/livros/:id', async (req, resp) => {
    let id = req.params.id;
    
    let linesAffect = await deleteLivro(id);
    if (linesAffect === 0) {
        resp.status(404).send({ message: "Livro não encontrado" });
    } else {
        resp.status(200).send({ message: "Livro deletado com sucesso" });
    }
    
});


livroController.put('/livros/:id', async (req, res) => {
    const id = req.params.id;
    const livro = req.body;

    const result = await alterLivro(livro, id);
    if (result === 0) {
        res.status(404).send({ message: "Livro não encontrado" });
    } else {
        res.status(200).send({ message: "Livro atualizado com sucesso" });
    }
    
});

livroController.put('/livros/capa/:id', upload.single('foto'), async (req, resp) => {
    let id = req.params.id;
    let capa = req.file ? `storage/capa/${req.file.filename}` : null;

    let linesAffect = await alterCapaLivro(id, capa);
    if (linesAffect == 0) {
        resp.status(404).send();
    } else {
        resp.status(202).send();
    }
});


//livroController.put('/livros/capa/:id', upload.single('foto'), async (req, res) => {
//    const id = req.params.id;
//    if (!req.file) {
//        return res.status(400).send({ message: "Capa não enviada" });
//    }
//    const caminho = `capa/${req.file.filename}`;
//    try {
//        const result = await alterCapaLivro(id, caminho);
//        if (result === 0) {
//            res.status(404).send({ message: "Livro não encontrado" });
//        } else {
//            res.status(200).send({ message: "Capa do livro atualizada com sucesso" });
//       }
//    } catch (error) {
//        res.status(500).send({ message: "Erro ao atualizar a capa do livro" });
//    }
//});


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
