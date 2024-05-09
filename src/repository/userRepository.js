import con from "./connection.js";

export async function userSave(user) {
  let command = `
    INSERT INTO tb_Admin (nome_adm, email_adm, senha_adm)
                  VALUES (?, ?, ?)
  `

  let resp = await con.query (command, [user.name, user.email, user.password])
  let info = resp[0];

  user.id = info.insertId;
  return user;
}

export async function userLists() {
  let command = `
    SELECT * 
      FROM tb_Admin
  `

  let resp = await con.query(command, []);
  let line = resp[0];

  return line;
}

export async function removeUser(id) {
  let command = `
    DELETE FROM tb_Admin WHERE id_adm = ?
  `

  let resp = await con.query(command, [id]);
  let info = resp[0];

  return info.affectedRows;
}