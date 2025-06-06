import ContainerMain from "../components/ContainerMain";
import ContainerNav from "../components/ContainerNav";

const Container = () => {
    return <div className="flex flex-col gap-y-5 p-4 xl:p-6 rounded-2xl bg-white dark:bg-dark-mode transition-colors duration-300 border border-slate-400 w-full">
        <ContainerNav />
        <ContainerMain />
    </div>
}

export default Container; 