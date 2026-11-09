
import { useState } from "react"

export const App = () => {
    const [data, setData] = useState([
        { id: 1, name: "Salmon", age: 20 },
        { id: 2, name: "Yusuf", age: 15 }
    ])

    const [name, setName] = useState("")
    const [age, setAge] = useState("")
    const [editId, setEditId] = useState(0)

    function addUser() {
        if (editId !== 0) {
            setData(data.map(el =>
                el.id === editId
                    ? { ...el, name: name, age: Number(age) }
                    : el
            ))

            setEditId(0)
        } else {
            setData([...data, {
                id: Date.now(),
                name: name,
                age: Number(age)
            }])
        }

        setName("")
        setAge("")
    }

    function deleteUser(id: number) {
        setData(data.filter(el => el.id !== id))
    }

    function editUser(el: typeof data[0]) {
        setName(el.name)
        setAge(String(el.age))
        setEditId(el.id)
    }

    return (
        <div>
            <h1>Full CRUD</h1>

            <input placeholder="Name" value={name} onChange={e => setName(e.target.value)}/>

            <input placeholder="Age" value={age} onChange={e => setAge(e.target.value)} />

            <button onClick={addUser}>
                {editId !== 0 ? "Save" : "Add"}
            </button>

            {data.map(el => (
                <div key={el.id}>
                    <h2>{el.name}</h2>
                    <p>{el.age}</p>

                    <button onClick={() => editUser(el)}>
                        Edit
                    </button>

                    <button onClick={() => deleteUser(el.id)}>
                        Delete
                    </button>
                </div>
            ))}
        </div>
    )
}

export default App
