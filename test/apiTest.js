const request = require('request');

const APIKEY = "uIsUR6bTsSITfIn81rV0L8fKmNtTdk0p1u3oYyBD";

if (process.argv.length < 3) {
  console.log("引数にURLを指定してください");
    process.exit();
  };

const url = process.argv[2]

const headers = {
  'Content-Type':'application/json',
  'X-API-KEY': APIKEY 
};

const options = {
  url: url,
  method: 'GET',
  headers: headers,
  json: true,
};

request(options, function (error, response, body) {
  if (error) throw new Error(error)
  console.log(body)
});
