<?php

    $servidor = '127.0.0.1'; //mesm coisa que localhost
    $usuario = 'root';
    $senha = '';
    $banco = 'ComprasDataBase';

    $conn = mysqli_connect($servidor, $usuario, $senha, $banco); // nessa ordem
    $sql = "SET NAMES 'utf8'";
    mysqli_query($conn, $sql); //roda uma query(comando sql) com parametros, conexao e a query
    $sql = 'SET character_set_connection=utf-8';
    mysqli_query($conn, $sql);
    $sql = 'SET character_set_client=utf-8';
    mysqli_query($conn, $sql);
    $sql = 'SET character_set_results=utf-8';
    mysqli_query($conn, $sql);

    if(mysqli_connect_error($conn))
    {
        echo ("Erro na conexão: " .mysqli_connect_error());
        die();
    }
    

?>