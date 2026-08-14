import { useState } from "react";
import { useBoardStore } from "../store/boardStore";
import type { Task as TaskType } from "../types/board";
import inProgressIcon from "../assets/Time_atack_duotone.svg";
import completedIcon from "../assets/Done_round_duotone.svg";
import wontDoIcon from "../assets/close_ring_duotone.svg";
import CloseIcon from "../assets/close_ring_duotone-1.svg";
import Trash from "../assets/Trash.svg";
import Save from "../assets/Done_round.svg";
import "./TaskModal.css";

type TaskModalProps = {
    task?: TaskType;
    onClose: () => void;
};

const icons = ["🧑‍💻", "💬", "☕", "🏋️‍♂️", "📚", "⏰"];

const statusOptions: { key: TaskType["status"]; label: string; className: string; icon: string }[] = [
    { key: "TO_DO", label: "To Do", className: "to-do", icon: "" },
    { key: "IN_PROGRESS", label: "In Progress", className: "in-progress", icon: inProgressIcon },
    { key: "COMPLETED", label: "Completed", className: "completed", icon: completedIcon },
    { key: "WONT_DO", label: "Won't Do", className: "wont-do", icon: wontDoIcon }
];

function TaskModal({ task, onClose }: TaskModalProps) {
    const updateTask = useBoardStore((state) => state.updateTask);
    const deleteTask = useBoardStore((state) => state.deleteTask);
    const addTask = useBoardStore((state) => state.addTask);

    const [name, setName] = useState(task?.name ?? "");
    const [description, setDescription] = useState(task?.description ?? "");
    const [icon, setIcon] = useState(task?.icon ?? icons[0]);
    const [status, setStatus] = useState(task?.status ?? "TO_DO");

    async function handleSave() {
        console.log("SAVE CLICKED");
        if (task) {
            await updateTask(task.id, { name, description, icon, status });
        }
        else {
            await addTask({ name, description, icon, status });
        }
        onClose();
    }

    async function handleDelete() {
        if (task) {
            await deleteTask(task.id);
        }
        onClose();
    }

    return (
        <div className="modal-overlay">
            <div className="modal-panel">
                <div className="modal-header">
                    <h2>Task details</h2>
                    <button className="modal-close-btn" onClick={onClose}>
                        <img src={CloseIcon} alt="Close" />
                    </button>
                </div>
                <label>Task name</label>
                <input value={name} onChange={(e) => setName(e.target.value)} autoFocus />

                <label>Task Description</label>
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Enter a short description" />

                <label>Icon</label>
                <div className="icon-selection">
                    {icons.map((i) => (
                        <button key={i} className={`icon-btn ${icon === i ? "selected" : ""}`} onClick={() => setIcon(i)}>
                            {i}
                        </button>
                    ))}
                </div>    
                <label>Status</label>
                <div className="status-selection">
                    {statusOptions.filter((op) => op.key !== "TO_DO").map((option) => (
                        <button
                            key={option.key}
                            className={`status-btn ${status === option.key ? "selected" : ""}`}
                            onClick={() => setStatus(option.key)}
                        >
                            <div className="status-icon">
                                <span className={`status-icon-badge ${option.className}`}>
                                    <img src={option.icon} alt={option.label} />
                                </span>
                            </div>
                            <span>{option.label}</span>
                            {status === option.key && <img src={Save} alt="Selected" className="selected-icon" />}
                        </button>
                    ))}
                </div>
                <div className="modal-footer">
                    <button className="delete-btn" onClick={handleDelete}>
                        <span>Delete</span>
                        <img src={Trash} alt="Delete" />
                    </button>
                    <button className="save-btn" onClick={handleSave}>
                        <span>Save</span>
                        <img src={Save} alt="Save" />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default TaskModal;