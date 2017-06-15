const mongoose = require('mongoose');
const s3 = require('../lib/s3');



const daySchema = new mongoose.Schema({
  image: { type: String },
  summary: { type: String, required: true },
  feeling: { type: String, required: true },
  createdBy: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
  stepsTaken: { type: Number },
  hoursSlept: { type: Number },
  heartRate: {type: Number },
  formattedHoursSlept: { type: String },
  goodDeed: { type: String},
  favcolor: { type: String },
  slowMoving: {type: Number },
  fidgety: {type: Number },
  concentrating: {type: Number },
  failure: {type: Number },
  poorAppetite: {type: Number },
  overeating: {type: Number },
  tired: {type: Number },
  troubleSleeping: {type: Number },
  feelingDown: {type: Number },
  noInterest: {type: Number },
  selfHarm: {type: Number },
  depressionScore: {type: Number }
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
