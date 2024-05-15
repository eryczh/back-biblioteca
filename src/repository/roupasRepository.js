import con from './connection.js';

export async function addClothes(itens) {
  let command = `
    INSERT INTO tb_Roupa (nome_Roupa, desc_Roupa, preco_adm, tam_Roupa, mat_Roupa, img_Roupa)
          VALUES (?, ?, ?, ?, ?, ?)
  `

  let resp = await con.query(command, [itens.nome, itens.desc, itens.preco, itens.tam, itens.mat, itens.img])
  let info = resp[0];

  itens.id = info.insertId;
  return itens;
}

export async function listClothes() {
  let command = `
    SELECT  id_Roupa    id,
            nome_Roupa  nome,
            desc_Roupa  descricao,
            preco_adm   preco,
            tam_Roupa   tamanho,
            mat_Roupa   material,
            img_Roupa   imagem
    FROM tb_Roupa
  `;

  let resp = await con.query(command, []);
  let linhas = resp[0];

  return linhas;
}

export async function deleteClothes(id) {
  let command = `
    DELETE FROM tb_Roupa WHERE id_Roupa = ?
  `;

  let resp = await con.query(command, [id]);
  let info = resp[0];

  return info.affectedRows;
}

export async function alterClothes(roupa, id) {
  let command = `
    UPDATE tb_Roupa
    SET nome_Roupa = ?,
        desc_Roupa = ?,
        preco_adm = ?,
        tam_Roupa = ?,
        mat_Roupa = ?
    WHERE id_Roupa = ?
  `;

  let resp = await con.query(command, [roupa.nome, roupa.descricao, roupa.preco, roupa.tamanho, roupa.material, id]);
  let info = resp[0];

  return info.affectedRows;
}

export async function alterClothesImage(id, caminho) {
  let command = `
    UPDATE tb_Roupa
    SET img_Roupa = ?
    WHERE id_Roupa = ?
  `;

  let resp = await con.query(command, [caminho, id]);
  let info = resp[0];

  return info.affectedRows;
}

