import './App.css';
import Header from "./components/Layout/Header"
import { AddList } from './components/cards/AddList';
import { List } from './components/cards/List';
import {useState} from 'react';
function App() {
  const [lists, setLists] = useState([]);

  const addList = (newListName) => {
    setLists([...lists, { name: newListName }]);
  };

  return (

    <div className='bg-slate-400 h-screen'>
      <Header/>
      <div className='flex m-5'>
        {lists.map((list, index) => (
          <List key={index} listName={list.name} /> 
        ))}
        <AddList onAddList={addList} />
      </div>
      
    </div>
    
  );
}

export default App;
