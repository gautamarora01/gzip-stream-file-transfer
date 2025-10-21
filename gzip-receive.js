import { createServer } from 'http';
import { createWriteStream } from 'fs';
import { createGunzip } from 'zlib';
import { basename, join } from 'path';

//Flow of data 
// -> Client Application -> compressed data 
// -> Server -> decompressed data -> write to filesystem

//We are currently on the receiving side
//here req is a stream object, which allows 
//server to receive request data in chunks from the network

const server = createServer((req,res)=>{

    const filename = basename(req.headers['x-filename']);
    const destFilename = join('received_files', filename);
    console.log(`File request received: ${filename}`);
    
    req
    .pipe(createGunzip())
    .pipe(createWriteStream(destFilename))
    .on('finish', () => {
        res.writeHead(201,{
            'content-type': 'text/plain'
        })
        res.end('OK\n')
        console.log(`File Saved: ${destFilename}`);
    });
});


server.listen(3000, ()=>{
    console.log('Listening on Port', 3000);
})