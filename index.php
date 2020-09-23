<!DOCTYPE html>
<html lang="pt-br">

<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Home</title>
	<link rel="stylesheet" href="assets/node_modules/bootstrap/dist/css/bootstrap.css">
	<link rel="stylesheet" href="assets/css/Animates.css">
	<link rel="stylesheet" href="assets/css/DelayAnimates.css">
	<link rel="stylesheet" href="assets/css/HomeCss.css">	
</head>

<body>
	<div id="container" class="p-2 pt-5">
		<div id="divEscolha" class="mx-auto border border-secondary rounded col-md-6 col-11 my-5 shadow-lg py-4 animated fadeInDown" role="alert" style="background-color: rgb(255, 255, 255, 0.2);">
			<h1 class="display-4 lead text-center">SEJA BEM-VINDO !</h1>
			<h1 class="lead text-center mt-4">É novo por aqui ou ja tem uma conta ?</h1>

			<div class="row">
				<form id="escolha" action="assets/javascript/Validacoes.js" method="POST">
					<input type="submit" value="FAZER LOGIN" class="text-primary mt-4 btn ml-3" style="background:rgb(255, 255, 255, 0.0); font-size:30px">
				</form>
				<a href="views/CadastroCliente.php" class="text-primary mt-4 btn ml-auto mr-3" style="background:rgb(255, 255, 255, 0.0); font-size:30px">CADASTRAR-SE</a>
			</div>
		</div>

		<div id="divLogin" class="d-none mx-auto border border-secondary rounded col-md-6 col-11 my-5 shadow-lg py-4" style="background-color: rgb(255, 255, 255, 0.2);">
			<h2 class="display-4 text-center animated fadeInUp" role="alert"> LOGIN </h2>

			<form id="formLogin" method="POST" action="" class="px-4">
				<p class="text-center lead mt-4 animated fadeInUp delay0" role="alert">Nome de usuário ou e-mail</p>
				<input name="userLogin" id="userLogin" type="text" class="mx-auto form-control animated fadeInUp delay1 backForm" role="alert">

				<p class="text-center lead mt-3 animated fadeInUp delay2" role="alert">Senha</p>
				<input name="passLogin" id="passLogin" type="text" class="mx-auto form-control animated fadeInUp delay3 backForm" role="alert">

				<div class="row mt-4 px-3">
					<input type="submit" value="ENTRAR" class="col-md-6 col-12 btn btn-outline-light animated fadeInUp delay4" role="alert">
					<a href="#" class="col-md-6 col-12 text-md-right text-center pt-2 lead animated fadeInUp delay4" role="alert">Esqueci minha senha</a>
				</div>		

				<div class="text-center mt-3">
					<a href="" class="text-primary lead animated fadeInUp delay4" role="alert">CADASTRAR-SE</a>
				</div>
			</form>
		</div>
	</div>


	<script src="assets/node_modules/jquery/dist/jquery.min.js"> </script>
	<script src="assets/node_modules/popper.js/dist/umd/popper.min.js"> </script>
	<script src="assets/node_modules/bootstrap/dist/js/bootstrap.min.js"> </script>
	<script src="assets/node_modules/sweetAlert2/dist/sweetalert2.min.js'); ?>"> </script>
	<script src="assets/javascript/Validacoes.js'); ?>"> </script>
</body>

</html>
