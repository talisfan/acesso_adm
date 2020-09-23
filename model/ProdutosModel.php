<?php
include_once 'conexao.php';

$sql = $conn->prepare("SELECT * FROM tbl_produtos WHERE codBarras = ?;");
$sql->bind_param("i", $codBarras);
$sql ->execute(); 

$resultado = $sql ->get_result(); 
$linha = $resultado->fetch_assoc();
$sql -> close(); 

if(empty($linha)){
    $sqli = $conn->prepare("INSERT INTO tbl_produtos (codBarras, nome, descricao, preco, estoque) 
    VALUES ($codBarras, '$nomeP', '$descricao', $preco, $estoque);"); 

    $sqli->execute() or die("ErroBanco");

    $sqli -> close(); // fecha a instrucao
    $conn -> close(); //fecha a conexão

    echo "SucessoCadProduto";
    
}
else{
    echo "ProdutoCadastrado";
}
?>