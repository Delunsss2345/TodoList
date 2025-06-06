import { Camera, Eye, EyeClosed, Undo2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAuthStore from "../store/useAuthStore.js";
import Loading from "../components/Loading.jsx";

const Profile = () => {
    const { authUser, isUpdating, updateProfile } = useAuthStore();
    const [updateUser, setUpdateUser] = useState({ ...authUser })
    const [imagePreview, setImagePreview] = useState(null);

    const handleUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();

        reader.onload = function (e) {
            setImagePreview(e.target.result);
        };

        reader.readAsDataURL(file); //Chạy bất đồng bộ đặt ở sau cho chắc chạy kịp
    }

    const handleUpdateUser = async (e) => {
        e.preventDefault();
        await updateProfile({ ...updateUser, profilePic: imagePreview });

    }
    if (isUpdating) {
        return <Loading />
    }
    return (
        <div className="relative max-w-screen min-h-screen flex items-center justify-center bg-gradient-to-tl
     from-[#e0ebfe] to-[#f2f4f5] dark:from-dark-mode dark:to-dark-mode/90 dark:text-white">
            <div className="w-100 space-y-8 p-2 lg:p4 xl:p-6 border border-slate-400 rounded-xl">
                <div>
                    <figure className="mx-auto self-center size-30 relative">
                        <img className="rounded-full object-cover border border-slate-400" src={imagePreview || authUser.profilePic || "/src/images/avatar_default.png"} alt="" />
                        <input onChange={handleUpload} type="file" id="profilePic" hidden />
                        <label className="dark:bg-dark-mode flex items-center justify-center rounded-full border border-slate-400 cursor-pointer absolute right-0 bottom-2 bg-white size-8" htmlFor="profilePic">
                            <Camera size={18} />
                        </label>
                    </figure>
                </div>
                <form className="flex flex-col gap-y-4 ">
                    <div className="w-full">
                        <label className="font-semibold" htmlFor="name">Họ và tên</label>
                        <input value={updateUser.fullName} onChange={(e) => setUpdateUser({ ...updateUser, fullName: e.target.value })} className="mt-2 px-4 py-2 block w-full border border-slate-300 rounded-lg focus:outline-0" id="name" type="text" />
                    </div>
                    <div className="w-full">
                        <label className="font-semibold" htmlFor="email">Email</label>

                        <input value={updateUser.email} onChange={(e) => setUpdateUser({ ...updateUser, email: e.target.value })} className="mt-2 pr-10 pl-4 py-2 block w-full border border-slate-300 rounded-lg focus:outline-0" id="email" type='text' />


                    </div>

                    <button onClick={handleUpdateUser} className="text-right self-end px-4 py-2 border border-slate-400 bg-btn text-white font-semibold rounded-lg hover:bg-btn/90 hover:scale-101 
                transition cursor-pointer">Sửa thông tin</button>
                </form>

            </div>

            <Link to="/" className="absolute top-5 left-5">
                <Undo2 />
            </Link>
        </div>
    )
}

export default Profile;

