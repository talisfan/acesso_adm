function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function treatmentErrorResponse(res, entity){    
    try{ res = await res.json(); }catch(error){}
    
    if(
        res.error && res.errorDescription.errorMessage.code &&
        res.errorDescription.errorMessage.code == 'ER_DUP_ENTRY'
    ){								
        genericErrors(`${entity} já existente`);										
    }else 
    if(
        res.error && res.errorDescription.errorMessage &&
        res.errorDescription.errorMessage.includes('Missing required')
    ){
        genericErrors('Preencha todos os campos obrigatórios!');	
    }else 
    if(
        res.error && res.errorDescription.errorMessage &&
        (res.errorDescription.errorMessage.includes('senhas') || res.errorDescription.errorMessage.includes('senha'))
    ){
        genericErrors(res.errorDescription.errorMessage);	
    }else if(res.status && res.status === 404){
        genericErrors(`${entity} não encontrado`);	
    }else{
        res = JSON.stringify(res);
        res = window.btoa(res);
        window.location.href = window.location.origin + '/page/errorPage?errorDescription=' + res;
    }
}
