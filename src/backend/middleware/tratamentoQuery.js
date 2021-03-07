module.exports = (query)=>{
    while(query.includes('"') || query.includes("'") || query.includes(";") || query.includes("#")){
        query = query.replace('"', '').replace("'", '').replace(';', '').replace('#', '');
    }

    return query;
}

