const mongoose = require('mongoose');
const moment = require('moment');


const requestSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.ObjectId, ref: 'User'},
  status: { type: String, default: 'pending' }
}, {
  timestamps: true
});

requestSchema.virtual('createdAtRelative')
  .get(function(){
    return moment(this.createdAt).fromNow();
  });

requestSchema.set('toJSON', {
  virtuals: true,
  transform(doc, json){
    delete json.createdAt;
    delete json.updatedAt;
    return json;
  }
});

const foodSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.ObjectId, ref: 'User' },
  title: { type: String, required: true },
  description: { type: String, required: true },
  location: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true }
  },
  image: { type: String, required: true },
  active: { type: Boolean, default: true },
  requests: [ requestSchema ]
},{
  timestamps: true
});

foodSchema.virtual('createdAtRelative')
  .get(function(){
    return moment(this.createdAt).fromNow();
  });

foodSchema.set('toJSON', {
  virtuals: true,
  transform(doc, json){
    delete json.createdAt;
    delete json.updatedAt;
    return json;
  }
});

module.exports = mongoose.model('Food', foodSchema);
