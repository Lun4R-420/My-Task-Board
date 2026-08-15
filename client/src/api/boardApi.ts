import type { Board, Task } from "../types/board";

const API_URL = import.meta.env.VITE_API_URL;

export async function getBoard(boardId: string): Promise<Board> {
    const response = await fetch(`${API_URL}/api/boards/${boardId}`);
    return response.json();
}

export async function createBoard(): Promise<Board> {
    const response = await fetch(`${API_URL}/api/boards`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        }
    });
    return response.json();
};

export async function updateBoard(boardId: string, data: Partial<Pick<Board, "name" | "description">>): Promise<Board> {
    const response = await fetch(`${API_URL}/api/boards/${boardId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    return response.json();
};

export async function deleteBoard(boardId: string): Promise<void> {
    await fetch(`${API_URL}/api/boards/${boardId}`, {
        method: "DELETE",
    });
};

export async function createTask(boardId: string, taskData: Omit<Task, "id" | "boardId">): Promise<Task> {
    const response = await fetch(`${API_URL}/api/tasks`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...taskData, boardId }),
    });
    return response.json();
};

export async function updateTask(taskId: string, data: Partial<Omit<Task, "id" | "boardId">>): Promise<Task> {
    const response = await fetch(`${API_URL}/api/tasks/${taskId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    return response.json();
};

export async function deleteTask(taskId: string): Promise<void> {
    await fetch(`${API_URL}/api/tasks/${taskId}`, {
        method: "DELETE",
    });
};