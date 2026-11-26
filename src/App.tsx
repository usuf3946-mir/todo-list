
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

type Todo = {
    id: number
    name: string
    description: string
    images?: {
        id?: number
        imageName: string
    }[]
}

type TodoResponse = {
    data: Todo[]
}

const schema = z.object({
    name: z.string().min(2, 'Minimum 2 characters'),
    description: z.string().min(3, 'Minimum 3 characters')
})

type TodoForm = z.infer<typeof schema>

const Crud = () => {
    const api = 'https://to-dos-api.softclub.tj/api/to-dos'

    const [data, setData] = useState<Todo[]>([])
    const [search, setSearch] = useState('')
    const [filter, setFilter] = useState('all')
    const [edit, setEdit] = useState<Todo | null>(null)

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm<TodoForm>({
        resolver: zodResolver(schema),
        defaultValues: {
            name: '',
            description: ''
        }
    })

    async function getTodos() {
        try {
            const res = await axios.get<TodoResponse>(api)
            setData(res.data.data)
        } catch (error) {
            console.log(error)
        }
    }

    async function addTodo(values: TodoForm) {
        try {
            await axios.post(api, {
                name: values.name,
                description: values.description
            })

            reset()
            getTodos()
        } catch (error) {
            console.log(error)
        }
    }

    async function saveTodo(values: TodoForm) {
        if (!edit) return

        try {
            await axios.put(api, {
                id: edit.id,
                name: values.name,
                description: values.description
            })

            setEdit(null)
            reset()
            getTodos()
        } catch (error) {
            console.log(error)
        }
    }

    async function deleteTodo(id: number) {
        try {
            await axios.delete(api, {
                params: { id }
            })

            if (edit?.id === id) {
                setEdit(null)
                reset()
            }

            getTodos()
        } catch (error) {
            console.log(error)
        }
    }

    function startEdit(todo: Todo) {
        setEdit(todo)

        reset({
            name: todo.name,
            description: todo.description
        })
    }

    function cancelEdit() {
        setEdit(null)
        reset({
            name: '',
            description: ''
        })
    }

    const filteredData = data.filter((el) => {
        const text = search.toLowerCase()

        const matchesSearch =
            el.name?.toLowerCase().includes(text) ||
            el.description?.toLowerCase().includes(text)

        const hasImages = Boolean(el.images?.length)

        const matchesFilter =
            filter === 'all' ||
            (filter === 'withImages' && hasImages) ||
            (filter === 'withoutImages' && !hasImages)

        return matchesSearch && matchesFilter
    })

    useEffect(() => {
        getTodos()
    }, [])

    return (
        <div style={{ padding: '25px' }}>

            <h1>Todo CRUD</h1>

            <form
                onSubmit={handleSubmit(edit ? saveTodo : addTodo)}
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                    maxWidth: '400px',
                    marginBottom: '25px'
                }}
            >

                <h2>{edit ? 'Edit Todo' : 'Add Todo'}</h2>

                <input
                    type="text"
                    placeholder="Name"
                    {...register('name')}
                />

                {errors.name && (
                    <p style={{ color: 'red' }}>
                        {errors.name.message}
                    </p>
                )}

                <textarea
                    placeholder="Description"
                    {...register('description')}
                />

                {errors.description && (
                    <p style={{ color: 'red' }}>
                        {errors.description.message}
                    </p>
                )}

                <div style={{ display: 'flex', gap: '10px' }}>

                    <button type="submit">
                        {edit ? 'Save' : 'Add Todo'}
                    </button>

                    {edit && (
                        <button
                            type="button"
                            onClick={cancelEdit}
                        >
                            Cancel
                        </button>
                    )}

                </div>

            </form>

            <div style={{
                display: 'flex',
                gap: '10px',
                marginBottom: '20px'
            }}>

                <input
                    type="text"
                    placeholder="Search..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

                <select
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                >
                    <option value="all">All Todos</option>
                    <option value="withImages">With Images</option>
                    <option value="withoutImages">Without Images</option>
                </select>

            </div>

            <p>Total: {filteredData.length}</p>

            <table
                border={1}
                cellPadding={10}
                style={{
                    width: '100%',
                    borderCollapse: 'collapse'
                }}
            >

                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Images</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {filteredData.map((el) => (
                        <tr key={el.id}>

                            <td>{el.id}</td>

                            <td>{el.name}</td>

                            <td>{el.description}</td>

                            <td>{el.images?.length || 0}</td>

                            <td>
                                <button
                                    onClick={() => startEdit(el)}
                                >
                                    Edit
                                </button>

                                <button
                                    onClick={() => deleteTodo(el.id)}
                                >
                                    Delete
                                </button>
                            </td>

                        </tr>
                    ))}

                    {filteredData.length === 0 && (
                        <tr>
                            <td colSpan={5}>
                                No Todos Found
                            </td>
                        </tr>
                    )}
                </tbody>

            </table>

        </div>
    )
}

export default Crud
