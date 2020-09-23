<?php
    session_start();

if(empty($_POST)) //validação para não acessar diretamente essa pág - testar se post está vazio
{
    header("Location: ../index.php");
    die(); // finaliza o script e não continua == break
}

$name = $_POST['name']; 
$email = $_POST['email'];
$userName = $_POST['userName'];
$cpf = $_POST['cpf'];
$rg = $_POST['rg'];

$tellFixo = $_POST['tellFixo'];
if(empty($tellFixo)){
    $tellFixo = 0;
}

$tellCell = $_POST['tellCell'];
if(empty($tellCell)){
    $tellCell = 0;
}

$date = $_POST['date'];

if(empty($_POST['sexo'])){
    echo "camposVazios";
    die();
}else{
    $sexo = $_POST['sexo']; 
}

$pass = $_POST['pass'];
$passC = $_POST['passC'];

if(isset($_SESSION['cliente'])){
    $tipo = "CLIENTE";
}
if(isset($_SESSION['tipo']) && $_SESSION['tipo'] == "ADMINISTRADOR"){
    $tipo = $_POST['tipo'];
}

if(empty($name)){
    echo "camposVazios";    
    die();
}
elseif(strlen($name) < 3){
    echo "nomeIncompleto";
    die();
}
if(empty($email)){
    echo "camposVazios";
    die();
}
if(empty($userName)){
    echo "camposVazios";
    die();
}
if(empty($cpf)){
    echo "camposVazios";
    die();
}
elseif(strlen($cpf) <> 11){
    echo "cpfInvalido";
    die();
}
if(empty($rg)){
    echo "camposVazios";
    die();
}
if(empty($date)){
    echo "camposVazios";
    die();
}
elseif(strlen($date) > 10){
    echo "dataInvalida";
    die();
}
else{
    $date = implode("-",array_reverse(explode("/",$date))); //alterando formato pt-br para inserir no banco mySQL
}
if(empty($pass)){
    echo "camposVazios";
    die();
}
elseif(strlen($pass) < 6 ){
    echo "senhaCurta";
    die();
}
elseif(empty($passC)){
    echo "confirmePass";
    die();
}
elseif($pass != $passC ){
    echo "erroSenha";
    die();
} 

include_once '../model/CadModel.php';
?>