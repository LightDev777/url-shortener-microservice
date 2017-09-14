var express = require('express');
var app = express();
var url = require('url');
var http = require('http');
var validUrl = require('valid-url');

http.createServer(function(req, res) {
  var data = url.parse(req.url, true);

  var urlData = data.pathname;
  var strData = urlData.substring(1);
  if(validUrl.isUri(strData)) {
    console.log('valid uri');
  } else {
    console.log('not uri');
  }
  console.log(typeof strData);
  res.write(JSON.stringify(strData));
  return res.end();

}).listen(process.env.PORT || 5000);


// listen to port thrown by heroku or default to 5000
