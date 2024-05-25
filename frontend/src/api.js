import axios from "axios";

const API_BASE_URL = "http://localhost:8080";

export const createTodo = async (newTodo) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/tasks`, newTodo);
        console.log("New Todo", newTodo)
        console.log("New Todo", response.data)
        return response.data;
    } catch (error) {
        if (error.response) {
            console.error("Error creating todo:", error.response.data);
            console.error("Status code:", error.response.status);
            console.error("Headers:", error.response.headers);
        } else if (error.request) {

            console.error("Error creating todo: No response received");
            console.error("Request data:", error.request);
        } else {

            console.error("Error creating todo:", error.message);
        }
        throw error;
    }
};

export const getAllTodos = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/tasks`);
        console.log(response.data)
        return response.data;
    } catch (error) {
        if (error.response) {
            console.error("Error fetching todos:", error.response.data);
            console.error("Status code:", error.response.status);
            console.error("Headers:", error.response.headers);
        } else if (error.request) {
            console.error("Error fetching todos: No response received");
            console.error("Request data:", error.request);
        } else {
            console.error("Error fetching todos:", error.message);
        }
        throw error;
    }
};

export const getTodoById = async (id) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/tasks/${id}`);
        return response.data;
    } catch (error) {
        if (error.response) {
            console.error("Error fetching todo by ID:", error.response.data);
            console.error("Status code:", error.response.status);
            console.error("Headers:", error.response.headers);
        } else if (error.request) {
            console.error("Error fetching todo by ID: No response received");
            console.error("Request data:", error.request);
        } else {
            console.error("Error fetching todo by ID:", error.message);
        }
        throw error;
    }
};

export const editTodoById = async (id, updatedTodo) => {
    try {
        console.log("Updated todo",updatedTodo)
        const response = await axios.put(`${API_BASE_URL}/tasks/${id}`, updatedTodo);
        
        console.log(response.data)
        return response.data;
    } catch (error) {
        if (error.response) {
            console.error("Error updating todo:", error.response.data);
            console.error("Status code:", error.response.status);
            console.error("Headers:", error.response.headers);
        } else if (error.request) {
            console.error("Error updating todo: No response received");
            console.error("Request data:", error.request);
        } else {
            console.error("Error updating todo:", error.message);
        }
        throw error;
    }
};

export const deleteTodo = async (id) => {
    try {
        const response = await axios.delete(`${API_BASE_URL}/tasks/${id}`);
        return response.data;
    } catch (error) {
        if (error.response) {
            console.error("Error deleting todo:", error.response.data);
            console.error("Status code:", error.response.status);
            console.error("Headers:", error.response.headers);
        } else if (error.request) {
            console.error("Error deleting todo: No response received");
            console.error("Request data:", error.request);
        } else {
            console.error("Error deleting todo:", error.message);
        }
        throw error;
    }
};
