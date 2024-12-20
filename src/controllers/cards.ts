import { Request, Response } from 'express';
import Card from '../models/cards'

class CardsController {
  async create(req: Request, res: Response) {
    try {
      const {name, link, owner=req.user._id, likes, createdAt} = req.body;
      const card = await Card.create({name, link, owner, likes, createdAt})
      return res.status(201).json(card)
    } catch (error: any) {
      if (error.name === 'ValidationError'){
        return res.status(400).json({
          message: 'Переданы некорректные данные при создании карточки.'
        })}
      return res.status(500).json(error)
    }
  }
  // Спасибо, сенсей
  async getAll(req: Request, res: Response) {
    try {
      const cards = await Card.find()
      return res.status(200).json(cards)
    } catch (error: any) {
      return res.status(500).json(error)
    }
  }
  async delete(req: Request, res: Response) {
    try {
      const card = await Card.findByIdAndDelete(req.params.cardId)
      if (!card){
        return res.status(404).json({
          message: 'Карточка с указанным _id не найдена.'
        })
      }
      return res.status(200).json(card)
    } catch (error: any) {
      if (error.name === 'SyntaxError'){
        return res.status(400).json({
          message: 'Передан некорректный _id карточки.'
        })}
      if (error.name === 'CastError'){
        return res.status(404).json({
          message: 'Карточка с указанным _id не найдена.'
        })}
      return res.status(500).json(error)
    }
  }
  async addLike(req: Request, res: Response) {
    try {
      const card = await Card.findByIdAndUpdate(
        req.params.cardId,
        { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
        { new: true },
      )
      if (!card){
        return res.status(404).json({
          message: 'Передан несуществующий _id карточки.'
        })
      }
      return res.status(200).json(card)
    } catch (error: any) {
      if (error.name === 'SyntaxError'){
        return res.status(400).json({
          message: 'Переданы некорректные данные для постановки/снятия лайка или некорректный _id карточки.'
        })}
      if (error.name === 'CastError'){
        return res.status(400).json({
          message: 'Переданы некорректные данные для постановки/снятия лайка или некорректный _id карточки.'
        })}
      return res.status(500).json(error)
    }
  }
  async removeLike(req: Request, res: Response) {
    try {
      const card = await Card.findByIdAndUpdate(
        req.params.cardId,
        { $pull: { likes: req.user._id } }, // убрать _id из массива
        { new: true },
      )
      if (!card){
        return res.status(404).json({
          message: 'Передан несуществующий _id карточки.'
        })
      }
      return res.status(200).json(card)
    } catch (error: any) {
      if (error.name === 'SyntaxError'){
        return res.status(400).json({
          message: 'Переданы некорректные данные для постановки/снятия лайка или некорректный _id карточки.'
        })}
      if (error.name === 'CastError'){
        return res.status(400).json({
          message: 'Переданы некорректные данные для постановки/снятия лайка или некорректный _id карточки.'
        })}
      return res.status(500).json(error)
    }
  }
}

export default new CardsController()