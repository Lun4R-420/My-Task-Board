import express from "express";
import prisma from "./prisma.js"

const PORT = Number(process.env.PORT) || 3000;
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post('/api/boards', async (req, res) => {
    const name = req.body.name || "My Task Board";
    const description = req.body.description || "Tasks to keep organised";
    const data = await prisma.board.create({
        data: {
            name: name,
            description: description,
            tasks: {
                create: [
                    {
                        name: "Task in Progress",
                        description: "",
                        icon: "⏰",
                        status: "IN_PROGRESS",
                    },
                    {
                        name: "Task Completed",
                        description: "",
                        icon: "🏋️‍♂️",
                        status: "COMPLETED",
                    },
                    {
                        name: "Task Won't Do",
                        description: "",
                        icon: "☕",
                        status: "WONT_DO",
                    },
                    {
                        name: "Task To Do",
                        description: "Work on a Challenge on devchallenges.io, learn TypeScript.",
                        icon: "📚",
                        status: "TO_DO",
                    }
                ]
            }
        },
        include: {
            tasks: true
        }   
    });
    res.status(201).json(data);
});

app.get('/api/boards/:boardId', async (req, res) => {
    const boardId = req.params.boardId;
    const board = await prisma.board.findUnique({
        where: {
            id: boardId
        },
        include: {
            tasks: true
        }
    });

    if (!board) {
        return res.status(404).json({ error: "Board not found" });
    }

    res.json({
        id: boardId,
        name: board.name,
        description: board.description,
        tasks: board.tasks
    });
});

app.put('/api/boards/:boardId', async (req, res) => {
    const boardId = req.params.boardId;
    const board = await prisma.board.update({
        where: {
            id: boardId
        },
        data: {
            name: req.body.name,
            description: req.body.description
        }, 
        include: {
            tasks: true
        }
    });

    res.json(board);
});

app.delete('/api/boards/:boardId', async (req, res) => {
    const boardId = req.params.boardId;
    await prisma.board.delete({
        where: {
            id: boardId
        }
    });

    res.status(204).send();
});

app.post('/api/tasks', async (req, res) => {
    const name = req.body.name || "New Task";
    const description = req.body.description || "";
    const icon = req.body.icon || "📝";
    const status = req.body.status || "TO_DO";
    const boardId = req.body.boardId;
    const task = await prisma.task.create({
        data: {
            name: name,
            description: description,
            icon: icon,
            status: status,
            board: {
                connect: { id: boardId }
            }
        }
    });
    res.status(201).json(task);
});

app.put('/api/tasks/:taskId', async (req, res) => {
    try {
        const taskId = req.params.taskId;
        const task = await prisma.task.update({
            where: {
                id: taskId
            },
            data: {
                name: req.body.name,
                description: req.body.description,
                icon: req.body.icon,
                status: req.body.status
            }
        });
        res.json(task);
    } catch (error) {
        console.error("Error updating task:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

app.delete('/api/tasks/:taskId', async (req, res) => {
    const taskId = req.params.taskId;
    await prisma.task.delete({
        where: {
            id: taskId
        }
    });
    res.status(204).send();
});

async function startServer() {
    try {
        await prisma.$connect();
        console.log("Connected to the database.");

        app.listen(PORT, "0.0.0.0", () => {
        console.log(`Server is running on port ${PORT}`);
    });
    } catch (error) {
        console.error("Error connecting to the database:", error);
        process.exit(1);
    }
}

startServer();