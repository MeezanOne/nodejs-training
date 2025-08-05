// 1-
// const http = require('http')
// const server = http.createServer((req,res)=>{
//     console.log(req)
// })
// server.listen(3000)

// 2-
// const http = require('http')
// const server = http.createServer((req,res)=>{
//     console.log(req)
//     process.exit()
// })
// server.listen(3000)

// 
// const http = require('http')
// const fs = require('fs');

// const server = http.createServer((req,res)=>{
//     console.log(req.url, req.method, req.headers);
//     const url = req.url;
//     const method = req.method;
//     if(url === '/'){
//         res.write('<html>');
//         res.write('<head><title>Enter a Message</title></head>');
//         res.write('<body><form action="/message" method="POST"><input type="text" name="message" /><button type="submit">Submit</button></form></body>');
//         res.write('</html>');
//         return res.end();
//     }
//     if(url === '/message' && method === "POST"){
//         const body = [];
//         req.on('data', chunk =>{
//             console.log(chunk);
//             body.push(chunk);
//         })
//         return req.on('end',()=>{
//             const parsedBody = Buffer.concat(body).toString();
//             const message = parsedBody.split("=")[1];
//             fs.writeFile('message.txt', message, err =>{
//                 res.statusCode = 302;
//                 res.setHeader('Location', '/');
//                 return res.end();
//             })
//         })
//     }
//     res.setHeader('Content-Type', 'text/html');
//     res.write('<html>');
//     res.write('<head><title>Node js App</title></head>');
//     res.write('<body><div>Hello World</div></body>');
//     res.write('</html>');
//     res.end();
// })

// server.listen(3000)


const http = require('http')
const routes = require('./routes')
const server = http.createServer(routes.handler);
console.log(routes.quote)

server.listen(3000)