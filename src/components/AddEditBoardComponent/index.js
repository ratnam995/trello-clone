import { useContext, useState } from 'react';

import './add-edit-board.css';

import BoardActions from '../../shared/services/board-actions.service';
import { BoardContext } from '../../shared/state/contexts';
import { useNavigate } from 'react-router-dom';

// This component contains the add/edit board form.
// It is non editable (inputs are disabled) when it is used on the Board page.
const AddEditBoardComponent = (props) => {
    const { editable, editBoardDetail, whiteBg=false } = props;
    const { board } = useContext(BoardContext);
    const navigate = useNavigate();

    const [boardForm, setBoardForm] = useState({
        id: board && board.id ? board.id : null,
        title: board && board.title ? board.title : '',
        description: board && board.description ? board.description : '',
        createdAt: board && board.createdAt ? board.createdAt : '',
        lastUpdatedAt: board && board.lastUpdatedAt ? board.lastUpdatedAt : '',
        config: board && board.config ? board.config : [],
    })

    const onHandleChange = (e) => { // Function to handle form changes
        setBoardForm(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    }

    const isFormValid = () => { // Function to validate the board setup form
        if(!boardForm.title) {
            alert("Title is required!");
            return false;
        } else if (boardForm.title.length > 50) {
            alert("Title can not be more than 50 characters.");
            return false;
        } if(!boardForm.description) {
            alert("Description is required!");
            return false;
        } else if (boardForm.title.length > 200) {
            alert("Description can not be more than 200 characters.");
            return false;
        } else {
            return true;
        }
    }

    const saveBoard = (e) => { // Function to update or save the board
        e.preventDefault();
        if(!isFormValid()) {
            return;
        }
        if(board && Object.keys(board).length) {
            BoardActions.put(boardForm.id, {...boardForm});
            editBoardDetail(null);
        } else {
            const id = BoardActions.post({...boardForm});
            navigate(`board/${id}`)
        }
    }
    
    return <>
        <form className={`vertical-form ${whiteBg? 'white-bg' : ''}`} onSubmit={saveBoard}>
            <span className="form-field">
                <span>
                    <label htmlFor="title">Title</label>
                    <input
                        type="text"
                        name="title"
                        disabled={!editable}
                        value={boardForm.title}
                        onChange={onHandleChange}
                    />
                </span>
                { editable ?<p>Hint: Title should not be more than 50 characters</p> : null }
            </span>
            <span className="form-field">
                <span>
                    <label htmlFor="description">Description</label>
                    <input
                        type="text"
                        name="description"
                        className="description"
                        disabled={!editable}
                        value={boardForm.description}
                        onChange={onHandleChange}
                    />
                </span>
                { editable ? <p>Hint: Description should not be more than 200 characters</p> : null }
            </span>
            {
                editable ?
                <button className="btn add-board-btn" type="submit">
                    { board ? "Save" : "Create" }
                </button>
                : null
            }
        </form>
    </>
}

export default AddEditBoardComponent;
