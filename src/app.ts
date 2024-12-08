import express, { NextFunction, Request, Response } from 'express'
import mongoose from 'mongoose';
import userRouter from './routes/users';
import cardRouter from './routes/cards';

const DB_URL = 'mongodb://localhost:27017/mestodb'
const PORT = 3000;
const server = express();


// Временное решение авторизации
server.use((req: Request, res: Response, next: NextFunction)=>{
  req.user = {
    _id: '674365e821ad7ba0f382ff1d'
  };
  next();
});
server.use(express.json())
server.use('/', userRouter)
server.use('/', cardRouter)
server.use('*', (req: Request, res: Response) => {
  res.status(404).send({message: 'Тут ничего нет. Вернись назад, я всё прощу.'})
})

async function startApp() {
  try {
    await mongoose.connect(DB_URL)
    server.listen(PORT, () => console.log('Сервер работает! port: ' + PORT))
  } catch (error) {
    console.log(error)
  }
}

startApp()