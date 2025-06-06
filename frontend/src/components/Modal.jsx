import { useEffect, useState } from "react";
import useTodoStore from "../store/useTodoStore.js";
import Loading from "./Loading.jsx";

export default function ModalTask(props) {
    const { isOpen, handler, todo, mode } = props;
    const [dataTodo, setDataTodo, isLoadTodo] = useState({ name: "", description: "", startTime: "", time: "" });
    const { createTodo, updateTodo } = useTodoStore();

    useEffect(() => {
        if (todo) {
            setDataTodo({
                ...todo,
                startTime: new Date(todo.startTime).toISOString().split("T")[0],
                time: todo.time?.slice(0, 5) || "",
            });
        } else {
            const now = new Date();
            const dateStr = now.toISOString().split("T")[0]; // YYYY-MM-DD
            const timeStr = now.toTimeString().split(" ")[0].slice(0, 5); // HH:mm

            setDataTodo({
                name: "",
                description: "",
                startTime: dateStr,
                time: timeStr
            });
        }
    }, [todo]);


    const handlerAdd = (e) => {
        e.preventDefault();
        console.log(dataTodo);
        createTodo(dataTodo);
        handler();
    };

    const handlerEdit = (e) => {
        e.preventDefault();
        const newTodo = { ...todo, ...dataTodo };
        updateTodo(newTodo);
        handler();
    }


    return (
        <div
            className={`fixed inset-0 bg-black/30 flex items-center justify-center z-50 transition-opacity duration-200 ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                }`}
        >
            <div className="bg-white dark:bg-dark-mode dark:border-slate-400 border border-white rounded-2xl p-6 w-[400px] shadow-lg relative">
                {/* Nút đóng */}
                <button onClick={handler} className="cursor-pointer dark:hover:text-white absolute top-4 right-4 text-gray-400 hover:text-black text-xl">
                    &times;
                </button>

                {/* Tiêu đề */}
                <h2 className="text-xl font-semibold mb-1">{mode === "add" ? "Thêm hoạt động" : "Sửa hoạt động"}</h2>
                <p className="text-sm text-gray-500 mb-4">
                    {mode === "add" ? "Hoạt động vui chơi hay giải trí, thích gì thêm đó ^^" : "Thay đổi hoạt động thui !!!"}
                </p>

                {/* Form */}
                <form className="space-y-3" onSubmit={handlerAdd}>
                    <input
                        type="text"
                        value={dataTodo.name}
                        onChange={(e) => setDataTodo({ ...dataTodo, name: e.target.value })}
                        placeholder="Tên hoạt động"
                        className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                        type="date"
                        value={dataTodo.startTime}
                        onChange={(e) => setDataTodo({ ...dataTodo, startTime: e.target.value })}
                        className="w-full border rounded-md px-4 py-2 focus:outline-none"
                    />
                    <input
                        type="time"
                        value={dataTodo.time}
                        onChange={(e) => setDataTodo({ ...dataTodo, time: e.target.value })}
                        className="w-full border rounded-md px-4 py-2 focus:outline-none"
                    />
                    <textarea
                        value={dataTodo.description}
                        onChange={(e) => setDataTodo({ ...dataTodo, description: e.target.value })}
                        placeholder="Mô tả"
                        className="w-full border rounded-md px-4 py-2 h-24 resize-none focus:outline-none"
                    />
                </form>

                {/* Nút hành động */}
                <div className="flex justify-end mt-6 gap-2">
                    <button onClick={handler} className="cursor-pointer transition-colors hover:dark:border-white 
                     dark:text-white px-4 py-2 border rounded-md text-gray-700 hover:bg-gray-100 dark:hover:bg-slate-600">
                        Cancel
                    </button>
                    <button onClick={mode === "add" ? handlerAdd : handlerEdit} className="transition-colors cursor-pointer px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                        {mode === "add" ? "Thêm mới" : "Sửa"}
                    </button>
                </div>
            </div>
        </div>
    );
}
