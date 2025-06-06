import { CircleX, OctagonAlert, OctagonX, X } from "lucide-react";
import useTodoStore from "../store/useTodoStore.js";

const ModalRemove = (props) => {
    const { isOpen, todo, handler } = props;
    const { deleteTodo } = useTodoStore();
    const handlerRemove = (e) => {
        e.preventDefault();
        deleteTodo(todo._id);
        handler();
    }
    return <>
        {isOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
                <div className="bg-white w-full max-w-md rounded-xl shadow-lg overflow-hidden space-y-5 p-6">

                    <div className="flex">
                        {/* Icon cảnh báo */}
                        <div className="flex items-start justify-center">
                            <div className="bg-red-100 text-red-600 p-2 rounded-full">
                                <OctagonAlert />
                            </div>
                        </div>

                        {/* Text */}
                        <div className="ml-4">
                            <h2 className="text-lg font-semibold text-gray-900">Xoá hoạt động {todo.name.toLowerCase()}</h2>
                            <p className="mt-1 italic text-sm text-gray-500">
                                Bạn có chắc chắn, khi xoá tất cả mọi thứ về hoạt động này sẽ biến mất, và không thể khôi phục
                            </p>
                        </div>
                    </div>

                    {/* Nút */}
                    <div className="bg-gray-50 flex justify-end gap-2">
                        <button onClick={handler} className="px-4 py-2 text-sm rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-400 cursor-pointer transition-colors ">
                            Thôi vậy
                        </button>
                        <button onClick={handlerRemove} className="px-4 py-2 text-sm rounded-lg bg-red-600 text-white hover:bg-red-900 cursor-pointer transition-colors">
                            Xoá
                        </button>
                    </div>
                </div>
            </div>

        )}
    </>
}




export default ModalRemove; 