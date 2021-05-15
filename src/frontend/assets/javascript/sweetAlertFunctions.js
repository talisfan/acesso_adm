function dialogCentralTemporary (title){
    Swal.fire({
        position: 'botton',
        icon: 'success',
        title: title,
        showConfirmButton: false,
        timer: 2500
    });
}

function popupCadastro (entity){
    Swal.fire({
        position: 'botton',
        icon: 'success',
        title: `Sucesso ao cadastrar ${entity}!`,
        showConfirmButton: true,
        showCancelButton: true,
        confirmButtonText: 'Continuar cadastro',
        cancelButtonText: '<a href="/">HOME</a>'					
    });
}

function genericErrors (message){
    message = JSON.parse(message)    

    // Tratamento para evitar que comandos SQL sejam repassados ao front
    if(message.errorMessage){                
        for(let prop in message.errorMessage){
            if(prop.includes('sql')){
                delete message.errorMessage[prop];
            }
        }
    }

    Swal.fire({
        icon: 'error',
        title: 'Erro',
        text: JSON.stringify(message),        
    });
}