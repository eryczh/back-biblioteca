CREATE DATABASE biblioteca;

USE biblioteca;

CREATE TABLE livros (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    autor VARCHAR(255) NOT NULL,
    descricao TEXT,
    foto VARCHAR(255)
);

select * from livros;

insert into livros (titulo, autor, descricao, foto)
values('Uma vida pequena', 'Hanya Yanagihara ', 'Uma vida pequena é um dos livros mais surpreendentes, desafiadores, perturbadores e profundamente emocionantes das últimas décadas. Uma narrativa épica sobre amor e amizade de quatro jovens que consegue romper barreiras e impactar leitores. Candidato ao Prêmio Pulitzer de Literatura de 2016, além de finalista do Man Booker Prize e do National Book Award.', 'umaVidaPequena.jpg');

ALTER TABLE livros ADD COLUMN genero VARCHAR(100);

select * from livros;
UPDATE livros
SET genero = 'Ficção'
WHERE id = 1;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL
);

select * from users;

insert into users(nome, email, senha)
values ('eric', 'admin@gmail.com', 'admin123');

CREATE TABLE avaliacoes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    livro_id INT NOT NULL,
    user_id INT NOT NULL,
    nota INT NOT NULL,
    comentario TEXT,
    FOREIGN KEY (livro_id) REFERENCES livros(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);
