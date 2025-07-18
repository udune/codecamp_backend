import express from 'express' // export default 가져오기
import { checkPhone, getToken, sendTokenToSMS } from './phone.js' // export 가져오기
import { checkEmail, getWelcomeTemplate, sendTemplateToEmail } from './email.js'
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import { options } from './swagger/config.js'
import cors from 'cors';
import mongoose from 'mongoose';
import { Board } from './models/board.model.js';

const app = express()
app.use(express.json()) // 옛날에는 bodyParser 사용
app.use(cors())
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJsdoc(options)));

app.get('/boards', async (req, res) => {
  // 1. DB에 접속 후, 데이터를 조회 => 데이터를 조회했다고 가정
  // const result = [
  //   { number: 1, writer: "철수", title: "제목입니다~~", contents: "내용이에요!" },
  //   { number: 2, writer: "영희", title: "영희입니다~~", contents: "영희이에요!" },
  //   { number: 3, writer: "훈이", title: "훈이입니다~~", contents: "훈이이에요!" }
  // ]
  const result = await Board.find()

  // 2. DB에서 꺼내온 결과를 브라우저에 응답(response)으로 주기
  res.send(result)
})

app.post('/boards', async (req, res) => {
  // 1. 브라우저에서 보내준 데이터 확인하기
  console.log(req)
  console.log('========================')
  console.log(req.body)

  // 2. DB에 접속 후, 데이터를 저장 => 데이터 저장했다고 가정
  const board = new Board({
    writer: req.body.writer,
    title: req.body.title,
    contents: req.body.contents
  })
  await board.save();
  
  // 3. DB에 저장된 결과를 브라우저에 응답(response) 주기
  res.send('게시물 등록에 성공하였습니다.')
})

app.post("/tokens/phone", function (req, res) {
  console.log(req.body.qqq)
  const myphone = req.body.qqq

  // 1. 휴대폰 번호 자릿수 맞는지 확인하기(10~11자리)
  const isValid = checkPhone(myphone)
  if (isValid === false) {
      return
  }
  
  // 2. 핸드폰 토큰 6자리 만들기
  const myToken = getToken()

  // 3. 핸드폰 번호에 토큰 전송하기
  sendTokenToSMS(myphone, myToken)

  res.send('인증완료!')
})

app.post('/users', function (req, res) {
  const {name, age, school, email} = req.body

  // 1. 이메일이 정상인지 확인(1-존재여부, 2-"@"포함여부)
  const isValid = checkEmail(email);
  if (isValid === false) {
      return
  }
  
  // 2. 가입환영 템플릿 만들기
  const myTemplate = getWelcomeTemplate({name, age, school})
  
  // 3. 이메일에 가입환영 템플릿 전송하기
  sendTemplateToEmail(email, myTemplate)

  res.send('가입완료!')
})

mongoose.connect('mongodb://my-database:27017/mydocker')
  .then(() => console.log('db 접속에 성공하였습니다.'))
  .catch(() => console.log('db 접속에 실패하였습니다.'))

app.listen(4000)