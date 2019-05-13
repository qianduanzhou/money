var mongoose = require('mongoose')
var Schema = mongoose.Schema

var advertSchema = new Schema({
    "advertId":String,
    "advertName":String,
    "advertImgList":
    {
        'L':String,
        'M':String,
        "S":String
    }
    
})

module.exports = mongoose.model('Advert',advertSchema)