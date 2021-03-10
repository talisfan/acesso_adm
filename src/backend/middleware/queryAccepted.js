module.exports = (query)=>{
    if(query.includes('"') || query.includes("'") || query.includes(";") || query.includes("#") || query.includes("%")){
        return false;
    }else{
        return true;
    }
}

