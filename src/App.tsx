import './App.css'
import { useState } from "react"
import { Input, Button } from "antd"

export const App = () => {
    const [data, setData] = useState([
        { id: 1, name: "Mirzoev", age: 20,job:"Student"},
        { id: 2, name: "Yusuf", age: 15,job:"Student"},
        {id: 3, name: "Salmon", age: 20,job:"Student"},
        {id: 4, name: "Abubakr", age: 20,job:"Student"}
    ])

    const [name, setName] = useState("")
    const [age, setAge] = useState("")
    const [editId, setEditId] = useState(0)

    function addUser() {
        if (editId !== 0) {
            setData(data.map(el =>
                el.id === editId? { ...el, name: name, age: Number(age) }: el
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

    function editUser(el){
        setName(el.name)
        setAge(String(el.age))
        setEditId(el.id)
    }

    return (
        <div>
            <h1>YUSUF</h1>

            <Input placeholder="Name" value={name} onChange={e => setName(e.target.value)} style={{ width: 200 }}/>
            <Input placeholder="Age" value={age} onChange={e => setAge(e.target.value)} style={{ width: 200 }} />
            <Button type="primary" onClick={addUser}>{editId !== 0 ? "Save" : "Add"}</Button>

<table className='tss'>
    <thead>
        <td>Name</td>
        <td>Age</td>
        <td>City</td>
        <td>Job</td>
        <td>Actions</td>
        
    </thead>




            {data.map(el => (
                <tr key={el.id}>
                    <td>{el.name}</td>
                    <td>{el.age}</td>
                    <td>{el.city}</td>
                    <td>{el.job}</td>
                    <Button className='btnEdit' onClick={() => editUser(el)}>Edit</Button>
                    <Button danger className='btnDelete' onClick={() => deleteUser(el.id)}> Delete </Button>
                </tr>
                
            ))}</table> 
        </div>
  )    
} 


export default App