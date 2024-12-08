import { Request, Response } from 'express';
import User from '../models/users'

class UsersController {
  async create(req: Request, res: Response) {
    try {
      const {name, about, avatar} = req.body;
      const user = await User.create({name, about, avatar})
      return res.status(201).json(user)
    } catch (error: any) {
      if (error.name === 'ValidationError'){
        return res.status(400).json({
          message: 'Переданы некорректные данные при создании пользователя.'
        })}
      return res.status(500).json(error)
    }
  }
  async getAll(req: Request, res: Response) {
    try {
      const users = await User.find()
      return res.status(200).json(users)
    } catch (error: any) {
      return res.status(500).json(error)
    }
  }
  async getOne(req: Request, res: Response) {
    try {
      const user = await User.findById(req.params.userId)
      if (!user){
        return res.status(404).json({
          message: 'Пользователь по указанному _id не найден.'
        })
      }
      return res.status(200).json(user)
    } catch (error: any) {
      if (error.name === 'ValidationError' || error.name === 'CastError'){
        return res.status(400).json({
          message: 'Передан некорректный _id пользователя.'
        })}
      return res.status(500).json(error)
    }
  }
  async updateProfile(req: Request, res: Response) {
    try {
      const updUser = await User.findByIdAndUpdate(req.user._id, req.body, {new: true, runValidators: true})
      if(!updUser) {
        return res.status(404).json({
          message: 'Пользователь с указанным _id не найден.'
        })
      }
      return res.status(200).json(updUser)
    } catch (error: any) {
      if (error.name === 'ValidationError' || error.name === 'CastError'){
        return res.status(400).json({
          message: 'Переданы некорректные данные при обновлении профиля.'
        })}
      return res.status(500).json(error)
    }
  }
  async updateAvatar(req: Request, res: Response) {
    try {
      const updAvatar = await User.findByIdAndUpdate(req.user._id, req.body, {new: true, runValidators: true})
      if(!updAvatar) {
        return res.status(404).json({
          message: 'Пользователь с указанным _id не найден.'
        })
      }
      return res.status(200).json(updAvatar)
    } catch (error: any) {
      if (error.name === 'ValidationError' || error.name === 'CastError'){
        return res.status(400).json({
          message: 'Переданы некорректные данные при обновлении аватара.'
        })}
      return res.status(500).json(error)
    }
  }
}

export default new UsersController()