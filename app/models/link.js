var db = require('../config');
var crypto = require('crypto');
var mongoose = require('mongoose');

var LinkSchema = mongoose.Schema({
  url: String,
  base_url: String,
  title: String,
  visits: Number,
  code: String
});

var Link = mongoose.model("Link", LinkSchema);

LinkSchema.pre("save", function(){
    var shasum = crypto.createHash('sha1');
    shasum.update(this.url);
    this.code = shasum.digest('hex').slice(0, 5));
  }
});

module.exports = Link;
