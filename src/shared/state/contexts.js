import { createContext } from 'react';

// Board context setup
const BoardContext = createContext({
    board: {},
    updateBoard: () => {},
});

export { BoardContext };
