import express from 'express';
import { initializeDatabase } from './database/database.js';
import tasksRoute from './routes/tasks.js';
import cors from "cors"

const app = express();
app.use(express.json());
app.use(cors());

app.get("/health", (req, res) => {
    res.json({ message: "Health OK!" });
});

// Initialize the database
const db = initializeDatabase();

app.use("/tasks", tasksRoute(db));

app.listen(8080, () => console.log("app running on 8080"));
