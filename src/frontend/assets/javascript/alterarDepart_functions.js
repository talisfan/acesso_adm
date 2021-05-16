const idDepart = document.getElementById("idDepart");
const nomeDepart = document.getElementById("nomeDepart");

const querys = getQueryStrings();
console.log(querys)

querys.forEach(query => {
    // query = [queryString, value]     
    switch(query[0]){                
        case 'idDepart':                
            idDepart.value = query[1];                                        
            break;
        case 'nomeDepart':
            nomeDepart.value = query[1];                        
            break;
    } 
});

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
            await sleep(2500);
            window.location.href = 'departamentos'
        }else{
            res = await res.json();
            genericErrors(res.errorDescription);            
        }
    }).catch(error =>{
        window.location.href = 'errorPage?errorDescription='+error
        console.log(error);
    });
}