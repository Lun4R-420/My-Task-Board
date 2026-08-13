import { useBoardStore } from "../store/boardStore";
import Logo from "../assets/Logo.svg";
import { useEffect } from "react";
import "./Board.css";

function Board() {
    const board = useBoardStore((state) => state.board);

    return (
        <div className="board">
            <header>
                <div className="board-title">
                    <img src={Logo} alt="Logo" />
                    <h1>{board?.name}</h1>
                </div>
                <p>{board?.description}</p>
            </header>
            <main>
                {board?.tasks.map((task) => (
                    <div key={task.id} className="task">
                        <div className="task-header">
                            <span>{task.icon}</span>
                            <h2>{task.name}</h2>
                        </div>
                        <p>{task.description}</p>
                    </div>
                ))}
            </main>
        </div>
    );
}

export default Board;