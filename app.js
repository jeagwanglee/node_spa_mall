const express = require('express');
const app = express();
const port = 3000;

const goodsRouter = require('./routes/goods.js');
const cartsRouter = require('./routes/carts.js');
const connect = require('./schemas'); // 익명함수라서 실행을 해야 한다?
connect();

app.use(express.json()); //  body parser 미들웨어를 쓰기 위해

app.use('/api', [goodsRouter, cartsRouter]);

app.post('/', (req, res) => {
  console.log(req.body);

  res.send('기본 URI에 POST 메소드가 정상 실행');
});

app.get('/', (req, res) => {
  console.log(req.query); // 요청(req)의 query를 출력

  const obj = {
    keyKey: 'value 입니다.',
    이름입니다: '이름일까요',
  };
  res.status(400).json(obj);
});

app.get('/:id', (req, res) => {
  console.log(req.params);

  res.send(':id URI에 정상 반환');
});

// app.get('/', (req, res) => {
//   res.send('Hello World!');
// });

// app.use('/api', goodsRouter);

app.listen(port, () => {
  console.log(port, '포트로 서버가 열렸어요!');
});
