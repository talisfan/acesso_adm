drop database DesafioTech_Database;
create database DesafioTech_Database default character set utf8 collate utf8_unicode_ci;
use DesafioTech_Database;

create table if not exists tbl_departamentos(
idDepart integer not null primary key auto_increment,
nomeDepart varchar(200) not null unique
);

create table if not exists tbl_funcionarios(
id integer not null primary key auto_increment,
nome varchar(200) not null,
cpf varchar(15) not null unique,
telefone varchar(15) not null,
email varchar(200) not null unique,
acesso enum('ADM', 'FUNCIONÁRIO', 'CLIENTE'),
senha varchar(100) not null,
ativo bit not null default(1), ## 1=ativo; 0=inativo
idDepartamento integer not null,
FOREIGN KEY (idDepartamento) REFERENCES tbl_departamentos (idDepart)
);

insert into tbl_departamentos
values (1, "TI");

select * from tbl_departamentos;

insert into tbl_funcionarios (nome, cpf, telefone, email, senha, acesso, idDepartamento)
values ("Talisson Maciel Luques", "496.777.888-99", "(11) 95118-4349", "talis@talis.com", "123456", "ADM", 1);

select * from tbl_funcionarios;

select * from tbl_funcionarios f inner join tbl_departamentos d on (f.idDepartamento = d.id);

select f.nome, d.nome as DEPARTAMENTO from tbl_funcionarios f
inner join tbl_departamentos d on (d.id = f.idDepartamento);