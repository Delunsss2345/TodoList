import { CalendarCheck, CirclePlus, Search } from "lucide-react";
import useTodoStore from "../store/useTodoStore.js";
import { useState } from "react";
import ModalTask from "./Modal.jsx";

const ContainerNav = () => {
    const [isOpen, setOpen] = useState(false);
    const [search, setSearch] = useState("");
    const { setValueSearch } = useTodoStore();
    const handlerOnSearch = () => {
        setValueSearch(search);
    }
    const handleModal = () => {
        setOpen(!isOpen);
    }
    return <div className="w-full dark:text-white flex justify-between">
        <h1 className="font-semibold text-2xl flex items-center gap-x-2">Today<CalendarCheck /></h1>
        <div className="flex gap-x-4">
            <div className="flex gap-x-2  items-center relative">
                <label onClick={handlerOnSearch} className="absolute left-2" htmlFor=""><Search size={15} /></label>
                <input value={search} onChange={(e) => setSearch(e.target.value)} type="text" className="border py-1.5 pl-7 focus:outline-0 border-slate-400 rounded-sm" />
            </div>
            <button onClick={() => setOpen(!isOpen)} className="cursor-pointer flex text-white items-center  gap-x-2 p-2 lg:py-1.5 lg:px-4 bg-blue-600 rounded-sm"><CirclePlus size={20} /> <p className="hidden sm:block text-[10px] lg:text-sm font-semibold">Add New Todo</p> </button>
            <ModalTask isOpen={isOpen} handler={handleModal} mode={'add'} />
        </div>
    </div>
}
export default ContainerNav;


