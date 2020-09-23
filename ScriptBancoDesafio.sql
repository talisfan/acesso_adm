drop database DesafioTech_Database;
create database DesafioTech_Database default character set utf8 collate utf8_unicode_ci;
use DesafioTech_Database;

create table if not exists tbl_funcionario(
id integer not null primary key auto_increment,
nome varchar(200) not null,
cpf bigint unique not null,
telefone bigint not null,
email varchar(200) not null,
acesso enum('ADM', 'FUNCIONÁRIO', 'CLIENTE')
);

create table if not exists tbl_departamento(
id integer not null primary key auto_increment,
nome varchar(200) not null
);

insert into tbl_funcionario (nome, cpf, telefone, email, acesso)
values ("Talisson Maciel Luques", 49677788899, 11951184349, "talis@talis.com", "ADM");

select * from tbl_funcionario;

insert into tbl_departamento
values (1, "TI");

#select * from tbl_departamento;