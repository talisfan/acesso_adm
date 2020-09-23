<?php
include_once 'conexao.php';

$sql = $conn->prepare("SELECT * FROM tbl_usuario WHERE email = ? OR userName = ? OR CPF = ?;"); 
$sql->bind_param("sss", $email, $userName, $cpf);
$sql ->execute(); 
$resultado = $sql ->get_result(); 
$linha = $resultado->fetch_assoc();
$sql -> close(); 

if(empty($linha)){

  $sql = $conn->prepare("INSERT INTO tbl_usuario (nome, email, userName, senha, RG, CPF, sexo, telFixo, telCell, dtNascimento, tipo) 
  VALUES ('$name', '$email', '$userName', '$pass', '$rg', $cpf, '$sexo', $tellFixo, $tellCell, '$date', '$tipo');"); 

  $sql->execute() or die("ErroBanco");

  $sql -> close(); // fecha a instrucao
  $conn -> close(); //fecha a conexão

  if($tipo == "CLIENTE"){
    echo "SucessoCadCliente";
  }else{
    echo "SucessoCadAdm";
  }
  

}else{
  echo "CadastroExistente";
}
?>