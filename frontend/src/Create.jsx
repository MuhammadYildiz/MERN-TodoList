import { useState } from "react"
import axios from 'axios';

export default function Create() {
    const [newItem, setNewItem] = useState('')
    const [alert, setAlert] = useState('')
    const handleChange = (e)=>{
        setNewItem(e.target.value)
        setAlert('')
    }
    const handleAdd = (e) => {
        e.preventDefault()
        if (!newItem) {
            setAlert(<p className="bg-white text-red-900 my-3 p-2 font-bold">Please Enter a todo</p>)
        }
        else {
            axios.post('http://localhost:5000/add', { newItem: newItem })
                .then(()=> {
                    location.reload()
                })
                .catch(err => console.log(err))
        }
        setNewItem("")
    }
    return (
        <div className="m-3">
            <form onSubmit={handleAdd}>
                <input type="text"
                    placeholder="Enter a toto item.."
                    onChange={(e)=>handleChange(e)}
                    value={newItem}
                    onFocus={() => setNewItem('')}
                    className=" p-2 outline-0" />

                <button type="submit"
                    className="bg-sky-700 text-white p-2">
                    Add
                </button>
            </form>
            <div>
                {alert}
            </div>
        </div>
    )
}
