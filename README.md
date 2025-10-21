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
