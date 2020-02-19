const express = require('express');
const router = express.Router();


router.get('/', (req, res, next) => {
    res.status(200).json({
    message:'handling get request for products'
    });
});

router.get('/:productId', (req, res, next) => {
    const id = req.params.productId;
    if (id === 'special'){
        res.status(200).json({
            message:'You discover a special ID',
            id:id
            });
    } else {
        res.status(200).json({
            message:'You passed an ID',
        });
    }
   
});

router.post('/', (req, res, next) => {
    res.status(200).json({
    message:'handling post request for /products'
    });
});

router.patch('/', (req, res, next) => {
    res.status(200).json({
    message:'Products updated!'
    });
});

router.delete('/', (req, res, next) => {
    res.status(200).json({
    message:'products deleted'
    });
});

module.exports =router;