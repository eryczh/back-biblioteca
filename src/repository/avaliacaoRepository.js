import con from "./connection.js";

export async function criarAvaliacao(avaliacao) {
    let command = `
        INSERT INTO avaliacoes (livro_id, user_id, nota, comentario)
        VALUES (?, ?, ?, ?)
    `;

    let resp = await con.query(command, [
        avaliacao.livro_id,
        avaliacao.user_id,
        avaliacao.nota,
        avaliacao.comentario
    ]);
    let info = resp[0];

    avaliacao.id = info.insertId;
    return avaliacao;
}

export async function listarAvaliacoes() {
    let command = `
        SELECT * FROM avaliacoes
    `;

    let resp = await con.query(command, []);
    let linhas = resp[0];

    return linhas;
}

export async function listarAvaliacoesPorLivro(livro_id) {
    let command = `
        SELECT * FROM avaliacoes
        WHERE livro_id = ?
    `;

    let resp = await con.query(command, [livro_id]);
    let linhas = resp[0];

    return linhas;
}

export async function listarAvaliacoesPorUsuario(user_id) {
    let command = `
        SELECT * FROM avaliacoes
        WHERE user_id = ?
    `;

    let resp = await con.query(command, [user_id]);
    let linhas = resp[0];

    return linhas;
}

export async function deletarAvaliacao(id) {
    let command = `
        DELETE FROM avaliacoes WHERE id = ?
    `;

    let resp = await con.query(command, [id]);
    let info = resp[0];

    return info.affectedRows;
}

export async function atualizarAvaliacao(avaliacao, id) {
    const command = `
        UPDATE avaliacoes
        SET livro_id = ?, user_id = ?, nota = ?, comentario = ?
        WHERE id = ?
    `;

    try {
        const [rows] = await con.query(command, [
            avaliacao.livro_id,
            avaliacao.user_id,
            avaliacao.nota,
            avaliacao.comentario,
            id
        ]);
        return rows.affectedRows;
    } catch (err) {
        console.error("Erro ao atualizar avaliação", err);
        throw err;
    }
}
