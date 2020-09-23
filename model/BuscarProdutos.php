<?php
    include_once 'conexao.php';

    $sql = $conn->prepare("SELECT * FROM tbl_produtos WHERE estoque > 0 ORDER BY id DESC;");     
    $sql ->execute(); 
    $resultado = $sql ->get_result(); 
?>