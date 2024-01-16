import './App.css';
import Header from "./components/Layout/Header"
import { List } from './components/cards/List';
function App() {
  return (

    <div className='bg-slate-400 h-screen'>
      <Header/>
      <List/>

    </div>
    
  );
}

export default App;
