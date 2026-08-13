import { create } from "zustand";
import type { Board, Task } from "../types/board";
import {
    getBoard,
    createBoard as createBoardApi,
    updateBoard as updateBoardApi,
    deleteBoard as deleteBoardApi,
    createTask as createTaskApi,
    updateTask as updateTaskApi,
    deleteTask as deleteTaskApi,
} from "../api/boardApi";

interface BoardStore {
    board: Board | null;
    createBoard: () => Promise<void>;
    setBoard: (board: Board) => void;
    updateBoard: (
        data: Partial<Pick<Board, "name" | "description">>
    ) => Promise<void>;
    loadBoard: (boardId: string) => Promise<void>;
    deleteBoard: (boardId: string) => Promise<void>;
    addTask: (task: Omit<Task, "id" | "boardId">) => Promise<void>;
    updateTask: (
        taskId: string,
        data: Partial<Omit<Task, "id" | "boardId">>
    ) => Promise<void>;
    deleteTask: (taskId: string) => Promise<void>;
};

export const useBoardStore = create<BoardStore>((set, get) => ({
    board: null,

    createBoard: async () => {
        const board = await createBoardApi();
        set({ board});
    },

    setBoard: (board) => set({ board }),

    updateBoard: async (data) => {
        const board = get().board;

        if (!board) return;

        const updatedBoard = await updateBoardApi(board.id, data);

        set({ board: updatedBoard });
    },

    loadBoard: async (boardId) => {
        const board = await getBoard(boardId);
        set({ board });
    },

    deleteBoard: async (boardId) => {
        await deleteBoardApi(boardId);
        set({ board: null });
    },

    addTask: async (task) => {
        const board = get().board;
        if (!board) return;

        const newTask = await createTaskApi(board.id, task);
        set((state) => ({
            board: state.board
                ? {...state.board, tasks:[...state.board.tasks, newTask]}
                : null
        }));
    },

    updateTask: async (taskId, data) => {
        const board = get().board;
        if (!board) return;

        const updatedTask = await updateTaskApi(taskId, data);
        set((state) => ({
            board: state.board
                ? {...state.board, tasks: state.board.tasks.map((t) => t.id === taskId ? updatedTask : t)}
                : null
        }));
    },

    deleteTask: async (taskId) => {
        const board = get().board;
        if (!board) return;

        await deleteTaskApi(taskId);
        set((state) => ({
            board: state.board
                ? {...state.board, tasks: state.board.tasks.filter((t) => t.id !== taskId)}
                : null
        }));
    },
}));