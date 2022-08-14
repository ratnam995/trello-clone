import { useNavigate } from 'react-router-dom';

const BoardDetailComponent = (props) => {
    const { board } = props;

    const navigate = useNavigate();

    const openBoard = (e) => {
        e.preventDefault();
        navigate(`board/${board.id}`)
    }

    return <li className='board-item' onClick={openBoard}>
        <p className='title'>{board.title}</p>
        <div className='board-detail'>
            <p className='description'>{board.description}</p>
            <p className='date-time'>{board.createdAt}</p>
        </div>
    </li>
}

export default BoardDetailComponent;