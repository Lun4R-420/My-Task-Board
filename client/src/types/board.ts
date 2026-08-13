export type TaskStatus = "COMPLETED" | "IN_PROGRESS" | "WONT_DO" | "TO_DO";

export type Task = {
    id: string;
    name: string;
    description: string;
    icon: string;
    status: TaskStatus;
    boardId: string;
};

export type Board = {
    id: string;
    name: string;
    description: string;
    tasks: Task[];
};