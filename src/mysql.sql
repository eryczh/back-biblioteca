create database ftrxs;
use ftrxs;

create table tb_Admin (
	id_adm		  int primary key auto_increment,
    nome_adm		varchar(50) not null,
    email_adm	  varchar(25) not null,
    senha_adm		varChar(10) not null
);

select * from tb_Admin;

insert into tb_Admin (nome_adm, email_adm, senha_adm)
values ('Admin', 'admin@gmail.com', 'senha@123');

create table tb_Roupa (
    id_Roupa		int primary key auto_increment,
    nome_Roupa		varchar(30) not null,
    desc_Roupa		varchar(400) not null,
    preco_adm	  double not null,
    mat_Roupa		varchar(30) not null,
    img_Roupa		varchar(200) not null
);

insert into tb_Roupa (nome_Roupa, desc_Roupa, preco_adm, mat_Roupa, img_Roupa)
values ('Camiseta Preta', 'Camiseta preta básica de algodão', 125.99,  'Algodão', 'imagem.jpg');

select * from tb_Roupa;
