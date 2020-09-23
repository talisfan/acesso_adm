<?php
    session_start();

if(empty($_POST)) //validação para não acessar diretamente essa pág - testar se post está vazio
{
    header("Location: ../index.php");
    die(); // ou exit() 
}

$user = $_POST['user']; 
$pass = $_POST['pass']; 
if(empty($user))
{
    //echo "Preencha seu Email ou nome de usuário.";
    echo "ErroEmail";
    die();
} 
elseif(empty($pass)) 
{        
    echo "ErroSenha";
    die();
}

include_once '../model/LoginModel.php';

?>