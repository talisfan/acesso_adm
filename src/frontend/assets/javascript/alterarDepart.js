const idDepart = document.getElementsByName("idDepart");
const nomeDepart = document.getElementById("nomeDepart");
const title = document.getElementById("title");

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
                for(let i=0; i<idDepart.length; i++){
                    const element = idDepart[i];                
                    element.value = key_value[1] ;                    
                }
                break;
            case 'nomeDepart':
                nomeDepart.value = key_value[1];                        
                break;
        }
    }    
}

function attDepart(){    
    const endpoint = `/departamentos?idDepart=${idDepart[0].value}&nomeDepart=${nomeDepart.value}`;

    fetch(endpoint, {
        method: 'PATCH'        
    }).then(async (data)=>{        
        data = await data.json();        
        title.innerText = data.msg;        
        title.style['color'] = "red"
    }).catch((error)=>{
        console.log(error);
    });
}