import mongoose from 'mongoose';

//Represents an entity
const bootcampSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name'],
    unique: true,
  },
  rating: {
    type: Number,
    required: [true, 'Please provide a rating for a Bootcamp'],
  },
  description: {
    type: String,
    required: [true, 'Please provide a description'],
  },
  price: {
    type: Number,
    required: [true, 'Please provide a price'],
  },
  // model a relationship between 2 bootcamps
});

export const Bootcamp = mongoose.model('Bootcamp', bootcampSchema);
