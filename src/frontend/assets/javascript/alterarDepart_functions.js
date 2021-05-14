const idDepart = document.getElementById("idDepart");
const nomeDepart = document.getElementById("nomeDepart");

// pega endereço atual da page
const url = window.location.href;            
let arr = url.split('?');    

if(arr[1]){
    let querys = arr[1].split('&');
    
    for(let i=0; i < querys.length; i++){
        let queryString = querys[i];
        let key_value = queryString.split('=')                                

        if(!key_value[1]){ key_value[1] = ''; }

        switch(key_value[0]){                
            case 'idDepart':                
                idDepart.value = key_value[1];                                        
                break;
            case 'nomeDepart':
                nomeDepart.value = key_value[1];                        
                break;
        }
    }    
}

function attDepart(){    
    const endpoint = `/departamentos?idDepart=${idDepart.value}&nomeDepart=${nomeDepart.value}`;

    fetch(endpoint, { method: 'PATCH' })
    .then(async (res)=>{                               
        if(res.status == 204){
            dialogCentralTemporary('Departamento alterado com sucesso!');
        }else{
            res = await res.json();
            genericErrors(res.errorDescription);
        }
    }).catch((error)=>{
        window.location.href = 'errorPage?errorDescription='+error;
        console.log(error);
    });
}

function dellDepart(){
    fetch(`/departamentos/${idDepart.value}`, { method: 'DELETE' })
    .then(async (res)=>{        
        if(res.status == 204){
            dialogCentralTemporary(`Departamento "${nomeDepart.value}" deletado com sucesso!`);     
            nomeDepart.value = '';
            idDepart.value = '';   
        }else{
            res = await res.json();
            genericErrors(res.errorDescription);            
        }
    }).catch(error =>{
        window.location.href = 'errorPage?errorDescription='+error
        console.log(error);
    });
}