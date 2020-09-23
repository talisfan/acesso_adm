<?php
    session_start();
    //validação para não acessar diretamente essa pág - testar se indice existe
    if(!isset($_SESSION['tipo'])) 
    { 
        header("Location: ../index.php");
        die(); // ou exit() 

    }elseif($_SESSION['tipo'] == "CLIENTE"){
        header("Location: Home.php");
        die();
    }elseif($_SESSION['tipo'] == "FUNCIONARIO"){
        header("Location: HomeFuncionario.php");
        die();
    }
?>

<!DOCTYPE html>
<html lang="pt-br">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../node_modules/bootstrap/dist/css/bootstrap.css">
    <link rel="icon" href="../img/icons/icon.png">
    <!--Ícone da Pág-->
    <title>Acesso ADM</title>
    <style>
        body {
            background: url("../img/TI.jpg") no-repeat center center fixed;
            -webkit-background-size: cover;
            -moz-background-size: cover;
            -o-background-size: cover;                        
            background-size: cover;
            font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
            padding: 10px;
        }

        .lbl {
            margin-left: 10px;
        }

        /* TIRAR SETAS DO CANTO DE INPUT NUMERO */
        input[type=number]::-webkit-inner-spin-button {
            -webkit-appearance: none;
        }

        input[type=number] {
            -moz-appearance: textfield;
            appearance: textfield;
        }

        /*iden do tipo data*/
        input[type=date]::-webkit-inner-spin-button {
            -webkit-appearance: none;
        }

        input[type=date] {
            -moz-appearance: textfield;
            appearance: textfield;            
        }

        .titulos {
            color: white;
        }
        .active:hover{
            cursor: default;
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
                    <a class="nav-link btn btn-info active">Cadastrar usuários</a>
                </li>
                <li class="nav-item mt-1 mt-md-0">
                    <a href="#" class="nav-link btn btn-info ml-0 ml-md-2">Funcionarios</a>
                </li>
                <li class="nav-item mt-1 mt-md-0">
                    <a href="#" class=" nav-link btn btn-info ml-0 ml-md-2">Bloquear usuário</a>
                </li>
                <li class="nav-item mt-1 mt-md-0">
                    <a href="#" class="lbl nav-link btn btn-info ml-0 ml-md-2">Produtos</a>
                </li>
            </ul>
            <ul class="navbar-nav ml-md-auto mt-4 mt-md-0">
                <li class="nav-item">
                    <a class="lbl nav-link btn btn-dark text-light ml-md-2">
                        <?php echo $_SESSION['nome']; ?>
                    </a>
                </li>
                <li class="nav-item">
                    <a href="../index.php" class="lbl nav-link btn btn-danger text-light ml-md-2 mt-2 mt-md-0">SAIR</a>                
                </li>                   
            </ul>
        </div>
    </nav>

    <div class="body" id="body">
        <h1 class="display-4 mr-md-auto text-center text-md-left ml-3 titulos mt-3" style="text-shadow: blue 1px 1px 1px">CADASTRO DE USUÁRIOS </h1>
        <!--RISCA-->
        <div class="col-lg-6 col-12 d-none ml-3 d-md-block" style="border-top: white 1px; border-style: groove;"></div>

        <h3 class="mt-2 ml-0 ml-md-3 titulos text-center text-md-left" style="text-shadow: blue 1px 1px 1px">Insira os dados do usuário</h3>
        <!--FORM-->
        <div class="mt-3">
            <form action="../controller/ValidarCadastro.php" method="POST" id="FormCad" class="form">
                <!--NOME-->
                <div class="col-md-6 col-12">
                    <input type="text" name="name" id="name" placeholder="*Nome completo" class="form-control" style="color: black;">
                </div>
                <!--EMAIL-->
                <div class="col-md-6 col-12 mt-2">
                    <input type="email" name="email" id="email" placeholder="*E-mail" class="form-control" style="color: black;">
                </div>
                <!--USERNAME-->
                <div class="col-md-6 col-12 mt-2">
                    <input type="text" name="userName" id="userName" placeholder="*Nome de usuário" class="form-control" style="color: black;">
                </div>
                <!--CPF-->
                <div class="col-md-6 col-12 mt-2">
                    <input type="number" name="cpf" id="cpf" placeholder="*CPF  (sem pontos/traços)" class="form-control" style="color: black;">
                </div>
                <div class="d-none" id="cpfInvalido" name="cpfInvalido">O CPF deve conter 11 caracteres !</div>
                <!---RG--->
                <div class="col-md-6 col-12 mt-2">
                    <input type="text" data-ls-module="charCounter" maxlength="9" name="rg" id="rg" placeholder="*RG (sem pontos/traços)" class="form-control" style="color: black;">
                </div>
                <!---TIPO USER--->
                <div class="col-md-6 col-12 mt-2">
                    <select name="tipo" id="tipo" class="form-control" style="color: black;">
                    <option value="ADMINISTRADOR">ADMINISTRADOR</option>
                    <option value="FUNCIONARIO">FUNCIONÁRIO</option>
                    </select>
                </div>
                <!--TELL-->
                <div class="col-12 col-md-7 row">
                    <!--TELLFIXO-->
                    <div class=" col-md-5 mt-2">
                        <input type="number" name="tellFixo" id="tellFixo" placeholder="Tel Fixo" class="form-control" style="color: black;">
                    </div>
                    <!--TELLCELL-->
                    <div class="col-12 col-md-6 mt-2">
                        <input type="number" name="tellCell" id="tellCell" placeholder="Tel Celular" class="form-control" style="color: black;">
                    </div>
                </div>
                <!--NASCIMENTO-->
                <div class="row col-md-7">
                    <div class="col-md-5 mt-2">                                       
                        <input type="date" name="date" id="date" class="form-control">
                    </div>
                    <!--SEXO-->
                    <div class="col-md-6 mt-2">
                        <div class="row" style="background-color: white; border-radius: 4px; 
                            margin-left: 1px; margin-right: 0.1px; font-size: medium; padding-top: 5px; height: 38px; border: 1px solid gray;">
                            <div style="color: rgb(109, 109, 109);" class="col-2 mr-3">*Sexo: </div>
                            <div style="color: black;" class="col"><input type="radio" name="sexo" value="Masculino">Masc </div>
                            <div style="color: black;" class="col"><input type="radio" name="sexo" value="Feminino">Fem </div>
                        </div>
                    </div>
                </div>
                <!--SENHA-->
                <div class="row col-12 col-md-7">
                    <div class="col-md-5 mt-2 col-12 ">
                        <input type="password" name="pass" id="pass" placeholder="*Senha" class="form-control" style="color: black;">
                    </div>
                    <!--CONFIRMAR SENHA-->
                    <div class="col-md-6 mt-2 col-12">
                        <input type="password" name="passC" id="passC" placeholder="*Confirmar senha" class="form-control" style="color: black;">
                        <div class="d-none" name="confirmePass" id="confirmePass">Confirme sua senha</div>
                        <div class="d-none" name="passErro" id="passErro">Senhas diferentes</div>
                    </div>
                </div>                
                <!-------------- BOTOES ----------------->
                <div class="row mt-3 col-12 col-md-6 mb-2" style="margin-left: 0%;">
                    <input name="cadastrar" class="btn btn-outline-primary mr-auto mt-2" type="submit" value="Cadastrar">
                    <input name="limpar" class="btn btn-outline-danger ml-auto mt-2" type="reset" value="Limpar Tudo">
                </div>
            </form>
        </div>

        <!-------------------------------------------------------------------->
        <script src="../node_modules/jquery/dist/jquery.js"> </script>
        <script src="../node_modules/popper.js/dist/umd/popper.js"> </script>
        <script src="../node_modules/bootstrap/dist/js/bootstrap.js"> </script>
        <script src="../javascript/Validacoes.js"></script>
        <script src="../node_modules/switch/dist/sweetalert2.all.min.js"> </script>
    </div>
</body>

</html>