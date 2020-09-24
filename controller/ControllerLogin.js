const express = require('express');
const router = express.Router();

router.post('/', (req, res, next) => {    
    const userLogin = req.body.userLogin;
    const passLogin = req.body.passLogin;
    res.status(200).send(
        "USER:" + userLogin
    );
});

module.exports = router;