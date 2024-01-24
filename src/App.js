// Importing necessary components and styles
import "./App.css";
import Header from "./components/Layout/Header";
import { Board } from "./components/boards/Board";

function App() {
  
  return (
    // Main container with a background color and full height
    <div className=" h-screen bg-gray-200">
      {/* Header component */}
      <Header />
      <Board/>
    </div>
  );
}

// Exporting the App component as the default export
export default App;
