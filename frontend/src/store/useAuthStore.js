import {create} from 'zustand'
import {axiosInstance} from '../lib/axios.js'
import toast from 'react-hot-toast';
const useAuthStore = create((set, get) => ({
    isUpdating : false , 
    isCheckingAuth : true ,
    isLogging : false , 
    authUser : null ,
    checkAuth : async () => {
        try {
            const res  = await axiosInstance.get("/auth/check") ;
            set({authUser : res.data.user}) ; 
        }
        catch (error) {
            set({authUser : null}) ; 
        }
        finally {
            set({ isCheckingAuth: false });
        }
    } , 
    login : async (data) => {
        set({isLogging : true}) ; 
        try {
            const res  = await axiosInstance.post("/auth/login", data) ; 
            set({ authUser: res.data.user }); 
            toast.success(res.data.message) ; 
        }
        catch (error) {
            console.error(error) ; 
            toast.error(error.response.data.message) ; 
        }
        finally {
            set({isLogging : false}) ; 
        }
    } ,
    signup : async (data) => {
        set({isLogging : true}) ; 
        try {
            const res  = await axiosInstance.post("/auth/signup", data) ; 
            set({ authUser: res.data.user }); 
            toast.success(res.data.message) ; 
        }
        catch (error) {
            toast.error(error.response.data.message) ; 
        }
        finally {
            set({isLogging : false}) ; 
        }
    } ,
    logout : async () => {
        set({isLogging : true}) ; 
        try {
            const res  = await axiosInstance.post("/auth/logout") ; 
            set({authUser : null}) ; 
            toast.success(res.data.message) ; 
        }
        catch (error) {
            toast.error(error.response.data.message) ; 
        }
        finally {
            set({isLogging : false}) ; 
        }
    } , 
    updateProfile : async (data) => {
        set({isUpdating : true}) ; 
        try {
            const res = await axiosInstance.put("/auth/update" , data) ;
            set({ authUser: res.data.user });
            toast.success(res.data.message) ; 
        }
        catch (error) {
            toast.error(error.response.data.message) ; 
        }
        finally {
            set({isUpdating : false}) ; 
        }
    }
}))
export default useAuthStore ; 