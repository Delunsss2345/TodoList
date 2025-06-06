import { ClipboardList } from 'lucide-react';
import { Link } from 'react-router-dom';
const NavBar = () => {
    return <nav className="hidden lg:flex flex-col w-[15%] bg-nav transition-colors duration-300 dark:text-white dark:bg-dark-mode h-screen p-2 lg:p-4 xl:p-6">

        <div className="flex items-center gap-x-2">
            <figure className='w-12'>
                <img src="../public/images/logo.png" alt="Logo" />
            </figure>
            <h1 className="font-semibold text-sm lg:text-xl">HealDocs</h1>
        </div>

        <div className="flex flex-col gap-y-2 xl:mt-4">
            <button className='px-4 py-2 hover:bg-primary/50 rounded-xl transition-colors cursor-pointer'>
                <Link className='flex gap-x-2 items-center' to='/'>
                    <ClipboardList size={15} /> <p className='font-semibold text-sm'>Todo List</p>
                </Link>
            </button>
        </div>
    </nav>
}


export default NavBar; 