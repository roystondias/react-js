import './App.css';

//imorting component
import List from './components/List/List';
import Display from './components/List/Display';

//using the react router to show the display page
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

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
