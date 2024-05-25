import React, { useState, useEffect } from 'react';
import { getAllTodos, deleteTodo } from "../api";
import { Link } from 'react-router-dom'; 
import { formatDate } from '../utils'; 

const AllTasks = () => {
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        
        getAllTodos()
            .then(data => {
                
                setTodos(data);
            })
            .catch(error => {
                
                console.error("Error fetching data:", error);
            });
    }, []); 

    const handleDelete = async (id) => {
        try {
            await deleteTodo(id);
            
            setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
        } catch (error) {
            
            console.error("Error deleting todo:", error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 py-12">
            <div className="max-w-4xl mx-auto px-4">
                <h1 className="font-bold text-center text-5xl mb-8">Todo App</h1>
                <div className="bg-white rounded-lg shadow-lg p-8">
                    <h2 className="font-bold text-center text-3xl mb-6">All Todos</h2>
                    <Link to="/new"> 
                        <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded mb-4">
                            Create New Task
                        </button>
                    </Link>
                    {todos.length === 0 ? (
                        <p className="text-center text-xl">No todos yet</p>
                    ) : (
                        <table className="min-w-full">
                            <thead>
                                <tr>
                                    <th className="text-left">Title</th>
                                    <th className="text-left">Status</th>
                                    <th className="text-left">Due Date</th>
                                    <th className="text-left">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {todos.map(todo => (
                                    <tr key={todo.id}>
                                        <td>{todo.title}</td>
                                        <td>{
                                        
                                            todo.isTaskCompleted === 0 ? "Not Completed" : todo.isTaskCompleted === 1 ? "In Progress" : "Completed"}</td>
                                        <td>{formatDate(todo.due_date)}</td>
                                        <td>
                                            <Link to={`/edit/${todo.id}`}> {/* Link to navigate to /edit/:id */}
                                                <button className="bg-blue-500 text-white font-bold py-1 px-2 rounded mr-2">
                                                    Edit
                                                </button>
                                            </Link>
                                            <button onClick={() => handleDelete(todo.id)} className="bg-red-500 text-white font-bold py-1 px-2 rounded" >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AllTasks;
