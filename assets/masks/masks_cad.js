jQuery(function ($) {
	$("#telCell").mask("(99) 99999-9999");
	$("#telFixo").mask("(99) 9999-9999");
	$("#cpf").mask("999.999.999-99");
	$("#rg").mask("99.999.999-*");
	$("#dtNascimento").mask("99/99/9999");
});


//cursorStart

document.getElementById("telCell").onclick = function () {
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

document.getElementById("telFixo").onclick = function () {
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

document.getElementById("rg").onclick = function () {
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

document.getElementById("dtNascimento").onclick = function () {
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
