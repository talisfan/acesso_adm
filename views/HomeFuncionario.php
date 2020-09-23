<?php
session_start();

if (!isset($_SESSION['tipo'])) {
    header("Location: ../index.php");
    die(); // ou exit() 
} elseif ($_SESSION['tipo'] == "ADMINISTRADOR") {
    header("Location: CadastroAdm.php");
    die();
} elseif ($_SESSION['tipo'] == "CLIENTE") {
    header("Location: Home.php");
    die();
}

//resgatando nome do user pela sessão        
$nome = $_SESSION['nome'];
?>

<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../node_modules/bootstrap/dist/css/bootstrap.css">
    <link rel="icon" href="../img/icons/icon.png">
    <title>Acesso Funcionário</title>
    <style>
        .home:hover {
            cursor: default;
        }

        body {
            background: url("../img/tech.jpg") no-repeat center center fixed;
            -webkit-background-size: cover;
            -moz-background-size: cover;
            -o-background-size: cover;
            background-size: cover;
            font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
            color: white;
            padding: 10px;
        }

        /* TIRAR SETAS DO CANTO DE INPUT NUMERO */
        input[type=number]::-webkit-inner-spin-button {
            -webkit-appearance: none;
        }

        input[type=number] {
            -moz-appearance: textfield;
            appearance: textfield;
        }
    </style>    
</head>

<body>
    <nav class="navbar navbar-expand-md navbar-light rounded" style="background-color: rgba(35, 112, 214, 0.562);">
        <img src="../img/icons/logo.png" style="width: 70px; height: 40px; padding-right:20px;" alt="logo">
        <button class="navbar-toggler bg-light ml-auto" type="button" data-toggle="collapse" data-target="#conteudoNavbarSuportado" aria-controls="conteudoNavbarSuportado" aria-expanded="false" aria-label="Alterna navegação">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="conteudoNavbarSuportado">
            <ul class="navbar-nav mr-md-auto mt-3 mt-md-0">
                <li class="nav-item mt-md-0">
                    <a class="home nav-link active btn btn-info">Cadastrar Produtos</a>
                </li>
            </ul>
            <ul class="navbar-nav ml-md-auto mt-4 mt-md-0">
                <li class="nav-item">
                    <a class="lbl nav-link btn btn-dark text-light ml-md-2">
                        <?php echo $nome; ?>
                    </a>
                </li>
                <li class="nav-item">
                    <a href="../index.php" class="lbl nav-link btn btn-danger text-light ml-md-2 mt-2 mt-md-0">SAIR</a>
                </li>
            </ul>
        </div>
    </nav>
    <!---------------------------------->
    <div class="body" id="body">
        <h1 class="display-4 mx-auto text-center titulos mt-3" style="text-shadow: blue 1px 1px 1px">CADASTRO DE PRODUTOS </h1>
        <!--RISCA-->
        <div class="col-12" style="border-top: white 1px; border-style: groove;"></div>

        <h3 class="mt-2 ml-0 ml-md-3 titulos text-center text-md-left" style="text-shadow: blue 1px 1px 1px">Insira os dados do produto</h3>
        <!--FORM-->
        <div class="mt-3">
            <form action="../controller/ValidarProdutos.php" method="POST" id="FormProdutos" class="form">
                <div class="row mx-3">
                    <div class="col-md-8 col-12">
                        <!--NOME PRODUTO-->
                        <div class="row">
                            <input type="text" name="nomeP" id="nomeP" placeholder="Nome do produto" class="form-control" style="color: black;">
                            <div id="nomeErro" name="nomeErro" class="d-none">Nome inválido</div>
                        </div>
                        <!--DESCRIÇÃO-->
                        <div class="row mt-2">
                            <input type="text" name="descricao" id="descricao" placeholder="Descrição" class="form-control" style="color: black;">
                            <div id="descErro" name="descErro" class="d-none">Descrição inválida</div>
                        </div>
                        <!--COD BARRAS-->
                        <div class="row mt-2">
                            <input type="number" name="codBarras" id="codBarras" placeholder="Código de barras" class="form-control" style="color: black;">
                            <div id="codErro" name="codErro" class="d-none">Código de barras inválido</div>
                            <div class="d-none" id="codCurto" name="codCurto">O código de barras deve conter 13 caracteres !</div>
                        </div>
                        <!---PREÇO--->
                        <div class="row mt-2">
                            <input type="text" name="preco" id="preco" placeholder="Preço (use ponto no lugar de vírgulas)" class="form-control" style="color: black;">
                            <div id="erroPreco" name="erroPreco" class="d-none">Preço inválido</div>
                        </div>
                        <!---ESTOQUE--->
                        <div class="row mt-2">
                            <input type="number" name="estoque" id="estoque" placeholder="Quantidade" class="form-control" style="color: black;">
                            <div id="erroEstoque" name="erroEstoque" class="d-none">Estoque inválido</div>
                        </div>
                        <!---ENVIAR--->
                        <div class="row mt-2 d-none d-md-block">
                            <input type="submit" value="CADASTRAR" class="btn btn-outline-success ">
                        </div>
                    </div>
                    <div class="col-md-3 row ml-md-3">
                        <img src="../img/book.png" id="foto" name="foto" width="230px" height="250px" class="d-none d-md-block row ml-1" style="border: 2px rgb(1, 195, 243) groove; border-radius: 5px; background-color:rgba(19, 137, 233, 0.459);">
       
                        <input id="btnImg" name="btnImg" type="file" accept=".jpg,.jpeg,.png" class="ml-1 mt-2">
                        
                    </div>
                </div>
                <!---ENVIAR--->
                <div class="row m-3 d-block d-md-none">
                    <input type="submit" value="CADASTRAR" class="btn btn-outline-success ">
                </div>
            </form>
        </div>
    </div>

    <script src="../node_modules/jquery/dist/jquery.js"> </script>
    <script src="../node_modules/popper.js/dist/umd/popper.js"> </script>
    <script src="../node_modules/bootstrap/dist/js/bootstrap.js"> </script>
    <script src="../node_modules/switch/dist/sweetalert2.all.min.js"> </script>
    <script src="../javascript/Validacoes.js"></script>
</body>

</html>