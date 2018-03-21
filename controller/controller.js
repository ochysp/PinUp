const map = require('../service/map.js');

  module.exports.showIndex = function(req, res){
  map.showMap();
  const title = "PinUp"
  res.render("index.hbs", {title});
}