const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  goodsId: {
    type: Number,
    required: true, // 값이 무조건 존재
    unique: true, // 고유한 값
  },
  quantity: {
    type: Number,
    required: true, //개수는 무조건 존재
  },
});

module.exports = mongoose.model('Cart', cartSchema);
// collection 명을 Goods로
