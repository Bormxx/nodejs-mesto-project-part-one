import Router from 'express'
import UsersController from '../controllers/users'

const userRouter = Router();

userRouter.post('/users', UsersController.create); //Создаёт нового пользователя
userRouter.get('/users', UsersController.getAll); //Возвращает всех пользователей
userRouter.get('/users/:userId', UsersController.getOne); //Возвращает пользователя по ID
userRouter.patch('/users/me', UsersController.updateProfile); //Обновляет профиль пользователя
userRouter.patch('/users/me/avatar', UsersController.getOne); //Обновляет аватар пользователя

export default userRouter