var express = require('express');
var app = express();
var url = require('url');
var http = require('http');
var validUrl = require('valid-url');
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var fs = require('fs');


var dbUrl = process.env.PROD_MONGODB;
var baseHost = "https://short-url-serv.herokuapp.com";

//var for url code combination
var combinationArray = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z",
                        "0","1","2","3","4","5","6","7","8","9"];

//create server
http.createServer(function(req, res) {
  var data = url.parse(req.url, true),
      indexCount,
      urlCode,
      dataJson = {
        original_url: '',
        short_url: ''
      },
      output,
      redirectUrl;

// check length of path
  if(data.pathname.length > 1) {
  MongoClient.connect(dbUrl, function(err, db) {
   assert.equal(null, err);
   db.collection("urls").find().toArray(function(err, result) {
     if(err) throw err;
     indexCount = result.length;
     urlCode = combinationArray[Math.floor((Math.random()*35) +1)] +
                   combinationArray[Math.floor((Math.random()*35) +1)] +
                   combinationArray[Math.floor((Math.random()*35) +1)] +
                   combinationArray[Math.floor((Math.random()*35) +1)] +
                   indexCount;

    dataJson.short_url = baseHost + "/" + urlCode;


     var pathData = data.pathname;
     var routeData = pathData.substring(1, 5);

     if(routeData === 'new/') {
       var urlData = pathData.substring(5);

       if(validUrl.isUri(urlData)) {

         dataJson.original_url = urlData;
         output = JSON.stringify(dataJson);

         insertToDb();

         db.close();
         res.write(output);
         res.end();

       } else {
         console.log('not uri');
         output = JSON.stringify(urlData);
         console.log(typeof output);
         db.close();
         res.write("Error! Not valid URI!");
         res.end();
       }

     } else {
       findUrlCode(pathData);
     }

   });

  // insert document to database collection
  function insertToDb() {
   db.collection("urls").insertOne(dataJson, function(err, res) {
      if (err) throw err;
      db.close();
    });
  };

  // find all documents in database colletion
  function findAll() {
    db.collection("urls").find({}).toArray(function(err, result) {
    if (err) throw err;
    db.close();
  });
  }

// find specific short url code in database collection
  function findUrlCode(p) {
    db.collection("urls").find({"short_url": baseHost + p}).toArray(function(err, result) {
      if(err) throw err;
      redirectUrl = result;
      db.close();
      if(redirectUrl.length > 0) {
        var body = "redirecting";
        res.writeHead(302, {
          'Content-Type' : 'text/plain',
          'Location': redirectUrl[0]["original_url"],
          'Content-Length': body.length
        });
        res.end(body);
      } else {
        res.end();
      }

    });


  }
  });

} else {
// if path is on home and no other  string then load the details.html
  fs.readFile("./details.html", function(err, data) {
    if (err) {
      res.writeHead(404, {'Content-Type': 'text/html'});
      return res.end("404 Not Found");
    }
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    return res.end();
  });
}

}).listen(process.env.PORT || 5000);
