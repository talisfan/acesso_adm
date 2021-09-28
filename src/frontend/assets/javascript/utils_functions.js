function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function treatmentErrorResponse(res, entity){
    res = await res.json();									

    if(
        res.error && res.errorDescription.errorMessage.code &&
        res.errorDescription.errorMessage.code == 'ER_DUP_ENTRY'
    ){								
        genericErrors(`${entity} já existente`);										
    }else if(
        res.error && res.errorDescription.errorMessage &&
        res.errorDescription.errorMessage.includes('Missing required')
    ){
        genericErrors('Preencha todos os campos obrigatórios!');	
    }else if(
        res.error && res.errorDescription.errorMessage &&
        (res.errorDescription.errorMessage.includes('senhas') || res.errorDescription.errorMessage.includes('senha'))
    ){
        genericErrors(res.errorDescription.errorMessage);	
    }else{
        res = JSON.stringify(res);
        res = btoa(res);
        window.location.href = 'errorPage?errorDescription='+res				
    }
}
