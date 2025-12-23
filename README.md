# File Transfer via Streams
HTTP File Transfer with Gzip Compression and Decompression, using Node.js Streams.
The encrypt/decrypt version also supports encryption/decryption before sending data.

(Before running, make sure you create the directory 
named received_files in your current working directory)

To run the normal version:

```bash
node gzip-receive.js
```

```bash
node gzip-send.js 'FILE_PATH' localhost
```

To run the encryption/decryption version:

```bash
node gzip-receive-decrypt.js //This will console.log a 'SECRET_KEY'
```

```bash
node gzip-send-encrypt.js 'FILE_PATH' localhost 'SECRET_KEY'
```
I also compared the efficiencies of these three algorithms -> gzip, deflate, brotli
(Code attached in compression_efficiency_comparison.js)
Results for a 2242KB file:
┌─────────┬───────────┬───────────┬────────────────┬──────────┬──────────────────┐
│ (index) │ algorithm │ inputSize │ compressedSize │ duration │ compressionRatio │
├─────────┼───────────┼───────────┼────────────────┼──────────┼──────────────────┤
│ 0       │ 'brotli'  │ 2294786   │ 1434666        │ 4641     │ '0.63'           │
│ 1       │ 'deflate' │ 2294786   │ 1514279        │ 68       │ '0.66'           │
│ 2       │ 'gzip'    │ 2294786   │ 1514291        │ 69       │ '0.66'           │
└─────────┴───────────┴───────────┴────────────────┴──────────┴──────────────────┘

Brotli -> highest efficiency and highest duration
Deflate -> low efficiency and lowest duration
Gzip -> lowest efficiency and low duration
