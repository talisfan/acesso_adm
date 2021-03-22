#use mysql;
#update user set authentication_string=password('root'), plugin='mysql_native_password' where user='talis';
#FLUSH PRIVILEGES;

drop database if exists acesso_adm;
create database if not exists acesso_adm default character set utf8 collate utf8_unicode_ci;
use acesso_adm;

create table if not exists tbl_departamentos(
	idDepart integer not null primary key auto_increment,
	nomeDepart varchar(200) not null unique
);

create table if not exists tbl_funcionarios(
	id integer not null primary key auto_increment,
	nome varchar(200) not null,
	telefone varchar(15) not null,
	email varchar(200) not null unique,
	acesso enum('ADM', 'FUNCIONÁRIO', 'CLIENTE'),
	senha varchar(100) not null,
	ativo bit not null default 1, ## 1=ativo; 0=inativo
	idDepart integer not null,
	FOREIGN KEY (idDepart) REFERENCES tbl_departamentos (idDepart)
);

##trigger para deletar departamento
Delimiter $
CREATE TRIGGER trigger_depart before delete
ON tbl_departamentos
FOR EACH ROW
BEGIN
	update tbl_funcionarios set idDepart = 1 where idDepart = old.idDepart;
END$
DELIMITER ;

insert into tbl_departamentos
values (1, "SEM DEPARTAMENTO");

insert into tbl_departamentos
values (2, "TI");

#delete from tbl_departamentos where idDepart = 2;

select * from tbl_departamentos;

insert into tbl_funcionarios (nome, telefone, email, senha, acesso, idDepart)
values ("Talisson Maciel Luques", "(11) 95118-4349", "talis@talis.com", "123456", "ADM", 1);

select * from tbl_funcionarios;

select f.nome, d.nomeDepart as DEPARTAMENTO from tbl_funcionarios f
inner join tbl_departamentos d on (d.idDepart = f.idDepart);