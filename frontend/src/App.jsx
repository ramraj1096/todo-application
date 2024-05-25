import { Route, Routes } from 'react-router-dom';
import AllTasks from './components/AllTasks';
import TaskForm from './components/TaskForm';
import { createTodo } from './api';
import EditTaskForm from './components/EditTaskForm';

function App() {

  const handleSubmitFunction = async (formData) => {
    try {
      await createTodo(formData);
    } catch (error) {
      console.error("Error creating todo:", error);
    }
  };

  const initialData = {
    title: '',
    description: '',
    status: '',
    dueDate: new Date().toISOString().split('T')[0] 
  };

  return (
    <Routes>
      <Route path="/" element={<AllTasks />} />
      <Route
        path="/new"
        element={<TaskForm onSubmit={handleSubmitFunction} initialData={initialData} />}
      />
      <Route
        path="/edit/:id"
        element={<EditTaskForm onSubmit={handleSubmitFunction} initialData={initialData} />}
      />
    </Routes>
  );
}

export default App;
