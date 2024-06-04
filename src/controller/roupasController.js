import multer from "multer";
import { Router } from "express";

import { addClothes, listClothes, deleteClothes, alterClothes, alterClothesImage, listClothesPerId } from "../repository/roupasRepository.js";

let server = Router();
const upload = multer({ dest: 'storage/roupa' })

server.post('/roupa', upload.single('imagem'), async(req, resp) => {
  let clothes = req.body;
  let img = req.file;

  clothes.img = img ? img.path : null;

  let insertClothes = await addClothes(clothes);
  resp.send(insertClothes);
})

server.get('/roupa', async(req, resp) => {
  let listsClothes = await listClothes();
  resp.send(listsClothes);
})

server.get('/roupa/:id', async (req, resp) => {
  let id = req.params.id;

  let clothesPerId = await listClothesPerId(id);

  resp.send(clothesPerId);
})

server.delete('/roupa/:id', async (req, resp) => {
  let id = req.params.id;

  let linesAffect = await deleteClothes(id);
  if (linesAffect == 0)
    resp.status(404).send();
  else
  resp.status(202).send();
})

server.put('/roupa/:id', async (req, resp) => {
  let id = req.params.id;
  let clothes = req.body;

  try {
    let linesAffect = await alterClothes(clothes, id);
    if (linesAffect == 0)
      resp.status(404).send();
    else
      resp.status(202).send();
  } catch (err) {
    resp.status(500).send("Erro ao atualizar roupa.");
  }
})

server.put('/roupa/imagem/:id', upload.single('imagem'), async (req, resp) => {
  let id = req.params.id;
  let clothes = req.file.path;

  let linhasAfetadas = await alterClothesImage(id, clothes);
  if (linhasAfetadas == 0)
    resp.status(404).send();
  else
    resp.status(202).send();
});

export default server;