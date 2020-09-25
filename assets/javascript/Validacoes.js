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
				if(data == "escolha"){
					var divLogin = document.getElementById("divLogin");
					divLogin.className = "mx-auto border border-secondary rounded col-md-6 col-11 mt-5 shadow-lg py-4";
					var divEscolha = document.getElementById("divEscolha");
					divEscolha.className = "d-none";
				}
			},//success
		});//ajax
		return false;
	});//function de dentro
});//function de fora

$(function () {
	$('#cad').submit(function () {
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