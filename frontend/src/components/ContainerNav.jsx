import { CirclePlus, Search } from "lucide-react";
import useTodoStore from "../store/useTodoStore.js";
import { useState } from "react";
import ModalTask from "./Modal.jsx";

const ContainerNav = () => {
    const [isOpen, setOpen] = useState(false);

    const handleModal = () => {
        setOpen(!isOpen);
    }
    return <div className="w-full dark:text-white flex justify-between">
        {/* <h1>Container Nav</h1> */}
        <div className="flex gap-x-4">
            <div className="flex gap-x-2  items-center relative">
                <label className="absolute left-2" htmlFor=""><Search size={15} /></label>
                <input type="text" className="border py-1.5 pl-7 focus:outline-0 border-slate-400 rounded-sm" />
            </div>
            <button onClick={() => setOpen(!isOpen)} className="cursor-pointer flex text-white items-center  gap-x-2 p-2 lg:py-1.5 lg:px-4 bg-blue-600 rounded-sm"><CirclePlus size={20} /> <p className="hidden sm:block text-[10px] lg:text-sm font-semibold">Add New Todo</p> </button>
            <ModalTask isOpen={isOpen} handler={handleModal} mode={'add'} />
        </div>
    </div>
}
export default ContainerNav; 