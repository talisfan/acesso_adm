function dialogCentralTemporary (title){
    Swal.fire({
        position: 'botton',
        icon: 'success',
        title: title,
        showConfirmButton: false,
        timer: 2500
    });
}

function popupCadastro (entity, nameObj){
    Swal.fire({
        position: 'botton',
        icon: 'success',
        title: `Sucesso ao cadastrar ${entity} "${nameObj}"!`,
        showConfirmButton: true,
        showCancelButton: true,
        confirmButtonText: 'Continuar cadastro',
        cancelButtonText: '<a href="/">HOME</a>'					
    });
}

function genericErrors (message){
    Swal.fire({
        icon: 'error',
        title: 'Erro',
        text: message,        
    });
}