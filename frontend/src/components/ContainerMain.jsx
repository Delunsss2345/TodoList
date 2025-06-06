import { useMemo, useState } from "react";
import useTodoStore from "../store/useTodoStore.js";
import { useEffect } from "react";
import { Clock, Ellipsis, Trash2 } from "lucide-react";
import ModalTask from "./Modal.jsx";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css';
import CardSkeleton from "./sekeletion/SekeletionTodo.jsx";
import ModalRemove from "./ModalRemove.jsx";
const ContainerMain = () => {
    const [isOpen, setOpen] = useState(false);
    const [isRemove, setRemove] = useState(false);
    const [isComplete, setComplete] = useState(false);
    const [isSelected, setSelected] = useState(null);
    const { isLoadTodo, todos, getTodos, getTodoSearch, updateComplete, valueSearch } = useTodoStore();
    const filterTodos = useMemo(() => {
        //useMemo lưu filter cũ không tính lại nếu không có gì thay đổi ở []
        const baseTodos = todos.filter(todo => isComplete ? todo.complete : !todo.complete);
        //chọn chưa hoàn thành sẽ hiện chưa hoành thành trong db lưu complete === false
        if (valueSearch) {
            return getTodoSearch(baseTodos);
        }
        return baseTodos;
    }, [todos, isComplete, valueSearch]);

    useEffect(() => {
        getTodos();
    }, [getTodos]);


    const handleModal = () => {
        setOpen(!isOpen);
    }

    const handlerRemove = () => {
        setRemove(!isRemove);
    }


    return <> <div className="w-full flex flex-col gap-y-6 lg:gap-y-12">
        <div className="flex w-fit p-1 border border-slate-300 rounded-sm bg-slate-400/20 *:text-sm ">
            <div>
                <input onClick={() => setComplete(false)} defaultChecked type="radio" id="doing" name="status" hidden className="peer/doing" />
                <label htmlFor="doing" className="transition peer-checked/doing:bg-white peer-checked/doing:font-semibold peer-checked/doing:text-dark-mode p-2 rounded cursor-pointer block">
                    Đang thực hiện
                </label>
            </div>

            <div>
                <input onClick={() => setComplete(true)} type="radio" id="done" name="status" hidden className="peer/done" />
                <label htmlFor="done" className="transition peer-checked/done:bg-white peer-checked/done:font-semibold peer-checked/done:text-dark-mode p-2 rounded cursor-pointer block">
                    Đã hoàn thành
                </label>
            </div>

        </div>
        <div className="grid lg:grid-cols-3 sm:grid-cols-2 xl:grid-cols-4 xl:gap-3 gap-y-4 sm:gap-x-4 border-t-1 border-slate-200 pt-4 lg:pt-6">
            {isLoadTodo && <CardSkeleton />}
            {!isLoadTodo && filterTodos.length === 0 ? <h1 className="text-lg font-semibold w-full whitespace-nowrap">{isComplete ? 'Hôm nay chưa hoàn thành hoạt động nào' : 'Hôm nay đã hoàn thành hết hoạt động ✔️'}</h1> : (
                filterTodos.map(todo => (
                    <div className="flex flex-col dark:bg-white/90 bg-primary/30 p-4 hover:-translate-y-2 border transition-transform duration-300 border-slate-400 rounded-xl gap-y-2 " key={todo._id}>
                        <div className="flex justify-between items-center ">
                            <div className="flex gap-x-2 items-center">
                                <input checked={todo.complete}
                                    onChange={() => updateComplete(todo._id)} className="size-4 cursor-pointer" type="checkbox" />
                                <h1 className="font-semibold text-dark-mode">{todo.name}</h1>
                            </div>
                            <button
                                onClick={() => { setSelected(todo), setOpen(!isOpen) }}
                                className="hover:bg-black/10 p-1 dark:text-dark-mode rounded-md transition cursor-pointer"
                            >
                                <Ellipsis />
                            </button>
                        </div>
                        <p className="text-sm text-black/70 ">{todo.description}</p>
                        <div className="flex justify-between">
                            <p className="text-sm text-gray-600 dark:text-dark-mode flex items-center gap-1">
                                <Clock className="size-3" /> {todo.time}
                            </p>
                            <button onClick={() => { setRemove(!isRemove), setSelected(todo) }} className="hover:opacity-50 cursor-pointer transition-opacity duration-300">
                                <Trash2 className="size-4 dark:text-dark-mode" />
                            </button>
                        </div>

                    </div>

                ))
            )}

        </div>

        <ModalTask isOpen={isOpen} todo={isSelected} handler={handleModal} mode='edit' />
        <ModalRemove isOpen={isRemove} handler={handlerRemove} todo={isSelected} />

    </div>

    </>
}
export default ContainerMain;


