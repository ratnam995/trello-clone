import { useState } from 'react';

import './home-page.css';

import BoardDetailComponent from '../../components/BoardDetailComponent';
import AddEditBoardComponent from '../../components/AddEditBoardComponent';
import Modal from '../../components/ModalComponent';
import BoardActions from '../../shared/services/board-actions.service';

// This component is a page component for / route
const HomePage = (props) => {
    const [show, setShow] = useState(false);
    const [boards, setBoards] = useState(BoardActions.get());

    const addBoard = (e) => { // Function to show add board modal
        e.preventDefault();
        setShow(current => !current);
    }

    return <>
        <button className='btn' onClick={addBoard}>Add a new board</button>
        <ul className='board-list'>
            {
                boards.map(board => {
                    return <BoardDetailComponent key={board.id} board={board}/>
                })
            }
        </ul>
        <Modal title="My Modal" onClose={() => setShow(false)} show={show}>
            <AddEditBoardComponent editable={true}/>
        </Modal>
    </>
}

export default HomePage;