const mongoose = require('mongoose');

const goodsSchema = new mongoose.Schema({
  goodsId: {
    type: Number,
    required: true, // 값이 무조건 존재
    unique: true, // 고유한 값
  },
  name: {
    type: String,
    required: true,
    unique: true,
  },
  thumbnailUrl: {
    type: String,
  },
  category: {
    type: String,
  },
  price: {
    type: Number,
  },
});

module.exports = mongoose.model('Goods', goodsSchema);
// collection 명을 Goods로
