import './App.css';
import List from './components/List/List';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Display from './components/Display';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<List></List>}></Route>
        </Routes>
        <Routes>
          <Route path="/display" element={<Display></Display>}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
