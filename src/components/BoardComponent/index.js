import React, {useContext} from "react";

import "./board.component.css";

import BoardColumnComponent from "./BoardColumnComponent";
import { BoardContext } from "../../shared/state/contexts";

// This component is wrapper around all the board columns.
const BoardComponent = (props) => {
    const { board } = useContext(BoardContext);

    return <div className="board-wrapper">
        <div className="board-col-wrapper">
            {
                board.config && board.config.length && board.config.map((column, index) => {
                    return <BoardColumnComponent key={column.id} colIndex={index}/>
                }) || null
            }
            <BoardColumnComponent colIndex={board.config.length} editable={true}/>
        </div>
    </div>
}

export default BoardComponent;
