import { useState, useMemo } from "react";
import { useParams } from "react-router-dom";

import BoardComponent from "../../components/BoardComponent";
import AddEditBoardComponent from "../../components/AddEditBoardComponent";
import BoardActions from "../../shared/services/board-actions.service";
import { BoardContext } from "../../shared/state/contexts";

// This component is a page component for /board?id route
const BoardPage = (props) => {
    const {id} = useParams()

    const [board, updateBoard] = useState(BoardActions.get(id));
    const [editDetails, setEditDetails] = useState(false);

    const contextValue = useMemo(() => ({ board, updateBoard }), [board]);

    if( !id || !board ) {
        return <div>Board not found</div>
    } else {
        const editBoardDetail = (e) => { // Function to handle edit action for the board details
            e && e.preventDefault();
            setEditDetails(currState => !currState);
        }
        
        return <BoardContext.Provider value={contextValue}>
            <AddEditBoardComponent editable={editDetails} editBoardDetail={editBoardDetail} whiteBg={true}/>
            <button className="btn edit-board-btn" onClick={editBoardDetail}>Edit board details</button>
            <BoardComponent/>
        </BoardContext.Provider>
    }
}

export default BoardPage;