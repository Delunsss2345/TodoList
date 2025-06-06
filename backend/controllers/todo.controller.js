import Todo from "../models/todo.model.js";
import User from "../models/user.model.js";

export const createTodo = async (req, res) => {
    const { name, description, startTime, time } = req.body;
    const userId = req.user._id;
    if (!name || !description || !startTime || !time) {
        return res.status(400).json({ message: 'Không được trống todo' });
    }

  if (new Date(startTime).setHours(0,0,0,0) < new Date().setHours(0,0,0,0)) {
    return res.status(400).json({ message: 'Ngày bắt đầu phải lớn hơn hoặc bằng ngày hiện tại' });
    }

    try {
        const todo = new Todo({
            userId,
            name,
            description ,
            startTime ,
            time  ,
            complete: false
        });

        await todo.save();

        res.status(201).json({ message: 'Tạo thành công', todo });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server lỗi' });
    }
}


export const getTodos = async (req, res) => {
    const userId = req.user._id;
    try {
        const user = await User.findById(userId).populate('todos');
        const todos = user.todos;
        res.status(201).json({ todos });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server lỗi' });
    }
}


export const updateTodo = async (req, res) => {
    const userId = req.user._id;
    const { id: todoId } = req.params;
    try {
        const todo = await Todo.findOneAndUpdate(
            { _id: todoId, userId },
            req.body,
            { new: true, runValidators: true }
        );
        res.status(200).json({message : "Sửa thành công" , todo });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server lỗi' });
    }
}

export const updateComplete = async (req, res) => {
    const userId = req.user._id;
    const { id: todoId } = req.params;
    try {
        const todo = await Todo.findOne({ _id: todoId, userId });
        if (!todo) return res.status(404).json({ message: "Không tìm thấy hoạt động" });

        todo.complete = !todo.complete;
        await todo.save();

        res.status(200).json({ message: "Cập nhật trạng thái thành công", todo });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server lỗi' });
    }
}



export const deleteTodo = async (req, res) => {
    const userId = req.user._id;
    const { id: todoId } = req.params;

    try {
        await Todo.findByIdAndDelete({ _id: todoId, userId });
        res.status(200).json({ message: 'Xoá thành công' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server lỗi' });
    }
}
