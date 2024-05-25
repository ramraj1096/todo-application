import Database from 'better-sqlite3';

export function initializeDatabase() {
    try {
        const db = new Database('./database.db');
        console.log("Database connection established.");

        // Create table if it doesn't exist
        const createTableQuery = `
            CREATE TABLE IF NOT EXISTS tasks (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                title TEXT NOT NULL,
                description TEXT,
                isTaskCompleted INTEGER NOT NULL DEFAULT 0,
                due_date TEXT
            )`;
        db.exec(createTableQuery);
        console.log("Table creation successful.");

        return db;
    } catch (err) {
        console.error("Database initialization failed:", err.message);
        throw err;
    }
}
