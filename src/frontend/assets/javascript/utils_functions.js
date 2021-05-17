function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function getQueryStrings(){
    // pega endereço atual da page
    const url = window.location.href;            
    let arr = url.split('?');    

    if(arr[1]){
        let querys = arr[1].split('&');
        
        return querys.map( queryString =>{
            let key_value = queryString.split('=');                                

            if(!key_value[1]){ key_value[1] = ''; }
            
            return key_value;
        });    
    }

    return null;
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
        res.errorDescription.errorMessage.includes('senhas')
    ){
        genericErrors(res.errorDescription.errorMessage);	
    }else{
        res = JSON.stringify(res);
        res = btoa(res);
        window.location.href = 'errorPage?errorDescription='+res				
    }
}
