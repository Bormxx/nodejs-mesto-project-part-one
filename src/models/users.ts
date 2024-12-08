import mongoose from "mongoose";

interface IUser extends Document {
  name: string;
  about: string;
  avatar: string;
}

const userSchema = new mongoose.Schema<IUser>({
  name: {
    type: String,
    required: [true, 'Поле имя должно быть заполнено'],
    minlength: [2, 'Минимальное количество символов имени - 2'],
    maxlength: [30, 'Максимальное количество символов имени - 30'],
  },
  about: {
    type: String,
    required: [true, 'Поле "О себе" должно быть заполнено'],
    minlength: [2, 'Минимальное количество символов поля "О себе" - 2'],
    maxlength: [200, 'Максимальное количество символов поля "О себе" - 200'],
  },
  avatar: {
    type: String,
  },
});

export default mongoose.model("user", userSchema);
