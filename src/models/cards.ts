import mongoose from "mongoose";

// Понял, принял, сделал, и всегда так буду делать. :)
interface ICards extends Document {
  name: string;
  link: string;
  owner: mongoose.Schema.Types.ObjectId;
  likes: mongoose.Schema.Types.ObjectId[];
  createdAt: Date;
}

const cardSchema = new mongoose.Schema<ICards>({
    name: {
      type: String,
      required: [true, 'Поле названия карточки должно быть заполнено.'],
      minlength: [2, 'Минимальное количество символов названия карточки - 2'],
      maxlength: [30, 'Максимальное количество символов названия карточки - 30'],
    },
    link: {
      type: String,
      required: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    likes: {
      // Огромнейшее спасибо, сенсей
      type: [mongoose.Schema.Types.ObjectId],
      ref: "user",
      default: [],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { // Большое спасибо.
      versionKey: false
  }
);


export default mongoose.model("card", cardSchema);
