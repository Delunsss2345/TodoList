import mongoose from 'mongoose';

const TodoSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    startTime: {
      type: Date,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    complete: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true }
);

const Todo = mongoose.model('Todo', TodoSchema);

export default Todo;
