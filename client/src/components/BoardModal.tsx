import type { Board } from "../types/board";
import { useState } from "react";
import "./BoardModal.css";

type BoardModalProps = {
    board: Board;
    handleSaveBoard: (data: {
        name: string;
        description: string;
    }) => Promise<void>;
    handleCancelEdit: () => void;
};

function BoardModal({ board, handleSaveBoard, handleCancelEdit }: BoardModalProps) {
    const [boardName, setBoardName] = useState(board.name ?? "");
    const [boardDescription, setBoardDescription] = useState(board.description ?? "");

    return (
        <div className="modal-overlay">
            <div className="modal-panel">
                <h2>Board details</h2>
                <label>Board name</label>
                <input value={boardName} onChange={(e) => setBoardName(e.target.value)} />
                <label>Board Description</label>
                <textarea value={boardDescription} onChange={(e) => setBoardDescription(e.target.value)} placeholder="Enter a short description" />
                <div className="modal-footer">
                    <button className="cancel-btn" onClick={handleCancelEdit}>
                        <span>Cancel</span>
                    </button>
                    <button className="save-btn" onClick={() => handleSaveBoard({ name: boardName, description: boardDescription })}>
                        <span>Save</span>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default BoardModal;