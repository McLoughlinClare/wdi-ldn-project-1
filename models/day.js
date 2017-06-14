const mongoose = require('mongoose');
const s3 = require('../lib/s3');



const daySchema = new mongoose.Schema({
  image: { type: String },
  summary: { type: String, required: true },
  feeling: { type: String, required: true },
  createdBy: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
  stepsTaken: { type: Number },
  hoursSlept: { type: Number },
  formattedHoursSlept: { type: String },
  favcolor: { type: String },
  slowMoving: {type: String },
  fidgety: {type: String },
  concentrating: {type: String },
  failure: {type: String },
  poorAppetite: {type: String },
  overeating: {type: String },
  tired: {type: String },
  troubleSleeping: {type: String },
  feelingDown: {type: String },
  noInterest: {type: String }
}, {
  timestamps: true
});

daySchema
  .virtual('imageSRC')
  .get(function getImageSRC() {
    if(!this.image) return null;
    return `https://s3-eu-west-1.amazonaws.com/${process.env.AWS_BUCKET_NAME}/${this.image}`;
  });

daySchema.pre('remove', function removeImage(next) {
  if(!this.image) return next();
  s3.deleteObject({ Key: this.image }, next);
});




module.exports = mongoose.model('Day', daySchema);
