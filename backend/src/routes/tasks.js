import express from 'express';

const tasksRoute = (db) => {
    const router = express.Router();

    // Route to save task

    router.post("/", (req, res) => {
        try {
            const { title, description, due_date, status } = req.body;

            // Parse due_date string to Date object
            const dueDate = new Date(Date.parse(due_date));

            // Insert task into database
            const stmt = db.prepare("INSERT INTO tasks (title, description, due_date, isTaskCompleted) VALUES (?, ?, ?, ?)");
            const result = stmt.run(title, description, dueDate.toISOString(), status);

            res.status(201).json({ message: "Task created successfully", id: result.lastInsertRowid });
        } catch (error) {
            console.error("Error creating task:", error.message);
            res.status(500).json({ message: "Internal server error" });
        }
    });


    // Route to get all tasks
    router.get("/", (req, res) => {
        try {
            // Retrieve all tasks from the database
            const tasks = db.prepare("SELECT * FROM tasks").all();
            res.json(tasks);
        } catch (error) {
            console.error("Error retrieving tasks:", error.message);
            res.status(500).json({ message: "Internal server error" });
        }
    });

    // Route to get single task by id
    router.get("/:id", (req, res) => {
        try {
            const { id } = req.params;

            // Retrieve task from the database by id
            const task = db.prepare("SELECT * FROM tasks WHERE id = ?").get(id);
            
            if (task) {
                res.json(task);
            } else {
                res.status(404).json({ message: "Task not found" });
            }
        } catch (error) {
            console.error("Error retrieving task:", error.message);
            res.status(500).json({ message: "Internal server error" });
        }
    });

    // Route to update task
    router.put("/:id", (req, res) => {
        try {
            const { id } = req.params;
            const { title, description, isTaskCompleted, due_date } = req.body;

            // Update task in the database
            const stmt = db.prepare("UPDATE tasks SET title = ?, description = ?, isTaskCompleted = ?, due_date = ? WHERE id = ?");
            const result = stmt.run(title, description, isTaskCompleted, due_date, id);

            if (result.changes > 0) {
                res.json({ message: "Task updated successfully" });
            } else {
                res.status(404).json({ message: "Task not found" });
            }
        } catch (error) {
            console.error("Error updating task:", error.message);
            res.status(500).json({ message: "Internal server error" });
        }
    });

    // Route to delete task
    router.delete("/:id", (req, res) => {
        try {
            const { id } = req.params;

            // Delete task from the database
            const stmt = db.prepare("DELETE FROM tasks WHERE id = ?");
            const result = stmt.run(id);

            if (result.changes > 0) {
                res.json({ message: "Task deleted successfully" });
            } else {
                res.status(404).json({ message: "Task not found" });
            }
        } catch (error) {
            console.error("Error deleting task:", error.message);
            res.status(500).json({ message: "Internal server error" });
        }
    });

    return router;
};

export default tasksRoute;
