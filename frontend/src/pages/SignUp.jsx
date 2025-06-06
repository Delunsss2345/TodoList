import { Eye, EyeClosed } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import useAuthStore from "../store/useAuthStore.js";

const SignUp = () => {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [showPassword, setShowPassword] = useState(false);
    const { isLogging, login } = useAuthStore();

    const handleSubmit = async (e) => {
        e.preventDefault();
        login(formData);
    }
    if (isLogging) {
        return <Loading />
    }

    return <div className="max-w-screen min-h-screen flex items-center justify-center bg-gradient-to-tl from-[#e0ebfe] to-[#f2f4f5]">
        <div className="w-120 space-y-8 p-2 lg:p4 xl:p-6 border border-slate-400 rounded-xl">
            <div className="flex gap-x-2">
                <h2 className="font-semibold text-2xl text-dark-mode">Đăng ký</h2>
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-y-4 *:w-full">
                <div>
                    <label className="font-semibold" htmlFor="fullName">Họ và tên</label>
                    <input onChange={(e) => setFormData({ ...formData, fullName: e.target.value })} placeholder="Họ Tên..." className="mt-2 px-4 py-2 block w-full border border-slate-300 rounded-lg focus:outline-0" id="fullName" type="text" />
                </div>
                <div>
                    <label className="font-semibold" htmlFor="email">Email</label>
                    <input onChange={(e) => setFormData({ ...formData, email: e.target.value })} placeholder="Email..." className="mt-2 px-4 py-2 block w-full border border-slate-300 rounded-lg focus:outline-0" id="email" type="text" />
                </div>
                <div>
                    <label className="font-semibold" htmlFor="password">Mật khẩu</label>
                    <div className="relative">
                        <input onChange={(e) => setFormData({ ...formData, password: e.target.value })} placeholder="Mật khẩu..." className="mt-2 pr-10 pl-4 py-2 block w-full border border-slate-300 rounded-lg focus:outline-0" id="password" type={!showPassword ? "password" : "text"} />
                        <label onClick={() => setShowPassword(!showPassword)} className="absolute z-10 h-full right-[10px] top-[35%] cursor-pointer" htmlFor="password">
                            {showPassword ? <Eye size={15} /> : <EyeClosed size={15} />}
                        </label>
                    </div>
                </div>


                <button type='submit' className="text-center self-center px-4 py-2 border border-slate-400 bg-btn text-white font-semibold rounded-lg hover:bg-btn/90 hover:scale-101 
                transition cursor-pointer">Đăng nhập</button>
                <div className="flex gap-x-2 italic text-sm justify-end">
                    <p>Bạn đã có tài khoản?</p> <Link className="underline text-btn" to="/login">Đăng nhập ngay</Link>
                </div>
            </form>

        </div>
    </div>
}

export default SignUp 