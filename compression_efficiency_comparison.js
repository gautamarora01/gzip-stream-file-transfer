import fs from 'fs';
import zlib from 'zlib';
import { pipeline, Writable } from "stream";
import { promisify } from 'util';

const pipe = promisify(pipeline);
const filePath = process.argv[2];

class CompressionResults {
    constructor(algorithm, inputSize, compressedSize, duration) {
        this.algorithm = algorithm;
        this.inputSize = inputSize;
        this.compressedSize = compressedSize;
        this.duration = duration;
        this.compressionRatio = (compressedSize/inputSize).toFixed(2);
    }
}

class Accumulator extends Writable {
    constructor(){
        super();
        this.totalSize = 0;
    }

    _write(chunk, encoding, cb){
        this.totalSize += chunk.length;
        cb();
    }
}

async function compressFile(inputStream, compressor, algorithm) {
    
    const accumulator = new Accumulator();

    const startTime = Date.now();
    await pipe(
        inputStream, 
        compressor, 
        accumulator
    );
    const endTime = Date.now();

    return new CompressionResults(
        algorithm,
        fs.statSync(filePath).size,
        accumulator.totalSize,
        endTime - startTime
    );
}

async function main() {
    if(!filePath){
        console.error("Input format: node main.js <path:String>.");
        process.exit(1);
    }

    try {          
        
        const results = await Promise.all([
            compressFile(fs.createReadStream(filePath), zlib.createBrotliCompress(), "brotli"),
            compressFile(fs.createReadStream(filePath), zlib.createDeflate(), "deflate"),
            compressFile(fs.createReadStream(filePath), zlib.createGzip(), "gzip"),
        ]);
        
        console.table(results);
    } catch (error) {
        console.error("Error: Compression failed.", error);
        process.exit(1);
    }
}

main();