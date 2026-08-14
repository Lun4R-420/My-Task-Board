import { useBoardStore } from "../store/boardStore";
import Logo from "../assets/Logo.svg";
import "./Board.css";
import Edit from "../assets/Edit_duotone.svg";
import AddTask from "../assets/Add_round_duotone.svg";
import { useState } from "react";
import Task from "./Task";
import BoardModal from "./BoardModal.tsx";
import TaskModal from "./TaskModal.tsx";

function Board() {
    const board = useBoardStore((state) => state.board);
    const updateBoard = useBoardStore((state) => state.updateBoard);
    const [isEditingBoard, setIsEditingBoard] = useState(false);
    const [isAddingTask, setIsAddingTask] = useState(false);

    async function handleSaveBoard(data: {
        name: string;
        description: string;
    }) {
        await updateBoard(data);
        setIsEditingBoard(false);
    }

    function handleCancelEdit() {
        setIsEditingBoard(false);
    }

    return (
        <div className="board">
            <header>
                <div className="board-title">
                    <img src={Logo} alt="Logo" />
                    <h1>{board?.name}</h1>
                    <button className="edit-btn" aria-label="Edit Board name"
                        onClick={() => setIsEditingBoard(true)}>
                        <img src={Edit} alt="Edit" />
                    </button>
                </div>
                <p>{board?.description}</p>
            </header>
            <main>
                {board?.tasks.map((task) => (
                    <Task key={task.id} task={task} />
                ))}
                <button className="add-task" onClick={() => setIsAddingTask(true)}>
                    <span className="add-task-icon">
                        <img src={AddTask} alt="Add Task" />
                    </span>
                    <h2>Add new Task</h2>
                </button>
            </main>
            {isEditingBoard && board && (
                <BoardModal board={board} handleSaveBoard={handleSaveBoard} handleCancelEdit={handleCancelEdit} />
            )}

            {isAddingTask && (
                <TaskModal onClose={() => setIsAddingTask(false)} />
            )}
        </div>
    );
}

export default Board;