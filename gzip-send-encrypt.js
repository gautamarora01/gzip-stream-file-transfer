import { createCipheriv, randomBytes } from 'crypto';
import { request } from 'http';
import { createGzip } from 'zlib';
import { createReadStream } from 'fs';
import { basename } from 'path';

//here we are on the sending side
//we are using streams to read the data from the file, and 
//then compressing and sending each chunk as 
//soon as it is read from the filesystem.

const filename = process.argv[2];
const serverHost = process.argv[3];
const secret = Buffer.from(process.argv[4],'hex');
const iv = randomBytes(16);

const httpRequestOptions = {
    hostname: serverHost,
    port: 3000,
    path:'/',
    method: 'PUT',
    headers: {
        'content-type': 'application/octet-stream',
        'content-encoding': 'gzip',
        'x-filename': basename(filename),
        'x-initialization-vector': iv.toString('hex')
    }
}

const req = request(httpRequestOptions, (res)=>{
    console.log(`Server Response: ${res.statusCode}`)
})

createReadStream(filename)
.pipe(createGzip())
.pipe(createCipheriv('aes192', secret, iv))
.pipe(req)
.on('finish',()=>{
    console.log('File sent successfully');
})