const map = require('../service/map.js');

module.exports.showIndex = function(req, res){
  const title = "PinUp"
  res.render("index.hbs", {title});
}