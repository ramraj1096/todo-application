import React, { useState, useEffect } from 'react';
import { editTodoById, getTodoById } from '../api'; 
import { Navigate, useParams } from 'react-router-dom';

const EditTaskForm = ({ onSubmit, initialData }) => {
    const [formData, setFormData] = useState(initialData || {
        title: '',
        description: '',
        status: '0',
        dueDate: new Date().toISOString().split('T')[0] 
    });
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const { id } = useParams();

    useEffect(() => {
        
        const fetchTaskData = async () => {
            try {
                if (id) {
                    const taskData = await getTodoById(id);
                    setFormData(taskData);
                }
            } catch (error) {
                console.error("Error fetching task data:", error);
                if (error.response && error.response.status === 404) {
                    
                    setIsLoading(false);
                    setFormData(null); 
                }
            } finally {
                setIsLoading(false); 
            }
        };

        fetchTaskData();
    }, [id]); 

    const handleChange = (e) => {
        const { name, value } = e.target;
        const newValue = name === 'status' ? parseInt(value, 10) : value; 
        setFormData({
            ...formData,
            [name]: newValue
        });
        
        setErrors({
            ...errors,
            [name]: ''
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
       
        const { title, description } = formData;
        if (!title.trim()) {
            setErrors({ ...errors, title: 'Title is required' });
            return;
        }
        if (!description.trim()) {
            setErrors({ ...errors, description: 'Description is required' });
            return;
        }
        try {
           
            const formDataWithDateString = {
                ...formData,
                status: 0,
                isTaskCompleted: parseInt(formData.status) || 0, 
                due_date: formData.dueDate || formData.due_date 
            };
            await editTodoById(id, formDataWithDateString); 
            setIsSubmitted(true);
        } catch (error) {
            console.error("Error updating todo:", error);
        }
    };

    if (isLoading) {
        return <p>Loading...</p>; 
    }

    
    if (!isLoading && !formData) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className='text-5xl text-center'>
                    <h1>No todo found with the requested ID.</h1>
                </div>
            </div>
        );
    }
    

    if (isSubmitted) {
        return <Navigate to="/" />;
    }

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8 p-8 bg-white rounded shadow-md">
            <h1 className="font-bold text-center text-5xl mb-8">Edit Todo</h1>
            <div className="mb-4">
                <label htmlFor="title" className="block text-gray-700 font-bold mb-2">Title:</label>
                <input type="text" name="title" id="title" value={formData.title} onChange={handleChange}
                       className="w-full p-2 border rounded shadow-md focus:outline-none focus:border-blue-500"/>
                {errors.title && <p className="text-red-500">{errors.title}</p>}
            </div>
            <div className="mb-4">
                <label htmlFor="description" className="block text-gray-700 font-bold mb-2">Description:</label>
                <textarea name="description" id="description" value={formData.description} onChange={handleChange}
                          className="w-full p-2 border rounded shadow-md focus:outline-none focus:border-blue-500"/>
                {errors.description && <p className="text-red-500">{errors.description}</p>}
            </div>
            <div className="mb-4">
                <label htmlFor="status" className="block text-gray-700 font-bold mb-2">Status:</label>
                <select name="status" id="status" value={formData.status || 0} onChange={handleChange} // Update value to formData.status
                        className="w-full p-2 border rounded shadow-md focus:outline-none focus:border-blue-500">
                    <option value="0">To Do</option>
                    <option value="1">In Progress</option>
                    <option value="2">Completed</option>
                </select>
            </div>
            <div className="mb-4">
                <label htmlFor="dueDate" className="block text-gray-700 font-bold mb-2">Due Date:</label>
                <input type="date" name="dueDate" id="dueDate" value={formData.dueDate} onChange={handleChange}
                       className="w-full p-2 border rounded shadow-md focus:outline-none focus:border-blue-500"/>
            </div>
            <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700">Save</button>
        </form>
    );
};

export default EditTaskForm;
