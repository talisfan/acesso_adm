jQuery(function ($) {
	$("#telefone").mask("(99) 99999-9999");	
	$("#cpf").mask("999.999.999-99");
});


//cursorStart

document.getElementById("telefone").onclick = function () {
	var begin = 0
	var end = 0
	if (this.setSelectionRange) {
		this.focus();
		this.setSelectionRange(begin, end);
	} else if (this.createTextRange) {
		var range = this.createTextRange();
		range.collapse(true);
		range.moveEnd('character', end);
		range.moveStart('character', begin);
		range.select();
	}
}

document.getElementById("cpf").onclick = function () {
	var begin = 0
	var end = 0
	if (this.setSelectionRange) {
		this.focus();
		this.setSelectionRange(begin, end);
	} else if (this.createTextRange) {
		var range = this.createTextRange();
		range.collapse(true);
		range.moveEnd('character', end);
		range.moveStart('character', begin);
		range.select();
	}
}
