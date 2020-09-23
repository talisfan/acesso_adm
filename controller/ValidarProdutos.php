<?php
    session_start();

    if(empty($_POST)) //validação para não acessar diretamente essa pág - testar se post está vazio
    {
        header("Location: ../index.php");
        die(); // finaliza o script e não continua == break
    }  
    
    $descricao = trim($_POST['descricao']); 
    $nomeP = trim($_POST['nomeP']); 
    $codBarras = trim($_POST['codBarras']);
    $preco = trim($_POST['preco']);
    $estoque = trim($_POST['estoque']);

    if(empty($descricao) || strlen($descricao) < 3){
        die("erroDescricao");
    }
    if(empty($nomeP) || strlen($nomeP) < 3){
        die("erroNome");
    }
    if(empty($codBarras)){
        die("erroCodBarras");
    }elseif(strlen($codBarras) <> 13){
        die("codCurto");
    }
    if(empty($preco)){
        die("erroPreco");
    }
    if(empty($estoque)){
        die("erroEstoque");
    }

    include_once '../model/ProdutosModel.php';
?>