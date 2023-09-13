import "./App.css";
import Navbar from './components/Navbar/Navbar'
import Board from "./pages/Board";
import { GroupOrderProvider } from "./GroupOrderContext";
function App() {
  return (
    <div className="App">
      <GroupOrderProvider>
        <Navbar />
        <Board />
      </GroupOrderProvider>
    </div>
  );
}

export default App;
