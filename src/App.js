import { Route, Routes, useLocation } from 'react-router-dom';

import './App.css';

import HomePage from './pages/HomePage';
import BoardPage from './pages/BoardPage';
import { RouteNames } from './shared/constants/RouteNames.constants';

function App() {
  let location = useLocation();

  return (
    <div>
      <div className="app-header">
        <p className="page-title">Trello clone: { RouteNames[location.pathname] }</p>
      </div>
      <div className="app-body">
        <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="board" element={<BoardPage/>}/>
        </Routes>
      </div>
    </div>
  );
}

export default App;
