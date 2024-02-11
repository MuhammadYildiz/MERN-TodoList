import { useEffect, useState } from "react";
import Create from "./Create";
import axios from "axios";

export default function Home() {
    const [todos, setTodos] = useState([])
    useEffect(() => {
        axios.get('http://localhost:5000/get')
            .then(result => setTodos(result.data))
            .catch(err => console.log(err))
    }, [])
    const handleEdit = (id) => {
        axios.put('http://localhost:5000/update/' + id)
            .then(() => {
                location.reload()
            })
            .catch(err => console.log(err))
    }
    const handleDelete = (id) => {
        axios.delete('http://localhost:5000/delete/' + id)
            .then(() => {
                location.reload()
            })
            .catch(err => console.log(err))
    }
    
    return (
        <div className="flex flex-col pt-5 items-center  w-full  bg-gray-900 h-[100dvh]">
            <h1 className="text-3xl font-bold m-3 text-white">Todo List</h1>
            <Create />
            <div className=" w-72 sm:w-96"  >
                {todos.length === 0 ?
                    <div><h2 className="text-white">No Todos.....</h2></div> :
                    todos.map((todo) => {
                        return (
                            <div key={todo._id} className="text-start m-2 bg-sky-700 text-white   flex items-center justify-between " >
                                <div className=" flex items-center basis-[90%] cursor-pointer hover:bg-sky-900  p-2 border-r" onClick={() => handleEdit(todo._id)}>
                                    <i className={`fa-regular fa-circle mr-2  rounded-full ${!todo.done ? "bg-white " :"bg-red-600"}`}></i>
                                    <p className={` ${!todo.done ? "" : "line-through text-black"}`}> {todo.newItem} </p>
                                </div>
                                <span className=" " onClick={() => handleDelete(todo._id)}>
                                    <i className="fa-solid fa-trash cursor-pointer hover:text-red-500 mx-3"></i>
                                </span>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}
