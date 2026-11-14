import './App.css'
import { useState } from "react"
import {TextField,Button,Stack,Typography,Paper,Table,TableBody,TableCell,TableContainer,TableHead,TableRow} from "@mui/material"

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
           setData(data.map(el=>
            el.id===editId?{...el,name:name,age:Number(age)}:el
            ))

            setEditId(0)
        } else {
            setData([...data, {
                id: Date.now(),name: name,age: Number(age)
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
        <div style={{ maxWidth: 800, margin: "40px auto", padding: "0 16px" }}>
            <Typography variant="h4" gutterBottom>YUSUF</Typography>

            <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
                <TextField size="small" label="Name" value={name} onChange={e => setName(e.target.value)} />
                <TextField size="small" label="Age" value={age} onChange={e => setAge(e.target.value)} />
                <Button variant="contained" onClick={addUser}>{editId !== 0 ? "Save" : "Add"}</Button>
            </Stack>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Age</TableCell>
                            <TableCell>Job</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {data.map(el => (
                            <TableRow key={el.id} hover>
                                <TableCell>{el.name}</TableCell>
                                <TableCell>{el.age}</TableCell>
                                <TableCell>{el.job}</TableCell>
                                <TableCell>
                                    <Button onClick={() => editUser(el)}>Edit</Button>
                                    <Button color="error" onClick={() => deleteUser(el.id)}>Delete</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
  )    
} 


export default App