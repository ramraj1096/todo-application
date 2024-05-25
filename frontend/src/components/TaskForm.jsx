import React, { useState } from 'react';
import { createTodo } from '../api';
import { Navigate } from 'react-router-dom';

const TaskForm = ({ onSubmit, initialData }) => {
    const [formData, setFormData] = useState(initialData || {
        title: '',
        description: '',
        status: 0,
        dueDate: new Date().toISOString().split('T')[0] 
    });

    const [isSubmitted, setIsSubmitted] = useState(false);
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
        
        setErrors({
            ...errors,
            [name]: ''
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            
            if (!formData.title) {
                setErrors({ ...errors, title: 'Title is required' });
                return;
            }
            if (!formData.description) {
                setErrors({ ...errors, description: 'Description is required' });
                return;
            }
            if (!formData.dueDate) {
                setErrors({ ...errors, dueDate: 'Due date is required' });
                return;
            }
            
            const formDataWithDateString = {
                ...formData,
                status: 0,
                due_date: formData.dueDate 
            };
            await createTodo(formDataWithDateString);
            setIsSubmitted(true);
        } catch (error) {
            console.error("Error creating todo:", error);
        }
    };

    if (isSubmitted) {
        return <Navigate to="/" />;
    }

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8 p-8 bg-white rounded shadow-md">
            <h1 className="font-bold text-center text-5xl mb-8">New Todo</h1>
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
                <label htmlFor="dueDate" className="block text-gray-700 font-bold mb-2">Due Date:</label>
                <input type="date" name="dueDate" id="dueDate" value={formData.dueDate} onChange={handleChange}
                       className="w-full p-2 border rounded shadow-md focus:outline-none focus:border-blue-500"/>
                {errors.dueDate && <p className="text-red-500">{errors.dueDate}</p>}
            </div>
            <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700">Submit</button>
        </form>
    );
};

export default TaskForm;