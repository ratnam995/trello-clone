import { useContext, useState } from "react";

import "./board-card.component.css";

import { BoardContext } from "../../../shared/state/contexts";
import BoardActions from "../../../shared/services/board-actions.service";
import { generateId } from "../../../shared/services/utils.service";

// This component renders a card in display mode or edit mode.
const BoardCardComponent = (props) => {
    const { board, updateBoard } = useContext(BoardContext);
    const { colIndex, card, cardIndex, editable } = props;

    const [cardForm, setCardForm] = useState({
        id: card && card.id ? card.id : null,
        title: card && card.title ? card.title : "",
        priority: card && card.priority ? card.priority : 0,
        description: card && card.description ? card.description : "",
    });

    const [editCard, toggleEditCard] = useState(false);

    const resetCardForm = () => { // Function to reset card form
        setCardForm({
            title: "",
            priority: 0,
            description: "",
        })
    }

    const onHandleChange = (e) => { // Function to handle card form changes
        setCardForm(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    }

    const moveCard = (targetColumn) => { // Function to move cards from one column to another
        if(window.confirm("Are you sure?") === true) {
            let updatedBoard = Object.assign(board);
            updatedBoard.config = updatedBoard.config.map((column, index) => {
                if(index === colIndex) {
                    column.cards.splice(cardIndex, 1);
                } else if (index == targetColumn.target.value) {
                    column.cards.push(card);
                }
                return column;
            })

            BoardActions.put(updatedBoard.id, updatedBoard);
            updateBoard({...updatedBoard});
        }
    }

    const deleteCard = (e) => { // Function to delete a card
        e.preventDefault();
        if(window.confirm("Are you sure? All the details will be lost after deleting a card.") === true) {
            let updatedBoard = Object.assign(board);
            updatedBoard.config[colIndex].cards.splice(cardIndex, 1);
            BoardActions.put(updatedBoard.id, updatedBoard);
    
            updateBoard({...board, ...updatedBoard});
        }
    }

    const addCard = (e) => { // Function to add or edit a card
        e.preventDefault();

        let updatedBoard = Object.assign(board);

        if(editCard) {
            updatedBoard.config[colIndex].cards.splice(cardIndex, 1, cardForm);;
        } else {
            cardForm.id = generateId('card');
            updatedBoard.config[colIndex].cards.push(cardForm);
        }

        BoardActions.put(updatedBoard.id, updatedBoard);
    
        updateBoard({...board, ...updatedBoard});
        resetCardForm();

    }

    return  <div className="card">
        <span className="card-header">
            {
                editable || editCard ? <input
                    name="title"
                    value={cardForm.title}
                    onChange={onHandleChange}
                    placeholder="Enter card title"
                />
                : <p>{cardForm.title}</p>
            }
            {
                editable || editCard ? <select name="priority" value={cardForm.priority} onChange={onHandleChange}>
                    <option value="0">P0</option>
                    <option value="1">P1</option>
                    <option value="2">P2</option>
                    <option value="3">P3</option>
                    <option value="4">P4</option>
                </select>
                : <p>P{cardForm.priority}</p>
            }
        </span>
        {
            editable || editCard ? <input
                name="description"
                className="card-description in"
                value={cardForm.description}
                onChange={onHandleChange}
                placeholder="Enter card description"
            />
            : <p className="card-description para">{cardForm.description}</p>
        }
        <span className="card-navigator">
            {
                editable || editCard ? <>
                    {
                        editCard ?  <button className="border-rad card-cancel-btn btn" onClick={() => toggleEditCard(false)}>Cancel</button> : null
                    }
                    <button className="border-rad card-save-btn btn" onClick={addCard}>Save</button>
                </>
                : <>
                    {
                        colIndex > 0 ?
                        <button
                            className="border-rad card-btn left-btn btn"
                            onClick={() => moveCard(
                                {
                                    target: {
                                        value: colIndex - 1
                                    }
                                })
                            }
                        >{'<'}</button>
                        : null
                    }
                    <select className="column-select" value={colIndex} onChange={moveCard}>
                        {
                            board.config.map((column, index) => {
                                return <option key={index} value={index}>{column.title}</option>
                            })
                        }
                    </select>
                    {
                        colIndex < board.config.length - 1 ?
                        <button
                            className="border-rad card-btn right-btn btn"
                            onClick={() => moveCard(
                                {
                                    target: {
                                        value: colIndex + 1
                                    }
                                })
                            }
                        >{'>'}</button>
                        : null
                    }
                </>
            }
        </span>
        {
            editable || editCard ? null : <button className="border-rad card-edit-btn btn" onClick={() => toggleEditCard(!editCard)}>Edit</button>
        }
        {
            editable || editCard ? null : <button className="border-rad card-delete-btn btn" onClick={deleteCard}>Delete</button>
        }
    </div>
}

export default BoardCardComponent;