exports.printRequest = (req)=>{
    console.log({
        method: req.method || undefined,
        endpoint: req.url || undefined,
        params: req.params || undefined,
        queryString: req.query || undefined,
        body: req.body || undefined
    });
} 