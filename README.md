# rotation-domains

Simple server that accepts a `.txt` file containing URLs separated by commas.

## Run

```bash
npm install
npm start
```

## Upload endpoint

`POST /upload-txt` with `multipart/form-data` and a `file` field.

Example:

```bash
curl -X POST http://localhost:3000/upload-txt \
  -F 'file=@urls.txt;type=text/plain'
```

If `urls.txt` contains:

```txt
https://example.com, https://github.com,https://npmjs.com
```

Response:

```json
{
  "urls": [
    "https://example.com",
    "https://github.com",
    "https://npmjs.com"
  ],
  "count": 3
}
```
