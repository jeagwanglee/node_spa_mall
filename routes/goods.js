// import { Router } from 'express';
const express = require('express');
const router = express.Router();

// /routes/goods.js
const goods = [
  {
    goodsId: 4,
    name: '상품 4',
    thumbnailUrl: 'https://cdn.pixabay.com/photo/2016/09/07/02/11/frogs-1650657_1280.jpg',
    category: 'drink',
    price: 0.1,
  },
  {
    goodsId: 3,
    name: '상품 3',
    thumbnailUrl: 'https://cdn.pixabay.com/photo/2016/09/07/02/12/frogs-1650658_1280.jpg',
    category: 'drink',
    price: 2.2,
  },
  {
    goodsId: 2,
    name: '상품 2',
    thumbnailUrl: 'https://cdn.pixabay.com/photo/2014/08/26/19/19/wine-428316_1280.jpg',
    category: 'drink',
    price: 0.11,
  },
  {
    goodsId: 1,
    name: '상품 1',
    thumbnailUrl: 'https://cdn.pixabay.com/photo/2016/09/07/19/54/wines-1652455_1280.jpg',
    category: 'drink',
    price: 6.2,
  },
];

router.get('/goods', (req, res) => {
  res.status(200).json({ goods });
});

router.get('/goods/:goodsId', (req, res) => {
  const { goodsId } = req.params;

  // let result = null;
  // for (const good of goods) {
  //   if (Number(goodsId) === good.goodsId) {
  //     result = good;
  //   }
  // }

  const [result] = goods.filter((good) => {
    return Number(goodsId) === good.goodsId;
  });

  res.status(200).json({ detail: result });
});

const Cart = require('../schemas/cart.js');
router.post('/goods/:goodsId/cart', async (req, res) => {
  const { goodsId } = req.params;
  const { quantity } = req.body;

  const existsCarts = await Cart.find({ goodsId });
  if (existsCarts.length) {
    return res.status(400).json({
      success: false,
      errorMessage: '이미 장바구니에 해당하는 상품이 존재합니다.',
    });
  }

  await Cart.create({ goodsId, quantity });

  res.json({ result: 'success' });
  // res.send({ result: 'success' });
});

router.put('/goods/:goodsId/cart', async (req, res) => {
  const { goodsId } = req.params;
  const { quantity } = req.body;

  const existsCarts = await Cart.find({ goodsId });
  if (existsCarts.length) {
    await Cart.updateOne({ goodsId: goodsId }, { $set: { quantity: quantity } });
  }

  res.status(200).json({ success: true });
});

router.delete('/goods/:goodsId/cart', async (req, res) => {
  const { goodsId } = req.params;

  const existsCarts = await Cart.find({ goodsId });
  if (existsCarts.length) {
    await Cart.deleteOne({ goodsId });
  }

  res.json({ result: 'success' });
});

// router.delete('/goods/:goodsId/cart', async (req, res) => {
//   const { goodsId } = req.params;

//   const existsCarts = await Cart.find({ goodsId });
//   if (existsCarts.length) {
//     await Cart.deleteOne({ goodsId });
//   }

//   res.json({ result: 'success' });
// });

const Goods = require('../schemas/goods');
router.post('/goods', async (req, res) => {
  const { goodsId, name, thumbnailUrl, category, price } = req.body;

  const goods = await Goods.find({ goodsId }); // 게시할 때 이미 동일한 자료가 있다면 데이터가 들어옴
  if (goods.length) {
    return res.status(400).json({ success: false, errorMessage: '이미 있는 데이터입니다.' });
  }

  // 굿즈를 만드는 코드

  const createdGoods = await Goods.create({
    goodsId,
    name,
    thumbnailUrl,
    category,
    price,
  });

  res.json({ goods: createdGoods });
});

module.exports = router;

// /** get 메서드로 기본경로로 오면 res.send()를 실행시킨다. */
// router.get('/', (req, res) => {
//   res.send('default url for goods.js GET Method');
//   // send 안의 값을 반환할 것이다.
// });

// router.get('/about', (req, res) => {
//   res.send('goods.js about PATH');
// });
