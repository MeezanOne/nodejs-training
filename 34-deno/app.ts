// let message: string;
// message = 'Hi There!';
// console.log(message);


// const text = `This is a text - and it should be stored in a file`;

// const encoder = new TextEncoder();
// const data = encoder.encode(text);

// Deno.writeFile('message.txt', data).then(()=>{
//     console.log('Wrote to file!');
// })


// import {serve} from 'https://deno.land/std/http/server.ts';

// const server = serve({port:3000});

// for await (const req of server){
//     req.respond({body:"Hello World\n"})
// }

// import { serve } from "https://deno.land/std@0.224.0/http/server.ts";

// serve((req) => {
//   return new Response("Hello World\n", {
//     headers: { "content-type": "text/plain" },
//   });
// }, { port: 3000 });

import {Application} from "https://deno.land/x/oak/mod.ts";

const app = new Application();

app.use((ctx)=>{
    ctx.response.body = "Hello World!"
});

await app.listen({port : 8000});