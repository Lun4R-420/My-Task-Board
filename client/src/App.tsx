import Board from './components/Board';
import { useBoardStore } from "./store/boardStore";
import { useEffect } from "react";

function App() {
    const createBoard = useBoardStore((state) => state.createBoard);

    useEffect(() => {
        createBoard();
    }, [createBoard]);

    return (
        <Board />
    );
}

export default App;