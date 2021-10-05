const elemIdDepart = document.getElementById("idDepart");
const elemNomeDepart = document.getElementById("nomeDepart");

const querys = window.location.pathname.split('/');
const idDepart = querys[querys.length -1];

elemIdDepart.value = idDepart;

(function(){
    fetch('/departamentos/'+idDepart).then(async(res)=>{
        res = await res.json();
        if(res.length === 1){
            elemNomeDepart.value = res[0].nomeDepart;            
        }else{                
            treatmentErrorResponse({ status: 404 }, 'Funcionário');
        }
    }).catch((error)=>{
        treatmentErrorResponse(error, 'Departamento');
    })    
})()

function attDepart(){        

    fetch('/departamentos', { 
        method: 'PATCH', 
        body: JSON.stringify({ idDepart, nomeDepart: elemNomeDepart.value }) 
    })
    .then(async (res)=>{                               
        if(res.status == 204){
            dialogCentralTemporary(`Departamento ${idDepart} alterado com sucesso!`);
        }else{
            treatmentErrorResponse(res, 'Departamento');
        }
    }).catch((error)=>{
        treatmentErrorResponse(error, 'Departamento');
    });
}

function dellDepart(){
    fetch(`/departamentos/${elemIdDepart.value}`, { method: 'DELETE' })
    .then(async (res)=>{        
        if(res.status == 204){
            dialogCentralTemporary(`Departamento "${elemNomeDepart.value}" deletado com sucesso!`);     
            elemNomeDepart.value = '';
            elemIdDepart.value = '';
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