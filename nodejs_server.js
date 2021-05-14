var http = require('http');
var server = http.createServer(function(Q, S) {
  //Q:request S:response
  //收xml，回應收到的xml

  if (Q.method == 'POST') {
    var jsonString = '';

    Q.on('data', function(data) {
      //對編碼後的結果做解碼。
      jsonString += decodeURI(data);

      console.log(jsonString);

      Q.on('end', function() {
        S.writeHead(200, {
          'Content-Type': 'application/xml',
          'Access-Control-Allow-Origin': '*'
        });

        //jsonString = encodeURI(jsonString);
        //jsonString = JSON.stringify(jsonString);
        S.write('<SERVER>\n' + jsonString + '</SERVER>', 'UTF-8');

        S.end();
      });
    });
  }
});

server.listen(8081, '0.0.0.0');
console.log('Node.js web server at port 8081 is running..');
