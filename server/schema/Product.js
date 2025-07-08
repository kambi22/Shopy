const mongoose = require('mongoose');

const ColorSchema = new mongoose.Schema({
  name: { type: String, default: "" },
  value: { type: String, default: "#000000" },
  available: { type: Boolean, default: true }
});

const ReviewSchema = new mongoose.Schema({
  id: { type: Number },
  user: { type: String },
  rating: { type: Number },
  date: { type: String },
  title: { type: String },
  comment: { type: String },
  verified: { type: Boolean, default: true },
  helpful: { type: Number, default: 0 }
});

// const SpecificationSchema = new mongoose.Schema({
//   'Driver Size': { type: String, default: "" },
//   'Frequency Response': { type: String, default: "" },
//   'Impedance': { type: String, default: "" },
//   'Battery Life': { type: String, default: "" },
//   'Charging Time': { type: String, default: "" },
//   'Weight': { type: String, default: "" },
//   'Connectivity': { type: String, default: "" },
//   'Warranty': { type: String, default: "" }
// }, { _id: false });

const ProductSchema = new mongoose.Schema({
  marchantName: { type: String, required: true },
  marchantEmail: { type: String, required: true },
  name: { type: String, required: true },
  brand: { type: String, required: true },
  price: { type: Number, required: true },
  originalPrice: { type: Number, required: true },
  discount: { type: Number, default: 0 },
  images: [{ type: String }],
  rating: { type: Number, default: 0 },
  totalReviews: { type: Number, default: 0 },
  category: { type: String, required: true },
  subcategory: { type: String },
  inStock: { type: Boolean, default: true },
  stockCount: { type: Number, default: 0 },
  sku: { type: String },
  description: { type: String },
  features: [{ type: String }],
// specifications: { type: SpecificationSchema, default: () => ({}) },
  colors: [ColorSchema],
  sizes: [{ type: String }],
  reviews: [ReviewSchema]
}, { timestamps: true });

module.exports = mongoose.model('Product', ProductSchema);