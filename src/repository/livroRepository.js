import con from "./connection.js";

export async function addLivros(livro) {
    let command = `
        INSERT INTO livros (titulo, autor, descricao, foto, genero)
        VALUES(?, ?, ?, ?, ?)
    `;

    let resp = await con.query(command, [
        livro.titulo,
        livro.autor,
        livro.descricao,
        livro.foto,
        livro.genero,
    ]);
    let info = resp[0];

    livro.id = info.insertId;
    return livro;
}

export async function listLivros() {
    let command = `
        SELECT id           id,
               titulo       titulo,
               autor        autor,
               descricao    descricao,
               foto         foto,
               genero       genero
        FROM livros
    `;

    let resp = await con.query(command, []);
    let linhas = resp[0];

    return linhas;
}

export async function listPerId(id) {
    let command = `
        SELECT id           id,
               titulo       titulo,
               autor        autor,
               descricao    descricao,
               foto         foto,
               genero       genero
        FROM livros
        WHERE id = ?
    `;

    let resp = await con.query(command, [id]);
    let linhas = resp[0];

    return linhas[0];
}

export async function deleteLivro(id) {
    let command = `
        DELETE FROM livros WHERE id = ?
    `;

    let resp = await con.query(command, [id]);
    let info = resp[0];

    return info.affectedRows;
}

export async function alterLivro(livro, id) {
    const command = `
        UPDATE livros
        SET titulo = ?,
            autor = ?,
            descricao = ?,
            genero = ?
        WHERE id = ?
    `;

    try {
        const [rows] = await con.query(command, [
            livro.titulo,
            livro.autor,
            livro.descricao,
            livro.genero,
            id
        ]);
        return rows.affectedRows;
    } catch (err) {
        console.error("Erro ao atualizar livro", err);
        throw err;
    }
}

export async function alterCapaLivro(id, caminho) {
    let command = `
        UPDATE livros
        SET foto = ?
        WHERE id = ?
    `;

    let resp = await con.query(command, [caminho, id]);
    let info = resp[0];

    return info.affectedRows;
}
