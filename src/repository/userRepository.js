import con from "./connection.js";

export async function userSave(user) {
    let command = `
        INSERT INTO users (nome, email, senha)
        VALUES (?, ?, ?)
    `;

    let resp = await con.query(command, [
        user.nome,
        user.email,
        user.senha
    ]);
    let info = resp[0];

    user.id = info.insertId;
    return user;
}

export async function userLogin(email, senha) {
    let command = `
        SELECT * FROM users WHERE email = ? AND senha = ?
    `;

    let resp = await con.query(command, [email, senha]);
    let info = resp[0];

    return info;
}

export async function userLists() {
    let command = `
        SELECT * FROM users
    `;

    let resp = await con.query(command, []);
    let line = resp[0];

    return line;
}

export async function removerUser(id) {
    let command = `
        DELETE FROM users WHERE id = ?
    `;

    let resp = await con.query(command, [id]);
    let info = resp[0];

    return info.affectedRows;
}

export async function updateUserSenha(email, newSenha) {
    let command = `
        UPDATE users
        SET senha = ?
        WHERE email = ?
    `;

    let resp = await con.query(command, [newSenha, email]);
    let info = resp[0];

    return info.affectedRows;
}
