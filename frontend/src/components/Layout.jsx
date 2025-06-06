import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import ContainerHeader from './ContainerHeader';

const Layout = () => {
    return (
        <div className="flex transition-colors duration-300 dark:text-white dark:bg-dark-mode/95">
            <Navbar />
            <main className="flex-1 flex flex-col gap-y-2 lg:gap-y-4 xl:gap-y-8 p-2 lg:p-4 xl:p-6">
                <ContainerHeader />
                <Outlet />
            </main>
        </div>
    );
};

export default Layout;
