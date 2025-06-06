import { LogOut, Moon, Sun, User } from "lucide-react";
import useAuthStore from "../store/useAuthStore.js";
import Loading from "./Loading.jsx";
import { useState } from "react";
import { Link } from 'react-router-dom'

const ContainerHeader = () => {
    const [showMenu, setShowMenu] = useState(false);
    const { authUser, isLoading, logout } = useAuthStore();
    const [mode, setMode] = useState(false);
    const handlerLogout = async () => {
        await logout();
    }

    const toggleDarkMode = () => {
        setMode(!mode);
        document.documentElement.classList.toggle('dark');
    };

    if (isLoading) {
        return <Loading />
    }
    return <div className="flex items-center justify-between ">
        <h1 className="font-bold text-2xl">Todo List</h1>
        <div className="flex gap-x-6">
            <button className="cursor-pointer" onClick={toggleDarkMode}>
                {mode ? <Moon /> : <Sun />}
            </button>

            <figure onClick={() => { setShowMenu(!showMenu) }} className="relative cursor-pointer rounded-full bg-white size-9">
                <img className="rounded-full object-cover" src={authUser.profilePic || '/avatar_default.png'} alt="" />
                <ul className={`bg-white z-10 absolute flex flex-col rounded-xl overflow-hidden border border-slate-400 w-50 top-15 right-0 dark:bg-dark-mode *:flex *:gap-x-2 *:dark:text-white transition duration-300 ${showMenu ? 'scale-x-100  origin-right opacity-100' : 'visible opacity-0 scale-x-0 origin-right'
                    }`}>

                    <li className="hover:bg-slate-300/90 transition-colors py-4 px-2">
                        <Link to='/profile' className="w-full flex  gap-x-2 items-center">
                            <button className="cursor-pointer"><User /></button>
                            <p className="font-semibold text-sm">Trang cá nhân</p>
                        </Link>
                    </li>

                    <li onClick={() => handlerLogout()} className="hover:bg-slate-300/90 transition-colors py-4 px-2">
                        <button className="cursor-pointer"><LogOut /></button>
                        <p className="font-semibold text-sm">Đăng xuất</p>
                    </li>
                </ul>
            </figure>

        </div>

    </div>
}

export default ContainerHeader;
