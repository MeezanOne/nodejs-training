// 1
// const express = require('express');

// const router = express.Router();

// router.get('/add-product',(req,res,next)=>{
//     res.send('<form action="/product"  method="POST" ><input type="text" name="title"/><button type="submit">Add Product</button></form>');
// });

// router.post('/product', (req, res, next)=>{
//     console.log(req.body);
//     res.redirect('/');
// });

// module.exports = router;

// 2
// const express = require('express');

// const router = express.Router();

// // router.get('/admin/add-product',(req,res,next)=>{
// //     res.send('<form action="/admin/add-product"  method="POST" ><input type="text" name="title"/><button type="submit">Add Product</button></form>');
// // });
// // /admin/add-product => GET
// router.get('/add-product',(req,res,next)=>{
//     res.send('<form action="/admin/add-product"  method="POST" ><input type="text" name="title"/><button type="submit">Add Product</button></form>');
// });

// // router.post('/admin/add-product', (req, res, next)=>{
// //     console.log(req.body);
// //     res.redirect('/');
// // });
// // /admin/add-product => POST
// router.post('/add-product', (req, res, next)=>{
//     console.log(req.body);
//     res.redirect('/');
// });

// module.exports = router;

// 3- Adding the path
const express = require('express');
const path = require('path')
const rootDir = require('../utils/path')
const router = express.Router();

// /admin/add-product => GET
router.get('/add-product',(req,res,next)=>{
    res.sendFile(path.join(rootDir, 'views' ,'add-product.html'));
});

// /admin/add-product => POST
router.post('/add-product', (req, res, next)=>{
    console.log(req.body);
    res.redirect('/');
});

module.exports = router;