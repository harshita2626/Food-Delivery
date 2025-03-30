import { Schema, model } from 'mongoose';

const restaurantSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  cuisineType: {
    type: String,
    required: true,
  },
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
  },
  location: {
    type: {
      type: String,
      default: 'Point',
    },
    coordinates: {
      type: [Number],
      index: '2dsphere',
    },
  },
  contact: {
    phone: String,
    email: String,
  },
  openingHours: {
    type: String,
  },
  deliveryTime: {
    type: String,
  },
  minimumOrder: {
    type: Number,
  },
  deliveryFee: {
    type: Number,
  },
  rating: {
    type: Number,
    default: 0,
  },
  imageUrl: {
    type: String,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
}, { timestamps: true });

export default model('Restaurant', restaurantSchema);