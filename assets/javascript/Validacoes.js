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
	$('#cadFunc').submit(function () {
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
				var divCad = document.getElementById("divCad");
				divCad.className = "p-2 mx-auto border border-secondary rounded col-md-6 col-11 my-5 shadow-lg py-4 animated fadeInDown";
				var divEscolha = document.getElementById("divEscolha");
				divEscolha.className = "d-none";
			},
		});
		return false;
	});
});

$(function () {
	$('#consultFunc').submit(function () {
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
				var divConsult = document.getElementById("divConsult");
				divConsult.className = "p-2 mx-auto border border-secondary rounded col-md-6 col-11 my-5 shadow-lg py-4 animated fadeInDown";
				var divEscolha = document.getElementById("divEscolha");
				divEscolha.className = "d-none";
			},
		});
		return false;
	});
});

$(function () {
	$('#CadFunc').submit(function () {
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
				if (data == "SucessoCad") {
					Swal.fire({
						title: 'Cadastro Realizado !',
						text: 'Usuário cadastrado com sucesso.',
						icon: 'success',
						confirmButtonText: 'OK'
					});
					var form = document.getElementById("FormCad");
					form.reset();
				}			
			},//success 
		});//ajax
		return false;
	});//function de dentro
});//function de fora