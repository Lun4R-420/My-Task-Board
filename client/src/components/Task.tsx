import type { Task as TaskType } from "../types/board";
import inProgressIcon from "../assets/Time_atack_duotone.svg";
import completedIcon from "../assets/Done_round_duotone.svg";
import wontDoIcon from "../assets/close_ring_duotone.svg";
import { useState } from "react";
import TaskModal from "./TaskModal";

type TaskProps = {
    task: TaskType;
};

const statusMeta = {
    IN_PROGRESS: {className: "in-progress", badge: {icon: inProgressIcon, alt: "In Progress"}},
    COMPLETED: {className: "completed", badge: {icon: completedIcon, alt: "Completed"}},
    WONT_DO: {className: "wont-do", badge: {icon: wontDoIcon, alt: "Won't Do"}},
    TO_DO: {className: "to-do", badge: null}
};

function Task({ task }: TaskProps) {
    const status = statusMeta[task.status] ?? statusMeta["TO_DO"];
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div key={task.id} className={`task ${status.className}`} onClick={() => setIsModalOpen(true)}>
            <div className="task-icon">
                {task.icon}
            </div>
            <div className="task-body">
                <h2>{task.name}</h2>
                {task.description && <p>{task.description}</p>}
            </div>
            {status.badge && (
                <span className="task-status-badge">
                    <img src={status.badge.icon} alt={status.badge.alt} />
                </span>
            )}
            {isModalOpen && (
                <TaskModal task={task} onClose={() => setIsModalOpen(false)} />
            )}
        </div>
    );
};

export default Task;