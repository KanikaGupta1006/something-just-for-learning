import React, {useState, useCallback} from 'react';
import Button from './components/UI/Button/Button';

import './App.css';

function App() {
  const[showPara, setShowPara] = useState(false);
  const [myTitle, setMyTitle] = useState('My Title');

  const toggleParaHandler = () => {
    setShowPara(prevShowPara => !prevShowPara);
  };

  var toggleTitle = false;

  const changeTitleHandler = useCallback(() => {
    toggleTitle = !toggleTitle;
    setMyTitle( toggleTitle ? 'My Title' : 'New Title');
  }, []);

  return (
    <div className="app">
      <h1>Hi there..!</h1>
      {myTitle && <p>{myTitle}</p>}
      { showPara && <p>This is a para..!! This is being toggled on demand...!!</p>}
      <Button onClick={toggleParaHandler}>Toggle Text</Button>
      <br></br>
      <br></br>
      <Button onClick={changeTitleHandler}>Change the Title</Button>
    </div>
  );
}

export default App;
