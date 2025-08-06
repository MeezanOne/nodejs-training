// 1
// const http = require('http')
// const express = require('express');
// const app = express();
// const server = http.createServer(app);
// server.listen(3000)

// 2
// const http = require('http')
// const express = require('express');

// const app = express();

// app.use((req,res,next)=>{
//     console.log('In the middleware!');
//     next(); // Allows the request to continue to the next middleware in line
// });

// app.use((req,res,next)=>{
//     console.log('In another middleware!');
//     res.send('<h1>Hello from Express</h1>');
// });

// const server = http.createServer(app);

// server.listen(3000)


// 3
// const express = require('express');

// const app = express();

// app.use((req,res,next)=>{
//     console.log('In the middleware!');
//     next(); // Allows the request to continue to the next middleware in line
// });

// app.use((req,res,next)=>{
//     console.log('In another middleware!');
//     res.send('<h1>Hello from Express</h1>');
// });

// app.listen(3000);

// 4
const express = require('express');
const path = require('path')
const bodyParser = require('body-parser');

const app = express();

const adminRoutes = require('./routes/admin')
const shopRoutes = require('./routes/shop')
 
app.use(bodyParser.urlencoded({extended:false})); 
// to use css and local images
app.use(express.static(path.join(__dirname, 'public')));

// app.use(adminRoutes);   
app.use( '/admin', adminRoutes);   
app.use(shopRoutes);   

app.use((req,res,next)=>{
    res.status(404).sendFile(path.join(__dirname, 'views', 'not-found.html'));
})

app.listen(3000);