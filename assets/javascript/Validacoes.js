$(function () {
	$('#escolha').submit(function () {
		var obj = this;
		var form = $(obj);
		var dados = new FormData(obj);
		$.ajax({
			url: form.attr('action'),
			type: form.attr('method'),
			data: dados,
			processData: false,
			cache: false,
			contentType: false,
			success: function (data) {
				var divLogin = document.getElementById("divLogin");
				divLogin.className = "mx-auto border border-secondary rounded col-md-6 col-11 mt-5 shadow-lg py-4";
				var divEscolha = document.getElementById("divEscolha");
				divEscolha.className = "d-none";
			},//success
		});//ajax
		return false;
	});//function de dentro
});//function de fora

$(function () {
	$('#FormCad').submit(function () {
		var obj = this;
		var form = $(obj);
		var dados = new FormData(obj);
		$.ajax({
			url: form.attr('action'),
			type: form.attr('method'),
			data: dados,
			processData: false,
			cache: false,
			contentType: false,
			success: function (data) {
				if (data == "camposVazios") {
					const Toast = Swal.mixin({
						toast: true,
						position: 'top-end',
						showConfirmButton: false,
						timer: 2000,
						timerProgressBar: true,
						onOpen: (toast) => {
							toast.addEventListener('mouseenter', Swal.stopTimer)
							toast.addEventListener('mouseleave', Swal.resumeTimer)
						}
					})

					Toast.fire({
						icon: 'error',
						title: 'Preencha todos os campos obrigatórios'
					})
				}
				if (data == "nomeIncompleto") {
					var titulo = document.getElementById("nome");
					titulo.className = "form-control backForm mx-auto mt-4";
					var titulo2 = document.getElementById("nomeInvalido");
					titulo2.className = "invalid-feedback d-block";
					document.getElementById("nome").focus();
				}
				else {
					var titulo = document.getElementById("nome");
					titulo.className = "form-control backForm mx-auto mt-4";
					var titulo2 = document.getElementById("nomeInvalido");
					titulo2.className = "d-none";
				}
				if (data == "dataInvalida") {
					var titulo = document.getElementById("dtNascimento");
					titulo.className = "form-control backForm is-invalid";
					var titulo2 = document.getElementById("dataInvalida");
					titulo2.className = "invalid-feedback d-block";
					document.getElementById("dtNascimento").focus();
				}
				else {
					var titulo = document.getElementById("dtNascimento");
					titulo.className = "form-control backForm";
					var titulo2 = document.getElementById("dataInvalida");
					titulo2.className = "d-none";
				}
				if (data == "menorIdade") {
					var titulo = document.getElementById("dtNascimento");
					titulo.className = "form-control backForm is-invalid";
					var titulo2 = document.getElementById("menorIdade");
					titulo2.className = "invalid-feedback d-block";
					document.getElementById("dtNascimento").focus();
				}
				else {
					var titulo = document.getElementById("dtNascimento");
					titulo.className = "form-control backForm";
					var titulo2 = document.getElementById("menorIdade");
					titulo2.className = "d-none";
				}
				if (data == "erroSexo") {
					var titulo = document.getElementById("sexo");
					titulo.className = "form-control is-invalid backForm custom-select";
					var exibirErro = document.getElementById("sexoErro");
					exibirErro.className = "invalid-feedback d-block";
				}
				else {
					var titulo = document.getElementById("sexo");
					titulo.className = "form-control backForm custom-select";
					var exibirErro = document.getElementById("sexoErro");
					exibirErro.className = "d-none";
				}
				if (data == "senhaCurta") {
					var titulo = document.getElementById("senha");
					titulo.className = "form-control is-invalid backForm";
					var titulo = document.getElementById("senhaCurta");
					titulo.className = "invalid-feedback d-block";
				} else {
					var titulo = document.getElementById("senha");
					titulo.className = "form-control backForm";
					var titulo = document.getElementById("senhaCurta");
					titulo.className = "d-none";
				}
				if (data == "erroSenha") {
					var titulo = document.getElementById("senha");
					titulo.className = "form-control is-invalid backForm";
					var titulo2 = document.getElementById("confSenha");
					titulo2.className = "form-control is-invalid backForm";
					var exibirErro = document.getElementById("passErro");
					exibirErro.className = "invalid-feedback d-block";
				}
				else {
					var titulo = document.getElementById("senha");
					titulo.className = "form-control backForm";
					var titulo2 = document.getElementById("confSenha");
					titulo2.className = "form-control backForm";
					var exibirErro = document.getElementById("passErro");
					exibirErro.className = "d-none";
				}
				if (data == "CadastroExistente") {
					Swal.fire({
						title: 'Cadastro existente',
						text: 'Nome de usuário, e-mail ou CPF já cadastrado !',
						icon: 'error',
						confirmButtonText: 'OK'
					});
				}
				if (data == "ErroBanco") {
					Swal.fire({
						title: 'Erro ao cadastrar',
						text: 'Ocorreu um erro ao cadastrar usuário no banco de dados.',
						icon: 'error',
						confirmButtonText: 'OK'
					});       //.then.((result => { if(result.value){windows.replace} }  //pega resultado do botão e redireciona para outra pag
				}
				if (data == "SucessoCadAdm") {
					Swal.fire({
						title: 'Cadastro Realizado !',
						text: 'Usuário cadastrado com sucesso.',
						icon: 'success',
						confirmButtonText: 'OK'
					});
					var form = document.getElementById("FormCad");
					form.reset();
				}
				if (data == "SucessoCadCliente") {
					let timerInterval
					Swal.fire({
						title: 'CADASTRO REALIZADO COM SUCESSO !',
						html: 'Redirecionando para página de login em <b></b>.',
						timer: 5000,
						timerProgressBar: true,
						onBeforeOpen: () => {
							Swal.showLoading()
							timerInterval = setInterval(() => {
								const content = Swal.getContent()
								if (content) {
									const b = content.querySelector('b')
									if (b) {
										b.textContent = Swal.getTimerLeft()
									}
								}
							}, 100)
						},
						onClose: () => {
							clearInterval(timerInterval)
							window.location.replace("index");
						}
					})
				}
			},//success 
		});//ajax
		return false;
	});//function de dentro
});//function de fora

$(function () {
	$('#FormProdutos').submit(function () {
		var obj = this;
		var form = $(obj);
		var dados = new FormData(obj);
		$.ajax({
			url: form.attr('action'),
			type: form.attr('method'),
			data: dados,
			processData: false,
			cache: false,
			contentType: false,
			success: function (data) {
				if (data == "erroDescricao") {
					var titulo = document.getElementById("descricao");
					titulo.className = "form-control is-invalid";
					var titulo2 = document.getElementById("descErro");
					titulo2.className = "invalid-feedback d-block";
				} else {
					var titulo = document.getElementById("descricao");
					titulo.className = "form-control";
					var titulo2 = document.getElementById("descErro");
					titulo2.className = "d-none";
				}
				if (data == "erroNome") {
					var titulo = document.getElementById("nomeP");
					titulo.className = "form-control is-invalid";
					var titulo2 = document.getElementById("nomeErro");
					titulo2.className = "invalid-feedback d-block";
				} else {
					var titulo = document.getElementById("nomeP");
					titulo.className = "form-control";
					var titulo2 = document.getElementById("nomeErro");
					titulo2.className = "d-none";
				}
				if (data == "erroCodBarras") {
					var titulo = document.getElementById("codBarras");
					titulo.className = "form-control is-invalid";
					var titulo2 = document.getElementById("codErro");
					titulo2.className = "invalid-feedback d-block";
				} else {
					var titulo = document.getElementById("codBarras");
					titulo.className = "form-control";
					var titulo2 = document.getElementById("codErro");
					titulo2.className = "d-none";
				}
				if (data == "codCurto") {
					var titulo = document.getElementById("codBarras");
					titulo.className = "form-control is-invalid";
					var titulo2 = document.getElementById("codCurto");
					titulo2.className = "invalid-feedback d-block";
				} else {
					var titulo = document.getElementById("codBarras");
					titulo.className = "form-control";
					var titulo2 = document.getElementById("codCurto");
					titulo2.className = "d-none";
				}
				if (data == "erroPreco") {
					var titulo = document.getElementById("preco");
					titulo.className = "form-control is-invalid";
					var titulo2 = document.getElementById("erroPreco");
					titulo2.className = "invalid-feedback d-block";
				} else {
					var titulo = document.getElementById("preco");
					titulo.className = "form-control";
					var titulo2 = document.getElementById("erroPreco");
					titulo2.className = "d-none";
				}
				if (data == "erroEstoque") {
					var titulo = document.getElementById("estoque");
					titulo.className = "form-control is-invalid";
					var titulo2 = document.getElementById("erroEstoque");
					titulo2.className = "invalid-feedback d-block";
				} else {
					var titulo = document.getElementById("estoque");
					titulo.className = "form-control";
					var titulo2 = document.getElementById("erroEstoque");
					titulo2.className = "d-none";
				}
				if (data == "SucessoCadProduto") {
					Swal.fire({
						title: 'Cadastro Realizado !',
						text: 'Produto cadastrado com sucesso.',
						icon: 'success',
						confirmButtonText: 'OK'
					});
					var form = document.getElementById("FormProdutos");
					form.reset();
				}
				if (data == "ProdutoCadastrado") {
					Swal.fire({
						title: 'Produto já cadastrado',
						text: 'O produto informado já é cadastrado no sistema. Verifique o código de barras e tente novamente.',
						icon: 'error',
						confirmButtonText: 'OK'
					});
				}
				if (data == "ErroBanco") {
					Swal.fire({
						title: 'Erro ao cadastrar',
						text: 'Ocorreu um erro ao cadastrar o produto no banco de dados.',
						icon: 'error',
						confirmButtonText: 'OK'
					});
				}
			},//success
		});//ajax
		return false;
	});//function de dentro
});//function de fora
