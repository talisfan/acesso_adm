<!DOCTYPE html>
<html lang="pt-br">

<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Cadastro</title>
	<link rel="stylesheet" href="../assets/node_modules/bootstrap/dist/css/bootstrap.css">
	<link rel="stylesheet" href="../assets/css/Animates.css">
	<link rel="stylesheet" href="../assets/css/DelayAnimates.css">
	<link rel="stylesheet" href="../assets/css/HomeCss.css">	
	<link rel="stylesheet" href="../assets/css/StylesInput.css">
</head>

<body>
	<div class="p-2 mx-auto border border-secondary rounded col-md-6 col-11 my-5 shadow-lg py-4 animated fadeInDown" role="alert" style="background-color: rgb(255, 255, 255, 0.2);">

		<h1 class="display-4 lead text-center">CADASTRO</h1>
		<form action="" method="POST" id="FormCad" class="form px-4">
			<!--NOME-->
			<input type="text" name="nome" id="nome" placeholder="*Nome completo" class="form-control backForm mx-auto mt-4">
			<div class="d-none" id="nomeInvalido" name="nomeInvalido">Por favor, informe seu nome completo !</div>

			<!--EMAIL-->
			<input type="email" name="email" id="email" placeholder="*E-mail" class="form-control backForm mx-auto mt-4">

			<!--USERNAME-->
			<input type="text" name="userName" id="userName" placeholder="*Nome de usuário" class="form-control backForm mx-auto mt-4">

			<!--CPF-->
			<input type="text" name="cpf" id="cpf" placeholder="*CPF  (sem pontos/traços)" class="form-control backForm mx-auto mt-4">

			<!---RG--->
			<input type="text" data-ls-module="charCounter" maxlength="9" name="rg" id="rg" placeholder="*RG (sem pontos/traços)" class="form-control backForm mx-auto mt-4">

			<!--TELL-->
			<div class="row">
				<!--TELCELL-->
				<div class="col-12 col-md-6 mt-4">
					<input type="text" name="telCell" id="telCell" placeholder="*Tel Celular" class="form-control backForm">
				</div>
				<!--TELFIXO-->
				<div class="col-md-6 mt-4">
					<input type="text" name="telFixo" id="telFixo" placeholder="Tel Fixo" class="form-control backForm">
				</div>
			</div>

			<!--DATA NASCIMENTO-->
			<div class="row">
				<div class="col-md-6 mt-4">
					<input type="text" placeholder="*Data de Nascimento" name="dtNascimento" id="dtNascimento" class="form-control backForm">
					<div class="d-none" id="dataInvalida" name="dataInvalida">DATA INVÁLIDA !</div>
					<div class="d-none" id="menorIdade" name="menorIdade">É necessário ter no mínimo 18 anos.</div>
				</div>
				<!--SEXO-->
				<div class="col-md-6 mt-4">
					<select name="sexo" id="sexo" class="form-control backForm custom-select" onfocus="style='color:black'" onblur="style='color:white'">
						<option value="default" selected>*SEXO</option>
						<option>MASCULINO</option>
						<option>FEMININO</option>
					</select>
					<div class="d-none" name="sexoErro" id="sexoErro">Informe seu sexo.</div>
				</div>
			</div>

			<!--SENHA-->
			<div class="row">
				<div class="col-md-6 mt-4">
					<input type="password" name="senha" id="senha" placeholder="*Senha" class="form-control backForm">
					<div class="d-none" name="senhaCurta" id="senhaCurta">A senha deve conter no mínimo 6 caracteres.</div>
				</div>
				<!--CONFIRMAR SENHA-->
				<div class="col-md-6 mt-4">
					<input type="password" name="confSenha" id="confSenha" placeholder="*Confirmar senha" class="form-control backForm">
					<div class="d-none" name="passErro" id="passErro">Senhas diferentes</div>
				</div>
			</div>

			<!-------------- BOTOES ----------------->
			<div class="row mx-auto mt-4">
				<input name="cadastrar" class="btn btn-success col-5 mr-auto" type="submit" value="Cadastrar">
				<input name="limpar" class="btn btn-danger ml-auto" type="reset" value="Limpar Tudo">
			</div>

			<div class="text-center mt-4">
				<a href="" class="text-primary lead">Fazer login</a>
			</div>
		</form>
	</div>

	<script src="../assets/node_modules/jquery/dist/jquery.min.js"> </script>
	<script src="../assets/node_modules/popper.js/dist/umd/popper.min.js"> </script>
	<script src="../assets/node_modules/bootstrap/dist/js/bootstrap.min.js"> </script>
	<script src="../assets/node_modules/sweetAlert2/dist/sweetalert2.min.js"> </script>
	<script src="../assets/node_modules/sweetAlert2/dist/sweetalert2.all.min.js"> </script>
	<script src="../assets/node_modules/maskedInputJquery/dist/jquery.maskedinput.min.js"> </script>
	<script src="../assets/javascript/Validacoes.js"> </script>
	<script src="../assets/masks/masks_cad.js"> </script>
</body>

</html>
