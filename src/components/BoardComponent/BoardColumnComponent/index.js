import { useContext, useState } from "react";

import "./board-column.component.css";

import BoardCardComponent from "../BoardCardComponent";
import { BoardContext } from "../../../shared/state/contexts";
import BoardActions from "../../../shared/services/board-actions.service";
import { generateId } from "../../../shared/services/utils.service";

// This component contains a single board column with list of all cards in it.
const BoardColumnComponent = (props) => {
    const { colIndex, editable } = props;
    const { board, updateBoard } = useContext(BoardContext);

    const { config } = board;

    const [columnForm, setColumnForm] = useState({
        id: config[colIndex] ? config[colIndex].id : null,
        title: config[colIndex] ? config[colIndex].title : '',
        cards: config[colIndex] ? config[colIndex].cards : [],
    });

    const [editName, toggleEditName] = useState(false);

    const resetColumnForm = () => { // Function to reset the column setup form
        setColumnForm({
            title: '',
            cards: []
        })
    }

    const onHandleChange = (e) => { // Function to handle column setup form changes
        setColumnForm(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    }

    const moveColumn = (targetColumn) => { // Function to move column
        if(window.confirm("Are you sure?") === true) {
            let updatedBoard = Object.assign(board);

            let temp = updatedBoard.config[colIndex];
            updatedBoard.config[colIndex] = updatedBoard.config[targetColumn];
            updatedBoard.config[targetColumn] = temp

            BoardActions.put(updatedBoard.id, updatedBoard);
            updateBoard({...updatedBoard});
        }
    }

    const saveColumn = (e) => { // Function to add/edit column
        e.preventDefault();
        let updatedBoard = {};
        if(editName) {
            updatedBoard = updateColumnName();
        } else {
            updatedBoard = addColumn();
            resetColumnForm();
        }

        BoardActions.put(updatedBoard.id, updatedBoard);
        updateBoard({...board, ...updatedBoard });
        toggleEditName(false);
    }

    const addColumn = () => { // Function to add a new column
        let updatedBoard = Object.assign(board);
        columnForm.id = generateId('col');
        updatedBoard.config.push(columnForm);
        return updatedBoard;
    }

    const updateColumnName = () => { // Function to update the column name
        let updatedBoard = Object.assign(board);
        updatedBoard.config.splice(colIndex, 1, columnForm);
        return updatedBoard;
    }

    columnForm.cards.sort((a, b) => a.priority - b.priority) // Cards are sorted in order of high to low priority

    return <div className="border-rad column">
        <div className="border-rad column-header">
            {
                !(editable || editName) && colIndex > 0 ? <button className="border-rad column-btn btn" onClick={() => moveColumn(colIndex - 1)}>{'<'}</button> : null
            }
            {
                editable || editName ? 
                <>
                    <input name="title" value={columnForm.title} onChange={onHandleChange}></input>
                    <button className="btn" onClick={saveColumn}>Done</button>
                </>
                : <>
                    <p className="column-title">{columnForm.title}</p>
                    <button className="btn" onClick={() => toggleEditName(!editName)}>Edit</button>
                </>
            }
            {
                !(editable || editName) && colIndex < board.config.length - 1 ? <button className="border-rad column-btn btn" onClick={() => moveColumn(colIndex + 1)}>{'>'}</button> : null
            }
        </div>
        <div className="column-body">
            {
                columnForm.cards && columnForm.cards.length && columnForm.cards.map((card, index) => {
                    return <BoardCardComponent key={card.id} colIndex={colIndex} cardIndex={index} card={card}/>
                }) || null
            }
            {
                editable ? null
                : <BoardCardComponent colIndex={colIndex} cardIndex={columnForm.cards.length} editable={true}/>
            }
        </div>
    </div>
}

export default BoardColumnComponent;