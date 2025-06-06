import {create} from 'zustand'
import {axiosInstance} from '../lib/axios.js'
import toast from 'react-hot-toast';
const useTodoStore = create((set, get) => ({
    isSearch : false ,
    valueSearch : "" , 
    isLoadTodo : false ,
    isAddTodo : false , 
    todos : [] ,
    createTodo : async (data) => {
        set({isAddTodo : true}) ; 
        try {
            const {todos} = get()
            console.log(data) ; 
            const res  = await axiosInstance.post("/todo" , data) ;
            console.log(res) ; 
            set({todos : [...todos, res.data.todo]}) 
            toast.success(res.data.message) ; 
        }
        catch (error) {
            console.error(error) ;
            toast.error(error.response.data.message) ; 
        }
        finally {
            set({isAddTodo : false}) ; 
        }
    } , 
    getTodos : async () => {
        set({isLoadTodo : true})
        try {
            const res  = await axiosInstance.get("/todos") ; 
            set({todos : res.data.todos}) ; 
        }
        catch (error) {
            toast.error(error.response.data.message) ; 
        }
        finally {
        set({isLoadTodo : false})

        }
    } , 
    updateTodo : async (data) => {
        set({isLoadTodo : true})
        try {
            const res = await axiosInstance.put(`/todo/${data._id}` , data) ; 
            const {todos} = get() ; 
            const idx = todos.findIndex(todo => todo._id === data._id) ; 
            todos[idx] = data ; 
            set({todos : [...todos]}) ; 
            toast.success(res.data.message) ; 
        }
        catch(error) {
            toast.error(error.response.data.message) ; 
        }
        finally {
             set({isLoadTodo : false})
        }
    },
    updateComplete : async (id) => {
        set({isLoadTodo : true})
        try {
            const res = await axiosInstance.put(`/complete/${id}`) ; 
            const {todos} = get() ; 
            const idx = todos.findIndex(todo => todo._id === id) ; 
            todos[idx] = res.data.todo ; 
            set({todos : [...todos]}) ; 
            toast.success(res.data.message) ; 
        }
        catch(error) {
            toast.error(error.response.data.message) ; 
        }
        finally {
             set({isLoadTodo : false})
        }
    },
    deleteTodo : async (id) => {
        try {
            const res = await axiosInstance.delete(`/todo/${id}`) ; 
            const {todos} = get() ; 
            const newTodos = todos.filter(todo => todo._id !== id) ; 
            set({todos : [...newTodos]}) ; 
            toast.success(res.data.message) ; 
        }
        catch (error) {
            toast.error(res.response.data.message) ; 
        }
    } ,
    setSearch : () => {
        set({})
    }
}))
export default useTodoStore ; 