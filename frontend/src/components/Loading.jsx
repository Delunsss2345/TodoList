import { ClipLoader } from 'react-spinners';

const Loading = () => {
    return <div className="absolute bg-slate-700 w-screen h-screen flex items-center justify-center">
        <ClipLoader color="#5B9BFC" size={25} />
    </div>
}

export default Loading; 