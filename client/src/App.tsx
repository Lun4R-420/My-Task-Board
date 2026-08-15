import Board from './components/Board';
import { useBoardStore } from "./store/boardStore";
import { useEffect } from "react";
import { Routes, Route, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function HomePage() {
    const navigate = useNavigate();
    const createBoard = useBoardStore((state) => state.createBoard);

    useEffect(() => {
        async function create() {
            await createBoard();

            const board = useBoardStore.getState().board;
            if (board) {
                navigate(`/boards/${board.id}`);
            }
        }

        create();
    }, [createBoard, navigate]);

    return (
        <p>Creating board...</p>
    );
}

function BoardPage() {
    const { boardId} = useParams();
    const loadBoard = useBoardStore((state) => state.loadBoard);

    useEffect(() => {
        if (boardId) {
            loadBoard(boardId);
        }
    }, [loadBoard, boardId]);

    return (
        <Board />
    );
}

function App() {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/boards/:boardId" element={<BoardPage />} />
        </Routes>
    );
}

export default App;