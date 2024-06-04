import con from "./connection.js";

export async function addClothes(roupa) {
  let command = `
    INSERT INTO tb_Roupa (nome_Roupa, desc_Roupa, preco_adm, mat_Roupa, img_Roupa)
          VALUES (?, ?, ?, ?, ?)
  `;

  let resp = await con.query(command, [
    roupa.nome,
    roupa.desc,
    roupa.preco,
    roupa.mat,
    roupa.img,
  ]);
  let info = resp[0];

  roupa.id = info.insertId;
  return roupa;
}

export async function listClothes() {
  let command = `
    SELECT  id_Roupa    id,
            nome_Roupa  nome,
            desc_Roupa  descricao,
            preco_adm   preco,
            mat_Roupa   material,
            img_Roupa   imagem
    FROM tb_Roupa
  `;

  let resp = await con.query(command, []);
  let linhas = resp[0];

  return linhas;
}

export async function listClothesPerId(id) {
  let command = `
      SELECT  id_Roupa    id,
          nome_Roupa  nome,
          desc_Roupa  descricao,
          preco_adm   preco,
          mat_Roupa   material,
          img_Roupa   imagem
      FROM tb_Roupa
      WHERE id_Roupa = ?
  `;

  let resp = await con.query(command, [id]);
  let linhas = resp[0];

  return linhas[0];
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
  const command = `
    UPDATE tb_Roupa
    SET nome_Roupa = ?,
        desc_Roupa = ?,
        preco_adm = ?,
        mat_Roupa = ?
    WHERE id_Roupa = ?
  `;

  try {
    const [rows] = await con.query(command, [
      roupa.nome,
      roupa.descricao,
      roupa.preco,
      roupa.material,
      id
    ]);
    return rows.affectedRows;
  } catch (err) {
    console.error("Erro ao atualizar roupa:", err);
    throw err;
  }
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