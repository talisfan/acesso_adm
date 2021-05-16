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
