var Promise  = require('bluebird');
var clusters = require('../configMongo.js').connection;
var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var articleModel = mongoose.model('Article', new Schema({collectionID: Number, title: String,link: String, date: String, category: String, description: String, epochTime: Number, source: String}), 'clusterCollection');
var articleCluster = mongoose.model('Article');
//this will return every article in the database

var techArticles = function() {
  return new Promise(function (resolve, reject) {
    articleCluster.find({"category":"tech"},
      function(err, data) {
        if(err){
          console.log(err);
        }else{
          var newData = {};
          for(var i = 0; i<data.length; i++){
            if(newData[data[i].collectionID]) {
              newData[data[i].collectionID].push(data[i]);
            } else {
              newData[data[i].collectionID] = [data[i]];
            }
          }
          resolve(newData);
        }
      });
  });
}

module.exports = {
  techArticles: techArticles
};
