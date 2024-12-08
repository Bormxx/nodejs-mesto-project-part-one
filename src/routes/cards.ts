import Router from 'express'
import CardsController from '../controllers/cards'

const cardRouter = Router();

cardRouter.post('/cards', CardsController.create); //Создаёт нового пользователя
cardRouter.get('/cards', CardsController.getAll); //Возвращает всех пользователей
cardRouter.delete('/cards/:cardId', CardsController.delete); //Возвращает пользователя по ID
cardRouter.put('/cards/:cardId/likes', CardsController.addLike); //Возвращает всех пользователей
cardRouter.delete('/cards/:cardId/likes', CardsController.removeLike); //Возвращает пользователя по ID

export default cardRouter