CREATE DATABASE Compras;
USE Compras;

##drop database Compras;

CREATE TABLE tbl_usuario (
id INTEGER PRIMARY KEY AUTO_INCREMENT, 
nome VARCHAR(150) NOT NULL,
email VARCHAR(60) NOT NULL UNIQUE,
userName VARCHAR(100) NOT NULL UNIQUE,
senha VARCHAR(50) NOT NULL,
dtNascimento DATE NOT NULL,
sexo ENUM('MASCULINO', 'FEMININO') NOT NULL,
telFixo CHAR(10) null,
telCell CHAR(11) not null,
ativo BIT NOT NULL DEFAULT 1, 
rg VARCHAR(9) NOT NULL,
cpf VARCHAR (11) UNIQUE NOT NULL,
tipo ENUM('FUNCIONARIO', 'ADMINISTRADOR', 'CLIENTE') NOT NULL );

INSERT INTO tbl_usuario (nome, email, userName, senha, dtNascimento, sexo, rg, cpf, tipo)
VALUES ("Talisson", "talis@talis.com" , "talis", "123456", '2000-03-29', "masculino", "381443131", "49674688897", "ADMINISTRADOR");

select * from tbl_usuario;

CREATE TABLE tbl_produtos (
id INTEGER PRIMARY KEY AUTO_INCREMENT,
codBarras BIGINT UNIQUE NOT NULL,
nome VARCHAR(100) NOT NULL,
descricao VARCHAR(100) NOT NULL,
preco FLOAT NOT NULL,
estoque INTEGER NOT NULL,
foto VARCHAR(200) NULL);

##drop table tbl_produtos;

select * from tbl_produtos;